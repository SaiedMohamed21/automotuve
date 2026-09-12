using Microsoft.EntityFrameworkCore;
using StarAutoCenter.Data;
using StarAutoCenter.DTOs.Suppliers;
using StarAutoCenter.Models;
using StarAutoCenter.Models.Enums;

namespace StarAutoCenter.Services.Suppliers
{
    public class SupplierService : ISupplierService
    {
        private readonly ApplicationDbContext _context;

        public SupplierService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<SupplierDashboardSummaryDto> GetSummaryAsync()
        {
            var totalSuppliers = await _context.Suppliers.CountAsync();
            var totalPurchases = await _context.SupplierPurchases.SumAsync(p => (decimal?)p.TotalAmount) ?? 0;
            var totalPaid = await _context.SupplierPayments.SumAsync(p => (decimal?)p.Amount) ?? 0;
            var totalOutstandingDebt = Math.Max(0, totalPurchases - totalPaid);

            return new SupplierDashboardSummaryDto
            {
                TotalSuppliers = totalSuppliers,
                TotalPurchases = totalPurchases,
                TotalPaid = totalPaid,
                TotalOutstandingDebt = totalOutstandingDebt
            };
        }

        public async Task<List<SupplierDto>> GetSuppliersAsync(string? search = null, string? filter = null)
        {
            var query = _context.Suppliers
                .Include(s => s.Purchases)
                .Include(s => s.Payments)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                var s = search.Trim().ToLower();
                query = query.Where(x =>
                    x.Name.ToLower().Contains(s) ||
                    x.Phone.ToLower().Contains(s) ||
                    (x.Company != null && x.Company.ToLower().Contains(s)));
            }

            var suppliers = await query.OrderBy(s => s.Name).ToListAsync();

            var dtos = suppliers.Select(s =>
            {
                var totalPurchases = s.Purchases.Sum(p => p.TotalAmount);
                var totalPaid = s.Payments.Sum(p => p.Amount);
                var outstanding = Math.Max(0, totalPurchases - totalPaid);
                var lastPayment = s.Payments.OrderByDescending(p => p.PaymentDate).FirstOrDefault();

                return new SupplierDto
                {
                    Id = s.Id,
                    Name = s.Name,
                    Phone = s.Phone,
                    Company = s.Company,
                    Address = s.Address,
                    Notes = s.Notes,
                    IsActive = s.IsActive,
                    CreatedAt = s.CreatedAt.ToString("dd MMM yyyy"),
                    TotalPurchases = totalPurchases,
                    TotalPaid = totalPaid,
                    OutstandingBalance = outstanding,
                    LastPaymentDate = lastPayment?.PaymentDate.ToString("dd MMM yyyy")
                };
            }).ToList();

            // Apply filter
            if (!string.IsNullOrWhiteSpace(filter))
            {
                var f = filter.Trim().ToLower();
                if (f == "outstanding")
                    dtos = dtos.Where(d => d.OutstandingBalance > 0).ToList();
                else if (f == "paid")
                    dtos = dtos.Where(d => d.OutstandingBalance <= 0).ToList();
                else if (f == "inactive")
                    dtos = dtos.Where(d => !d.IsActive).ToList();
            }

            return dtos;
        }

        public async Task<SupplierDto?> GetSupplierByIdAsync(int id)
        {
            var supplier = await _context.Suppliers
                .Include(s => s.Purchases)
                .Include(s => s.Payments)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (supplier == null) return null;

            var totalPurchases = supplier.Purchases.Sum(p => p.TotalAmount);
            var totalPaid = supplier.Payments.Sum(p => p.Amount);
            var outstanding = Math.Max(0, totalPurchases - totalPaid);
            var lastPayment = supplier.Payments.OrderByDescending(p => p.PaymentDate).FirstOrDefault();

            return new SupplierDto
            {
                Id = supplier.Id,
                Name = supplier.Name,
                Phone = supplier.Phone,
                Company = supplier.Company,
                Address = supplier.Address,
                Notes = supplier.Notes,
                IsActive = supplier.IsActive,
                CreatedAt = supplier.CreatedAt.ToString("dd MMM yyyy"),
                TotalPurchases = totalPurchases,
                TotalPaid = totalPaid,
                OutstandingBalance = outstanding,
                LastPaymentDate = lastPayment?.PaymentDate.ToString("dd MMM yyyy")
            };
        }

        public async Task<SupplierDto> CreateSupplierAsync(CreateSupplierDto dto)
        {
            var supplier = new Supplier
            {
                Name = dto.Name.Trim(),
                Phone = dto.Phone.Trim(),
                Company = dto.Company?.Trim(),
                Address = dto.Address?.Trim(),
                Notes = dto.Notes?.Trim(),
                IsActive = dto.IsActive,
                CreatedAt = DateTime.UtcNow
            };

            _context.Suppliers.Add(supplier);
            await _context.SaveChangesAsync();

            return new SupplierDto
            {
                Id = supplier.Id,
                Name = supplier.Name,
                Phone = supplier.Phone,
                Company = supplier.Company,
                Address = supplier.Address,
                Notes = supplier.Notes,
                IsActive = supplier.IsActive,
                CreatedAt = supplier.CreatedAt.ToString("dd MMM yyyy"),
                TotalPurchases = 0,
                TotalPaid = 0,
                OutstandingBalance = 0,
                LastPaymentDate = null
            };
        }

        public async Task<SupplierDto?> UpdateSupplierAsync(int id, UpdateSupplierDto dto)
        {
            var supplier = await _context.Suppliers
                .Include(s => s.Purchases)
                .Include(s => s.Payments)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (supplier == null) return null;

            supplier.Name = dto.Name.Trim();
            supplier.Phone = dto.Phone.Trim();
            supplier.Company = dto.Company?.Trim();
            supplier.Address = dto.Address?.Trim();
            supplier.Notes = dto.Notes?.Trim();
            supplier.IsActive = dto.IsActive;

            await _context.SaveChangesAsync();

            var totalPurchases = supplier.Purchases.Sum(p => p.TotalAmount);
            var totalPaid = supplier.Payments.Sum(p => p.Amount);
            var outstanding = Math.Max(0, totalPurchases - totalPaid);
            var lastPayment = supplier.Payments.OrderByDescending(p => p.PaymentDate).FirstOrDefault();

            return new SupplierDto
            {
                Id = supplier.Id,
                Name = supplier.Name,
                Phone = supplier.Phone,
                Company = supplier.Company,
                Address = supplier.Address,
                Notes = supplier.Notes,
                IsActive = supplier.IsActive,
                CreatedAt = supplier.CreatedAt.ToString("dd MMM yyyy"),
                TotalPurchases = totalPurchases,
                TotalPaid = totalPaid,
                OutstandingBalance = outstanding,
                LastPaymentDate = lastPayment?.PaymentDate.ToString("dd MMM yyyy")
            };
        }

        public async Task<bool> DeleteSupplierAsync(int id)
        {
            var supplier = await _context.Suppliers
                .Include(s => s.Purchases)
                .Include(s => s.Payments)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (supplier == null) return false;

            // If supplier has financial history, archive/soft-delete
            supplier.IsDeleted = true;
            supplier.IsActive = false;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<string> GetNextPurchaseNumberAsync()
        {
            var year = DateTime.UtcNow.Year;
            var prefix = $"PUR-{year}-";

            var numbers = await _context.SupplierPurchases
                .Where(p => p.PurchaseNumber.StartsWith(prefix))
                .Select(p => p.PurchaseNumber)
                .ToListAsync();

            var maxSeq = 0;
            foreach (var num in numbers)
            {
                var suffix = num.Substring(prefix.Length);
                if (int.TryParse(suffix, out int seq) && seq > maxSeq)
                {
                    maxSeq = seq;
                }
            }

            return $"{prefix}{(maxSeq + 1):D5}";
        }

        public async Task<List<SupplierPurchaseDto>> GetPurchasesAsync(int supplierId)
        {
            var purchases = await _context.SupplierPurchases
                .Include(p => p.Supplier)
                .Include(p => p.Items)
                    .ThenInclude(i => i.Part)
                .Where(p => p.SupplierId == supplierId)
                .OrderByDescending(p => p.PurchaseDate)
                .ThenByDescending(p => p.Id)
                .ToListAsync();

            return purchases.Select(p => new SupplierPurchaseDto
            {
                Id = p.Id,
                PurchaseNumber = p.PurchaseNumber,
                SupplierId = p.SupplierId,
                SupplierName = p.Supplier.Name,
                PurchaseDate = p.PurchaseDate.ToString("dd MMM yyyy"),
                DueDate = p.DueDate?.ToString("dd MMM yyyy"),
                Notes = p.Notes,
                TotalAmount = p.TotalAmount,
                PaidAmount = p.PaidAmount,
                PaymentStatus = p.PaymentStatus.ToString(),
                CreatedAt = p.CreatedAt.ToString("dd MMM yyyy HH:mm"),
                Items = p.Items.Select(i => new SupplierPurchaseItemDto
                {
                    Id = i.Id,
                    PartId = i.PartId,
                    PartName = i.Part?.Name ?? "Unknown Part",
                    PartNumber = i.Part?.Number ?? "",
                    Quantity = i.Quantity,
                    UnitPrice = i.UnitPrice,
                    TotalPrice = i.TotalPrice
                }).ToList()
            }).ToList();
        }

        public async Task<SupplierPurchaseDto?> GetPurchaseByIdAsync(int purchaseId)
        {
            var p = await _context.SupplierPurchases
                .Include(x => x.Supplier)
                .Include(x => x.Items)
                    .ThenInclude(i => i.Part)
                .FirstOrDefaultAsync(x => x.Id == purchaseId);

            if (p == null) return null;

            return new SupplierPurchaseDto
            {
                Id = p.Id,
                PurchaseNumber = p.PurchaseNumber,
                SupplierId = p.SupplierId,
                SupplierName = p.Supplier.Name,
                PurchaseDate = p.PurchaseDate.ToString("dd MMM yyyy"),
                DueDate = p.DueDate?.ToString("dd MMM yyyy"),
                Notes = p.Notes,
                TotalAmount = p.TotalAmount,
                PaidAmount = p.PaidAmount,
                PaymentStatus = p.PaymentStatus.ToString(),
                CreatedAt = p.CreatedAt.ToString("dd MMM yyyy HH:mm"),
                Items = p.Items.Select(i => new SupplierPurchaseItemDto
                {
                    Id = i.Id,
                    PartId = i.PartId,
                    PartName = i.Part?.Name ?? "Unknown Part",
                    PartNumber = i.Part?.Number ?? "",
                    Quantity = i.Quantity,
                    UnitPrice = i.UnitPrice,
                    TotalPrice = i.TotalPrice
                }).ToList()
            };
        }

        public async Task<SupplierPurchaseDto> CreatePurchaseAsync(int supplierId, CreateSupplierPurchaseDto dto)
        {
            var supplier = await _context.Suppliers.FindAsync(supplierId);
            if (supplier == null)
                throw new KeyNotFoundException("Supplier not found");

            if (dto.Items == null || dto.Items.Count == 0)
                throw new InvalidOperationException("At least one purchase item is required");

            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                var purchaseNumber = await GetNextPurchaseNumberAsync();
                var purchaseDate = dto.PurchaseDate ?? DateTime.UtcNow;

                decimal totalAmount = 0;
                var purchaseItems = new List<SupplierPurchaseItem>();

                foreach (var item in dto.Items)
                {
                    if (item.Quantity <= 0)
                        throw new InvalidOperationException("Item quantity must be greater than 0");

                    var part = await _context.Parts.FindAsync(item.PartId);
                    if (part == null)
                        throw new KeyNotFoundException($"Part with ID {item.PartId} not found");

                    var lineTotal = item.Quantity * item.UnitPrice;
                    totalAmount += lineTotal;

                    purchaseItems.Add(new SupplierPurchaseItem
                    {
                        PartId = part.Id,
                        Quantity = item.Quantity,
                        UnitPrice = item.UnitPrice,
                        TotalPrice = lineTotal
                    });

                    // ── Inventory Integration: Increase Stock IN ──
                    part.CurrentQty += item.Quantity;
                    part.Status = part.CurrentQty <= 0 ? PartStockStatus.OutOfStock
                        : part.CurrentQty <= part.MinQty ? PartStockStatus.LowStock
                        : PartStockStatus.InStock;

                    if (item.UnitPrice > 0)
                    {
                        part.PurchasePrice = item.UnitPrice;
                    }

                    _context.StockMovements.Add(new StockMovement
                    {
                        PartId = part.Id,
                        Type = StockMovementType.StockIn,
                        Reference = purchaseNumber,
                        Note = $"Supplier Purchase: {purchaseNumber} ({supplier.Name})",
                        Date = purchaseDate,
                        Qty = item.Quantity
                    });
                }

                var paidNow = Math.Max(0, dto.PaidNow);
                if (paidNow > totalAmount)
                {
                    paidNow = totalAmount;
                }

                var paymentStatus = paidNow switch
                {
                    _ when paidNow >= totalAmount => PaymentStatus.Paid,
                    _ when paidNow > 0 => PaymentStatus.PartiallyPaid,
                    _ => PaymentStatus.Unpaid
                };

                var purchase = new SupplierPurchase
                {
                    PurchaseNumber = purchaseNumber,
                    SupplierId = supplierId,
                    PurchaseDate = purchaseDate,
                    DueDate = dto.DueDate,
                    Notes = dto.Notes?.Trim(),
                    TotalAmount = totalAmount,
                    PaidAmount = paidNow,
                    PaymentStatus = paymentStatus,
                    CreatedAt = DateTime.UtcNow,
                    Items = purchaseItems
                };

                _context.SupplierPurchases.Add(purchase);
                await _context.SaveChangesAsync();

                // ── Supplier Account Transaction: Purchase (Debit: increases debt) ──
                _context.SupplierAccountTransactions.Add(new SupplierAccountTransaction
                {
                    SupplierId = supplierId,
                    TransactionDate = purchaseDate,
                    TransactionType = "PURCHASE",
                    ReferenceNumber = purchaseNumber,
                    Description = $"Purchase {purchaseNumber} ({dto.Items.Count} items)",
                    Debit = totalAmount,
                    Credit = 0,
                    PurchaseId = purchase.Id,
                    CreatedAt = DateTime.UtcNow
                });

                // ── If Paid Now: Record Supplier Payment & Credit Transaction ──
                if (paidNow > 0)
                {
                    var paymentNumber = await GeneratePaymentNumberAsync();
                    var payment = new SupplierPayment
                    {
                        PaymentNumber = paymentNumber,
                        SupplierId = supplierId,
                        PurchaseId = purchase.Id,
                        Amount = paidNow,
                        PaymentDate = purchaseDate,
                        PaymentMethod = dto.PaymentMethod ?? "Cash",
                        Reference = dto.PaymentReference?.Trim() ?? purchaseNumber,
                        Notes = $"Initial payment upon purchase {purchaseNumber}",
                        CreatedBy = "Accountant",
                        CreatedAt = DateTime.UtcNow
                    };

                    _context.SupplierPayments.Add(payment);
                    await _context.SaveChangesAsync();

                    // Credit: decreases debt
                    _context.SupplierAccountTransactions.Add(new SupplierAccountTransaction
                    {
                        SupplierId = supplierId,
                        TransactionDate = purchaseDate,
                        TransactionType = "PAYMENT",
                        ReferenceNumber = paymentNumber,
                        Description = $"Initial payment for {purchaseNumber} ({payment.PaymentMethod})",
                        Debit = 0,
                        Credit = paidNow,
                        PurchaseId = purchase.Id,
                        PaymentId = payment.Id,
                        CreatedAt = DateTime.UtcNow
                    });
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return await GetPurchaseByIdAsync(purchase.Id) ?? throw new InvalidOperationException("Could not load created purchase");
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task<List<SupplierPaymentDto>> GetPaymentsAsync(int supplierId)
        {
            var payments = await _context.SupplierPayments
                .Include(p => p.Supplier)
                .Include(p => p.Purchase)
                .Where(p => p.SupplierId == supplierId)
                .OrderByDescending(p => p.PaymentDate)
                .ThenByDescending(p => p.Id)
                .ToListAsync();

            return payments.Select(p => new SupplierPaymentDto
            {
                Id = p.Id,
                PaymentNumber = p.PaymentNumber,
                SupplierId = p.SupplierId,
                SupplierName = p.Supplier.Name,
                PurchaseId = p.PurchaseId,
                PurchaseNumber = p.Purchase?.PurchaseNumber,
                Amount = p.Amount,
                PaymentDate = p.PaymentDate.ToString("dd MMM yyyy"),
                PaymentMethod = p.PaymentMethod,
                Reference = p.Reference,
                Notes = p.Notes,
                CreatedBy = p.CreatedBy,
                CreatedAt = p.CreatedAt.ToString("dd MMM yyyy HH:mm")
            }).ToList();
        }

        public async Task<SupplierPaymentDto> CreatePaymentAsync(int supplierId, CreateSupplierPaymentDto dto, string? createdBy = null)
        {
            var supplier = await _context.Suppliers.FindAsync(supplierId);
            if (supplier == null)
                throw new KeyNotFoundException("Supplier not found");

            if (dto.Amount <= 0)
                throw new InvalidOperationException("Payment amount must be greater than 0");

            // Calculate current outstanding debt
            var totalPurchases = await _context.SupplierPurchases
                .Where(p => p.SupplierId == supplierId)
                .SumAsync(p => (decimal?)p.TotalAmount) ?? 0;

            var totalPaid = await _context.SupplierPayments
                .Where(p => p.SupplierId == supplierId)
                .SumAsync(p => (decimal?)p.Amount) ?? 0;

            var currentOutstanding = Math.Max(0, totalPurchases - totalPaid);

            if (dto.Amount > currentOutstanding)
            {
                throw new InvalidOperationException($"Payment amount ({dto.Amount:N2} EGP) cannot exceed current outstanding balance ({currentOutstanding:N2} EGP)");
            }

            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                var paymentNumber = await GeneratePaymentNumberAsync();
                var paymentDate = dto.PaymentDate ?? DateTime.UtcNow;

                var payment = new SupplierPayment
                {
                    PaymentNumber = paymentNumber,
                    SupplierId = supplierId,
                    PurchaseId = dto.PurchaseId,
                    Amount = dto.Amount,
                    PaymentDate = paymentDate,
                    PaymentMethod = dto.PaymentMethod,
                    Reference = dto.Reference?.Trim(),
                    Notes = dto.Notes?.Trim(),
                    CreatedBy = createdBy ?? "Accountant",
                    CreatedAt = DateTime.UtcNow
                };

                _context.SupplierPayments.Add(payment);

                // ── Allocate payment to purchase(s) ──
                if (dto.PurchaseId.HasValue)
                {
                    var purchase = await _context.SupplierPurchases.FindAsync(dto.PurchaseId.Value);
                    if (purchase != null && purchase.SupplierId == supplierId)
                    {
                        purchase.PaidAmount += dto.Amount;
                        purchase.PaymentStatus = purchase.PaidAmount >= purchase.TotalAmount
                            ? PaymentStatus.Paid
                            : PaymentStatus.PartiallyPaid;
                    }
                }
                else
                {
                    // General Account Payment: allocate sequentially (FIFO) to unpaid/partially paid purchases
                    var remainingToAllocate = dto.Amount;
                    var pendingPurchases = await _context.SupplierPurchases
                        .Where(p => p.SupplierId == supplierId && p.PaymentStatus != PaymentStatus.Paid)
                        .OrderBy(p => p.PurchaseDate)
                        .ThenBy(p => p.Id)
                        .ToListAsync();

                    foreach (var p in pendingPurchases)
                    {
                        if (remainingToAllocate <= 0) break;
                        var purchaseDue = Math.Max(0, p.TotalAmount - p.PaidAmount);
                        if (purchaseDue <= 0) continue;

                        var alloc = Math.Min(purchaseDue, remainingToAllocate);
                        p.PaidAmount += alloc;
                        p.PaymentStatus = p.PaidAmount >= p.TotalAmount
                            ? PaymentStatus.Paid
                            : PaymentStatus.PartiallyPaid;

                        remainingToAllocate -= alloc;
                    }
                }

                // ── Ledger Entry (Credit: decreases payable debt) ──
                _context.SupplierAccountTransactions.Add(new SupplierAccountTransaction
                {
                    SupplierId = supplierId,
                    TransactionDate = paymentDate,
                    TransactionType = "PAYMENT",
                    ReferenceNumber = paymentNumber,
                    Description = $"Supplier Payment ({payment.PaymentMethod})" +
                                  (string.IsNullOrEmpty(payment.Reference) ? "" : $" Ref: {payment.Reference}") +
                                  (string.IsNullOrEmpty(payment.Notes) ? "" : $" — {payment.Notes}"),
                    Debit = 0,
                    Credit = dto.Amount,
                    PurchaseId = dto.PurchaseId,
                    PaymentId = payment.Id,
                    CreatedAt = DateTime.UtcNow
                });

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return new SupplierPaymentDto
                {
                    Id = payment.Id,
                    PaymentNumber = payment.PaymentNumber,
                    SupplierId = payment.SupplierId,
                    SupplierName = supplier.Name,
                    PurchaseId = payment.PurchaseId,
                    PurchaseNumber = null,
                    Amount = payment.Amount,
                    PaymentDate = payment.PaymentDate.ToString("dd MMM yyyy"),
                    PaymentMethod = payment.PaymentMethod,
                    Reference = payment.Reference,
                    Notes = payment.Notes,
                    CreatedBy = payment.CreatedBy,
                    CreatedAt = payment.CreatedAt.ToString("dd MMM yyyy HH:mm")
                };
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task<SupplierStatementDto> GetStatementAsync(int supplierId)
        {
            var supplier = await _context.Suppliers
                .Include(s => s.Purchases)
                .Include(s => s.Payments)
                .FirstOrDefaultAsync(s => s.Id == supplierId);

            if (supplier == null)
                throw new KeyNotFoundException("Supplier not found");

            var txs = await _context.SupplierAccountTransactions
                .Where(t => t.SupplierId == supplierId)
                .OrderBy(t => t.TransactionDate)
                .ThenBy(t => t.Id)
                .ToListAsync();

            decimal running = 0;
            var entries = new List<SupplierStatementEntryDto>();

            foreach (var t in txs)
            {
                running += (t.Debit - t.Credit);
                entries.Add(new SupplierStatementEntryDto
                {
                    Id = t.Id,
                    Date = t.TransactionDate.ToString("dd MMM yyyy"),
                    Type = t.TransactionType,
                    ReferenceNumber = t.ReferenceNumber,
                    Description = t.Description,
                    Debit = t.Debit,
                    Credit = t.Credit,
                    Balance = running
                });
            }

            var totalPurchases = supplier.Purchases.Sum(p => p.TotalAmount);
            var totalPaid = supplier.Payments.Sum(p => p.Amount);
            var outstanding = Math.Max(0, totalPurchases - totalPaid);

            return new SupplierStatementDto
            {
                SupplierId = supplier.Id,
                SupplierName = supplier.Name,
                TotalPurchases = totalPurchases,
                TotalPaid = totalPaid,
                OutstandingBalance = outstanding,
                Transactions = entries
            };
        }

        private async Task<string> GeneratePaymentNumberAsync()
        {
            var year = DateTime.UtcNow.Year;
            var prefix = $"SPAY-{year}-";

            var numbers = await _context.SupplierPayments
                .Where(p => p.PaymentNumber.StartsWith(prefix))
                .Select(p => p.PaymentNumber)
                .ToListAsync();

            var maxSeq = 0;
            foreach (var num in numbers)
            {
                var suffix = num.Substring(prefix.Length);
                if (int.TryParse(suffix, out int seq) && seq > maxSeq)
                {
                    maxSeq = seq;
                }
            }

            return $"{prefix}{(maxSeq + 1):D5}";
        }
    }
}
