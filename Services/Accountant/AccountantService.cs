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
        Task<InvoiceDetailsDto?> CreateInvoiceAsync(string joNumber, CreateInvoiceDto dto);
        Task<List<InvoiceListDto>> GetInvoicesAsync(string? search = null, string? paymentStatus = null);
        Task<InvoiceDetailsDto?> GetInvoiceDetailsAsync(string invoiceNumber);
        Task<List<PaymentDto>> GetPaymentsAsync(string? search = null);
        Task<PaymentDto?> RecordPaymentAsync(CreatePaymentDto dto);
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

            var partsTotal = issuedParts.Sum(p => p.Total);
            var expensesTotal = expenses.Sum(e => e.Amount);
            var grandTotal = partsTotal + jo.LaborAmount + expensesTotal;

            // Work items classification
            var workFoundItems = jo.WorkItems.Select(w => new WorkFoundItemDto
            {
                Id = w.Id,
                Description = w.Item,
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
                LaborAmount = jo.LaborAmount,
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

        public async Task<InvoiceDetailsDto?> CreateInvoiceAsync(string joNumber, CreateInvoiceDto dto)
        {
            var jo = await _context.JobOrders
                .Include(j => j.Customer)
                .Include(j => j.Vehicle)
                .Include(j => j.IssuedParts)
                    .ThenInclude(ip => ip.Part)
                .Include(j => j.AdditionalExpenses)
                .Include(j => j.Invoice)
                .FirstOrDefaultAsync(j => j.Number == joNumber);

            if (jo == null || jo.Invoice != null) return null;

            // Update labor amount
            jo.LaborAmount = dto.LaborAmount;

            // Remove old expenses and add new ones
            _context.AdditionalExpenses.RemoveRange(jo.AdditionalExpenses);
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
            var grandTotal = partsTotal + dto.LaborAmount + expensesTotal;

            // Generate invoice number
            var invoiceNumber = await GetNextInvoiceNumberAsync();

            // Create invoice
            var invoice = new Invoice
            {
                InvoiceNumber = invoiceNumber,
                JobOrderId = jo.Id,
                Date = DateTime.UtcNow,
                PartsTotal = partsTotal,
                LaborAmount = dto.LaborAmount,
                ExpensesTotal = expensesTotal,
                GrandTotal = grandTotal,
                PaymentStatus = PaymentStatus.Unpaid,
                PaidAmount = 0
            };

            _context.Invoices.Add(invoice);

            // Change job order status to Closed
            jo.Status = JobOrderStatus.Closed;

            await _context.SaveChangesAsync();

            return await GetInvoiceDetailsAsync(invoiceNumber);
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
                .Include(i => i.Payments)
                .FirstOrDefaultAsync(i => i.InvoiceNumber == invoiceNumber);

            if (inv == null) return null;

            var jo = inv.JobOrder;

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

        public async Task<PaymentDto?> RecordPaymentAsync(CreatePaymentDto dto)
        {
            var invoice = await _context.Invoices
                .Include(i => i.JobOrder)
                    .ThenInclude(j => j.Customer)
                .FirstOrDefaultAsync(i => i.InvoiceNumber == dto.InvoiceNumber);

            if (invoice == null) return null;

            if (!Enum.TryParse<PaymentMethod>(dto.Method, true, out var method))
                method = PaymentMethod.Cash;

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
                invoice.PaidAmount = invoice.GrandTotal; // Cap at grand total
            }
            else if (invoice.PaidAmount > 0)
            {
                invoice.PaymentStatus = PaymentStatus.PartiallyPaid;
            }

            await _context.SaveChangesAsync();

            return new PaymentDto
            {
                Id = payment.Id,
                Amount = payment.Amount,
                Date = payment.Date.ToString("dd MMM yyyy"),
                Method = payment.Method.ToString(),
                Note = payment.Note,
                InvoiceNumber = invoice.InvoiceNumber,
                CustomerName = invoice.JobOrder.Customer.Name
            };
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
