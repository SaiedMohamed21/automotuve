using Microsoft.EntityFrameworkCore;
using StarAutoCenter.Data;
using StarAutoCenter.DTOs.Accountant;
using StarAutoCenter.Models;
using StarAutoCenter.Models.Enums;

namespace StarAutoCenter.Services.Accountant
{
    public interface IAccountantService
    {
        Task<AccountantDashboardDto> GetDashboardAsync();
        Task<List<AccountantJobListDto>> GetJobsAsync(string? search = null, string? status = null);
        Task<AccountantJobDetailsDto?> GetJobDetailsAsync(string joNumber);
        Task<bool> SaveWorkFoundAsync(string joNumber, SaveWorkFoundDto dto);
        Task<bool> SaveJobOrderLaborAsync(string joNumber, SaveJobOrderLaborDto dto);
        Task<InvoiceDetailsDto?> CreateInvoiceAsync(string joNumber, CreateInvoiceDto dto);
        Task<List<InvoiceListDto>> GetInvoicesAsync(string? search = null, string? paymentStatus = null);
        Task<InvoiceDetailsDto?> GetInvoiceDetailsAsync(string invoiceNumber);
        Task<List<PaymentDto>> GetPaymentsAsync(string? search = null);
        Task<RecordPaymentResult> RecordPaymentAsync(CreatePaymentDto dto);
        Task<bool> UpdatePartPricesAsync(int partId, UpdatePartPricesDto dto);
    }

    public class AccountantService : IAccountantService
    {
        private readonly ApplicationDbContext _context;

        public AccountantService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<AccountantDashboardDto> GetDashboardAsync()
        {
            var today = DateTime.UtcNow.Date;

            var completeJobs = await _context.JobOrders
                .CountAsync(j => j.Status == JobOrderStatus.Completed);

            var openInvoices = await _context.Invoices
                .CountAsync(i => i.PaymentStatus != PaymentStatus.Paid);

            var closedToday = await _context.JobOrders
                .CountAsync(j => j.Status == JobOrderStatus.Closed && j.Date.Date == today);

            var totalRevenue = await _context.Invoices
                .Where(i => i.PaymentStatus == PaymentStatus.Paid)
                .SumAsync(i => i.GrandTotal);

            var pendingPayments = await _context.Invoices
                .Where(i => i.PaymentStatus != PaymentStatus.Paid)
                .SumAsync(i => i.GrandTotal - i.PaidAmount);

            var recentJobs = await _context.JobOrders
                .Include(j => j.Customer)
                .Include(j => j.Vehicle)
                .Include(j => j.Invoice)
                .Where(j => j.Status == JobOrderStatus.Completed || j.Status == JobOrderStatus.Closed)
                .OrderByDescending(j => j.Date)
                .Take(5)
                .Select(j => new AccountantJobListDto
                {
                    Id = j.Id,
                    Number = j.Number,
                    Date = j.Date.ToString("dd MMM yyyy"),
                    Customer = j.Customer.Name,
                    Phone = j.Customer.Phone,
                    Vehicle = j.Vehicle.Make + " " + j.Vehicle.Model,
                    Plate = j.Vehicle.Plate,
                    Status = j.Status.ToString(),
                    Type = j.Type,
                    HasInvoice = j.Invoice != null
                }).ToListAsync();

            var recentInvoices = await _context.Invoices
                .Include(i => i.JobOrder)
                    .ThenInclude(j => j.Customer)
                .Include(i => i.JobOrder)
                    .ThenInclude(j => j.Vehicle)
                .OrderByDescending(i => i.Date)
                .Take(5)
                .Select(i => new InvoiceListDto
                {
                    InvoiceNumber = i.InvoiceNumber,
                    JobOrderId = i.JobOrderId,
                    JobOrderNumber = i.JobOrder.Number,
                    Date = i.Date.ToString("dd MMM yyyy"),
                    Customer = i.JobOrder.Customer.Name,
                    Vehicle = i.JobOrder.Vehicle.Make + " " + i.JobOrder.Vehicle.Model,
                    PartsTotal = i.PartsTotal,
                    LaborAmount = i.LaborAmount,
                    ExpensesTotal = i.ExpensesTotal,
                    GrandTotal = i.GrandTotal,
                    PaymentStatus = i.PaymentStatus.ToString()
                }).ToListAsync();

            return new AccountantDashboardDto
            {
                CompleteJobs = completeJobs,
                OpenInvoices = openInvoices,
                ClosedToday = closedToday,
                TotalRevenue = totalRevenue,
                PendingPayments = pendingPayments,
                RecentJobs = recentJobs,
                RecentInvoices = recentInvoices
            };
        }

        public async Task<List<AccountantJobListDto>> GetJobsAsync(string? search = null, string? status = null)
        {
            var query = _context.JobOrders
                .Include(j => j.Customer)
                .Include(j => j.Vehicle)
                .Include(j => j.Invoice)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                var s = search.ToLower();
                query = query.Where(j =>
                    j.Number.ToLower().Contains(s) ||
                    j.Customer.Name.ToLower().Contains(s) ||
                    (j.Vehicle.Make + " " + j.Vehicle.Model).ToLower().Contains(s) ||
                    j.Vehicle.Plate.ToLower().Contains(s));
            }

            if (!string.IsNullOrWhiteSpace(status) && status != "All")
            {
                if (Enum.TryParse<JobOrderStatus>(status, true, out var statusEnum))
                    query = query.Where(j => j.Status == statusEnum);
            }

            return await query
                .OrderByDescending(j => j.Date)
                .Select(j => new AccountantJobListDto
                {
                    Id = j.Id,
                    Number = j.Number,
                    Date = j.Date.ToString("dd MMM yyyy"),
                    Customer = j.Customer.Name,
                    Phone = j.Customer.Phone,
                    Vehicle = j.Vehicle.Make + " " + j.Vehicle.Model,
                    Plate = j.Vehicle.Plate,
                    Status = j.Status.ToString(),
                    Type = j.Type,
                    HasInvoice = j.Invoice != null
                }).ToListAsync();
        }

        public async Task<AccountantJobDetailsDto?> GetJobDetailsAsync(string joNumber)
        {
            var jo = await _context.JobOrders
                .Include(j => j.Customer)
                .Include(j => j.Vehicle)
                .Include(j => j.WorkItems)
                .Include(j => j.IssuedParts)
                    .ThenInclude(ip => ip.Part)
                .Include(j => j.AdditionalExpenses)
                .Include(j => j.LaborItems)
                .Include(j => j.Invoice)
                .FirstOrDefaultAsync(j => j.Number == joNumber);

            if (jo == null) return null;

            var issuedParts = jo.IssuedParts.Select(ip => new IssuedPartDto
            {
                PartId = ip.PartId,
                PartName = ip.Part.Name,
                PartNumber = ip.Part.Number,
                Qty = ip.Qty,
                SellingPrice = ip.Part.SellingPrice,
                Total = ip.Qty * ip.Part.SellingPrice
            }).ToList();

            var expenses = jo.AdditionalExpenses.Select(e => new AdditionalExpenseDto
            {
                Id = e.Id,
                Description = e.Description,
                Amount = e.Amount
            }).ToList();

            var laborItems = jo.LaborItems
                .OrderBy(l => l.SortOrder)
                .ThenBy(l => l.Id)
                .Select(l => new LaborItemDto
                {
                    Id = l.Id,
                    Description = l.Description,
                    Amount = l.Amount,
                    SortOrder = l.SortOrder
                }).ToList();

            if (laborItems.Count == 0 && jo.LaborAmount > 0)
            {
                laborItems.Add(new LaborItemDto
                {
                    Id = 0,
                    Description = "Workshop Labor",
                    Amount = jo.LaborAmount,
                    SortOrder = 0
                });
            }

            var laborAmount = laborItems.Sum(l => l.Amount);
            var partsTotal = issuedParts.Sum(p => p.Total);
            var expensesTotal = expenses.Sum(e => e.Amount);
            var grandTotal = partsTotal + laborAmount + expensesTotal;

            // Work items classification
            var workFoundItems = jo.WorkItems.Select(w => new WorkFoundItemDto
            {
                Id = w.Id,
                Description = w.Item,
                Note = w.Note,
                Approved = !w.IsDeferred
            }).ToList();

            var approvedItems = jo.WorkItems
                .Where(w => !w.IsDeferred && !w.IsRecommended)
                .Select(w => new ApprovedWorkDto { Item = w.Item, Note = w.Note })
                .ToList();

            var deferredItems = jo.WorkItems
                .Where(w => w.IsDeferred)
                .Select(w => w.Item)
                .ToList();

            return new AccountantJobDetailsDto
            {
                Id = jo.Id,
                Number = jo.Number,
                Date = jo.Date.ToString("dd MMM yyyy"),
                Status = jo.Status.ToString(),
                Type = jo.Type,
                CustomerName = jo.Customer.Name,
                CustomerPhone = jo.Customer.Phone,
                VehicleName = jo.Vehicle.Make + " " + jo.Vehicle.Model,
                VehiclePlate = jo.Vehicle.Plate,
                VehicleKm = jo.Km ?? jo.Vehicle.Km,
                VehicleVin = jo.Vehicle.VIN,
                Engineer = jo.Engineer,
                CustomerRequest = jo.RequiredWork,
                LaborAmount = laborAmount,
                LaborItems = laborItems,
                WorkFoundItems = workFoundItems,
                ApprovedItems = approvedItems,
                DeferredItems = deferredItems,
                IssuedParts = issuedParts,
                AdditionalExpenses = expenses,
                PartsTotal = partsTotal,
                ExpensesTotal = expensesTotal,
                GrandTotal = grandTotal,
                HasInvoice = jo.Invoice != null,
                InvoiceNumber = jo.Invoice?.InvoiceNumber
            };
        }

        public async Task<bool> SaveWorkFoundAsync(string joNumber, SaveWorkFoundDto dto)
        {
            var jo = await _context.JobOrders
                .Include(j => j.WorkItems)
                .FirstOrDefaultAsync(j => j.Number == joNumber);

            if (jo == null) return false;

            // Remove existing work items
            _context.JobOrderWorkItems.RemoveRange(jo.WorkItems);

            // Add new work items
            foreach (var item in dto.Items)
            {
                var workItem = new JobOrderWorkItem
                {
                    JobOrderId = jo.Id,
                    Item = item.Description,
                    Note = item.Note,
                    IsDeferred = !item.Approved,
                    IsRecommended = false
                };
                _context.JobOrderWorkItems.Add(workItem);

                // If deferred, also add to DeferredWork for vehicle history
                if (!item.Approved)
                {
                    var deferred = new DeferredWork
                    {
                        VehicleId = jo.VehicleId,
                        Item = item.Description,
                        Date = DateTime.UtcNow,
                        JobOrderNumber = jo.Number,
                        Km = jo.Km,
                        Engineer = jo.Engineer
                    };
                    _context.DeferredWorks.Add(deferred);
                }
            }

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> SaveJobOrderLaborAsync(string joNumber, SaveJobOrderLaborDto dto)
        {
            var jo = await _context.JobOrders
                .Include(j => j.LaborItems)
                .Include(j => j.Invoice)
                .FirstOrDefaultAsync(j => j.Number == joNumber);

            if (jo == null || jo.Invoice != null) return false;

            var existingItems = jo.LaborItems.ToList();
            _context.JobOrderLaborItems.RemoveRange(existingItems);
            await _context.SaveChangesAsync();

            int order = 0;
            foreach (var item in dto.LaborItems)
            {
                if (!string.IsNullOrWhiteSpace(item.Description) && item.Amount >= 0)
                {
                    _context.JobOrderLaborItems.Add(new JobOrderLaborItem
                    {
                        JobOrderId = jo.Id,
                        Description = item.Description.Trim(),
                        Amount = item.Amount,
                        SortOrder = item.SortOrder > 0 ? item.SortOrder : order++
                    });
                }
            }

            await _context.SaveChangesAsync();
            await _context.Entry(jo).Collection(j => j.LaborItems).LoadAsync();
            jo.LaborAmount = jo.LaborItems.Sum(li => li.Amount);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<InvoiceDetailsDto?> CreateInvoiceAsync(string joNumber, CreateInvoiceDto dto)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var jo = await _context.JobOrders
                    .Include(j => j.Customer)
                    .Include(j => j.Vehicle)
                    .Include(j => j.IssuedParts)
                        .ThenInclude(ip => ip.Part)
                    .Include(j => j.AdditionalExpenses)
                    .Include(j => j.LaborItems)
                    .Include(j => j.Invoice)
                    .FirstOrDefaultAsync(j => j.Number == joNumber);

                if (jo == null || jo.Invoice != null) return null;

                // 1. If dto contains laborItems, update JobOrder labor items
                if (dto.LaborItems != null && dto.LaborItems.Count > 0)
                {
                    var existingItems = jo.LaborItems.ToList();
                    _context.JobOrderLaborItems.RemoveRange(existingItems);
                    await _context.SaveChangesAsync();

                    int order = 0;
                    foreach (var item in dto.LaborItems)
                    {
                        if (!string.IsNullOrWhiteSpace(item.Description) && item.Amount >= 0)
                        {
                            _context.JobOrderLaborItems.Add(new JobOrderLaborItem
                            {
                                JobOrderId = jo.Id,
                                Description = item.Description.Trim(),
                                Amount = item.Amount,
                                SortOrder = item.SortOrder > 0 ? item.SortOrder : order++
                            });
                        }
                    }
                    await _context.SaveChangesAsync();
                    await _context.Entry(jo).Collection(j => j.LaborItems).LoadAsync();
                }

                // 2. Determine labor total from itemized rows or dto
                decimal laborTotal = jo.LaborItems.Count > 0
                    ? jo.LaborItems.Sum(li => li.Amount)
                    : dto.LaborAmount;

                jo.LaborAmount = laborTotal;

                // 3. Remove old expenses and add new ones
                _context.AdditionalExpenses.RemoveRange(jo.AdditionalExpenses.ToList());
                await _context.SaveChangesAsync();
                foreach (var exp in dto.AdditionalExpenses)
                {
                    if (!string.IsNullOrWhiteSpace(exp.Description) && exp.Amount > 0)
                    {
                        _context.AdditionalExpenses.Add(new AdditionalExpense
                        {
                            JobOrderId = jo.Id,
                            Description = exp.Description,
                            Amount = exp.Amount
                        });
                    }
                }

                await _context.SaveChangesAsync();

                // Recalculate totals
                var partsTotal = jo.IssuedParts.Sum(ip => ip.Qty * ip.Part.SellingPrice);
                var expensesTotal = await _context.AdditionalExpenses
                    .Where(e => e.JobOrderId == jo.Id)
                    .SumAsync(e => e.Amount);
                var grandTotal = partsTotal + laborTotal + expensesTotal;

                // Generate invoice number
                var invoiceNumber = await GetNextInvoiceNumberAsync();

                // Create invoice
                var invoice = new Invoice
                {
                    InvoiceNumber = invoiceNumber,
                    JobOrderId = jo.Id,
                    Date = DateTime.UtcNow,
                    PartsTotal = partsTotal,
                    LaborAmount = laborTotal,
                    ExpensesTotal = expensesTotal,
                    GrandTotal = grandTotal,
                    PaymentStatus = PaymentStatus.Unpaid,
                    PaidAmount = 0
                };

                _context.Invoices.Add(invoice);
                await _context.SaveChangesAsync();

                // 4. Snapshot InvoiceLaborItems
                if (jo.LaborItems.Count > 0)
                {
                    foreach (var li in jo.LaborItems)
                    {
                        _context.InvoiceLaborItems.Add(new InvoiceLaborItem
                        {
                            InvoiceId = invoice.Id,
                            Description = li.Description,
                            Amount = li.Amount,
                            SortOrder = li.SortOrder
                        });
                    }
                }
                else if (laborTotal > 0)
                {
                    _context.InvoiceLaborItems.Add(new InvoiceLaborItem
                    {
                        InvoiceId = invoice.Id,
                        Description = "Workshop Labor",
                        Amount = laborTotal,
                        SortOrder = 0
                    });
                }

                // Change job order status to Closed
                jo.Status = JobOrderStatus.Closed;

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return await GetInvoiceDetailsAsync(invoiceNumber);
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task<List<InvoiceListDto>> GetInvoicesAsync(string? search = null, string? paymentStatus = null)
        {
            var query = _context.Invoices
                .Include(i => i.JobOrder)
                    .ThenInclude(j => j.Customer)
                .Include(i => i.JobOrder)
                    .ThenInclude(j => j.Vehicle)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                var s = search.ToLower();
                query = query.Where(i =>
                    i.InvoiceNumber.ToLower().Contains(s) ||
                    i.JobOrder.Number.ToLower().Contains(s) ||
                    i.JobOrder.Customer.Name.ToLower().Contains(s));
            }

            if (!string.IsNullOrWhiteSpace(paymentStatus) && paymentStatus != "All")
            {
                if (Enum.TryParse<PaymentStatus>(paymentStatus, true, out var statusEnum))
                    query = query.Where(i => i.PaymentStatus == statusEnum);
            }

            return await query
                .OrderByDescending(i => i.Date)
                .Select(i => new InvoiceListDto
                {
                    InvoiceNumber = i.InvoiceNumber,
                    JobOrderId = i.JobOrderId,
                    JobOrderNumber = i.JobOrder.Number,
                    Date = i.Date.ToString("dd MMM yyyy"),
                    Customer = i.JobOrder.Customer.Name,
                    Vehicle = i.JobOrder.Vehicle.Make + " " + i.JobOrder.Vehicle.Model,
                    PartsTotal = i.PartsTotal,
                    LaborAmount = i.LaborAmount,
                    ExpensesTotal = i.ExpensesTotal,
                    GrandTotal = i.GrandTotal,
                    PaymentStatus = i.PaymentStatus.ToString()
                }).ToListAsync();
        }

        public async Task<InvoiceDetailsDto?> GetInvoiceDetailsAsync(string invoiceNumber)
        {
            var inv = await _context.Invoices
                .Include(i => i.JobOrder)
                    .ThenInclude(j => j.Customer)
                .Include(i => i.JobOrder)
                    .ThenInclude(j => j.Vehicle)
                .Include(i => i.JobOrder)
                    .ThenInclude(j => j.IssuedParts)
                        .ThenInclude(ip => ip.Part)
                .Include(i => i.JobOrder)
                    .ThenInclude(j => j.AdditionalExpenses)
                .Include(i => i.LaborItems)
                .Include(i => i.Payments)
                .FirstOrDefaultAsync(i => i.InvoiceNumber == invoiceNumber);

            if (inv == null) return null;

            var jo = inv.JobOrder;

            var laborItems = inv.LaborItems
                .OrderBy(l => l.SortOrder)
                .ThenBy(l => l.Id)
                .Select(l => new LaborItemDto
                {
                    Id = l.Id,
                    Description = l.Description,
                    Amount = l.Amount,
                    SortOrder = l.SortOrder
                }).ToList();

            if (laborItems.Count == 0 && inv.LaborAmount > 0)
            {
                laborItems.Add(new LaborItemDto
                {
                    Id = 0,
                    Description = "Workshop Labor",
                    Amount = inv.LaborAmount,
                    SortOrder = 0
                });
            }

            return new InvoiceDetailsDto
            {
                InvoiceNumber = inv.InvoiceNumber,
                Date = inv.Date.ToString("dd MMM yyyy"),
                JobOrderId = jo.Id,
                JobOrderNumber = jo.Number,
                CustomerName = jo.Customer.Name,
                CustomerPhone = jo.Customer.Phone,
                VehicleName = jo.Vehicle.Make + " " + jo.Vehicle.Model,
                VehiclePlate = jo.Vehicle.Plate,
                VehicleKm = jo.Km ?? jo.Vehicle.Km,
                VehicleVin = jo.Vehicle.VIN,
                Engineer = jo.Engineer,
                IssuedParts = jo.IssuedParts.Select(ip => new IssuedPartDto
                {
                    PartId = ip.PartId,
                    PartName = ip.Part.Name,
                    PartNumber = ip.Part.Number,
                    Qty = ip.Qty,
                    SellingPrice = ip.Part.SellingPrice,
                    Total = ip.Qty * ip.Part.SellingPrice
                }).ToList(),
                PartsTotal = inv.PartsTotal,
                LaborAmount = inv.LaborAmount,
                LaborItems = laborItems,
                AdditionalExpenses = jo.AdditionalExpenses.Select(e => new AdditionalExpenseDto
                {
                    Id = e.Id,
                    Description = e.Description,
                    Amount = e.Amount
                }).ToList(),
                ExpensesTotal = inv.ExpensesTotal,
                GrandTotal = inv.GrandTotal,
                PaymentStatus = inv.PaymentStatus.ToString(),
                PaidAmount = inv.PaidAmount,
                RemainingAmount = inv.GrandTotal - inv.PaidAmount,
                Payments = inv.Payments.OrderByDescending(p => p.Date).Select(p => new PaymentDto
                {
                    Id = p.Id,
                    Amount = p.Amount,
                    Date = p.Date.ToString("dd MMM yyyy"),
                    Method = p.Method.ToString(),
                    Note = p.Note,
                    InvoiceNumber = inv.InvoiceNumber,
                    CustomerName = jo.Customer.Name
                }).ToList()
            };
        }

        public async Task<List<PaymentDto>> GetPaymentsAsync(string? search = null)
        {
            var query = _context.Payments
                .Include(p => p.Invoice)
                    .ThenInclude(i => i.JobOrder)
                        .ThenInclude(j => j.Customer)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                var s = search.ToLower();
                query = query.Where(p =>
                    p.Invoice.InvoiceNumber.ToLower().Contains(s) ||
                    p.Invoice.JobOrder.Customer.Name.ToLower().Contains(s));
            }

            return await query
                .OrderByDescending(p => p.Date)
                .Select(p => new PaymentDto
                {
                    Id = p.Id,
                    Amount = p.Amount,
                    Date = p.Date.ToString("dd MMM yyyy"),
                    Method = p.Method.ToString(),
                    Note = p.Note,
                    InvoiceNumber = p.Invoice.InvoiceNumber,
                    CustomerName = p.Invoice.JobOrder.Customer.Name
                }).ToListAsync();
        }

        public async Task<RecordPaymentResult> RecordPaymentAsync(CreatePaymentDto dto)
        {
            // 1. Server-side validation: Reject zero or negative payments
            if (dto.Amount <= 0)
            {
                return new RecordPaymentResult
                {
                    Success = false,
                    StatusCode = 400,
                    ErrorMessage = "Payment amount must be greater than 0."
                };
            }

            // 2. Execute within a Serializable database transaction for concurrency protection
            await using var transaction = await _context.Database.BeginTransactionAsync(System.Data.IsolationLevel.Serializable);
            try
            {
                var invoice = await _context.Invoices
                    .Include(i => i.JobOrder)
                        .ThenInclude(j => j.Customer)
                    .FirstOrDefaultAsync(i => i.InvoiceNumber == dto.InvoiceNumber);

                if (invoice == null)
                {
                    await transaction.RollbackAsync();
                    return new RecordPaymentResult
                    {
                        Success = false,
                        StatusCode = 404,
                        ErrorMessage = "Invoice not found."
                    };
                }

                // Reject payment if invoice is already fully paid
                if (invoice.PaymentStatus == PaymentStatus.Paid || invoice.PaidAmount >= invoice.GrandTotal)
                {
                    await transaction.RollbackAsync();
                    return new RecordPaymentResult
                    {
                        Success = false,
                        StatusCode = 400,
                        ErrorMessage = "Invoice is already fully paid."
                    };
                }

                // Calculate exact remaining balance
                decimal remaining = invoice.GrandTotal - invoice.PaidAmount;
                if (remaining <= 0)
                {
                    await transaction.RollbackAsync();
                    return new RecordPaymentResult
                    {
                        Success = false,
                        StatusCode = 400,
                        ErrorMessage = "Invoice has no remaining balance."
                    };
                }

                // Reject overpayments (do NOT cap overpayments; reject entire request)
                if (dto.Amount > remaining)
                {
                    await transaction.RollbackAsync();
                    return new RecordPaymentResult
                    {
                        Success = false,
                        StatusCode = 400,
                        ErrorMessage = $"Payment amount ({dto.Amount:N2} EGP) exceeds remaining balance ({remaining:N2} EGP)."
                    };
                }

                if (string.IsNullOrWhiteSpace(dto.Method) || !Enum.TryParse<PaymentMethod>(dto.Method.Trim(), true, out var method))
                {
                    await transaction.RollbackAsync();
                    return new RecordPaymentResult
                    {
                        Success = false,
                        StatusCode = 400,
                        ErrorMessage = $"Invalid payment method '{dto.Method}'. Allowed payment methods: Cash, Visa, InstaPay, Wallet, Card, BankTransfer."
                    };
                }

                var payment = new Payment
                {
                    InvoiceId = invoice.Id,
                    Amount = dto.Amount,
                    Date = DateTime.UtcNow,
                    Method = method,
                    Note = dto.Note
                };

                _context.Payments.Add(payment);

                // Update invoice paid amount and status
                invoice.PaidAmount += dto.Amount;
                if (invoice.PaidAmount >= invoice.GrandTotal)
                {
                    invoice.PaymentStatus = PaymentStatus.Paid;
                    invoice.PaidAmount = invoice.GrandTotal; // Exact match
                }
                else if (invoice.PaidAmount > 0)
                {
                    invoice.PaymentStatus = PaymentStatus.PartiallyPaid;
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                var paymentDto = new PaymentDto
                {
                    Id = payment.Id,
                    Amount = payment.Amount,
                    Date = payment.Date.ToString("dd MMM yyyy"),
                    Method = payment.Method.ToString(),
                    Note = payment.Note,
                    InvoiceNumber = invoice.InvoiceNumber,
                    CustomerName = invoice.JobOrder.Customer.Name
                };

                return new RecordPaymentResult
                {
                    Success = true,
                    Payment = paymentDto
                };
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return new RecordPaymentResult
                {
                    Success = false,
                    StatusCode = 500,
                    ErrorMessage = $"Payment transaction failed: {ex.Message}"
                };
            }
        }

        public async Task<bool> UpdatePartPricesAsync(int partId, UpdatePartPricesDto dto)
        {
            var part = await _context.Parts.FindAsync(partId);
            if (part == null) return false;

            part.PurchasePrice = dto.PurchasePrice;
            part.SellingPrice = dto.SellingPrice;

            await _context.SaveChangesAsync();
            return true;
        }

        private async Task<string> GetNextInvoiceNumberAsync()
        {
            var year = DateTime.UtcNow.Year;
            var prefix = $"INV-{year}-";

            var lastNumber = await _context.Invoices
                .Where(i => i.InvoiceNumber.StartsWith(prefix))
                .OrderByDescending(i => i.InvoiceNumber)
                .Select(i => i.InvoiceNumber)
                .FirstOrDefaultAsync();

            int nextSeq = 1;
            if (lastNumber != null)
            {
                var seqStr = lastNumber.Replace(prefix, "");
                if (int.TryParse(seqStr, out var seq))
                    nextSeq = seq + 1;
            }

            return $"{prefix}{nextSeq:D5}";
        }
    }
}
