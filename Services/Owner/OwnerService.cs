using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StarAutoCenter.Data;
using StarAutoCenter.DTOs.Owner;
using StarAutoCenter.Models;
using StarAutoCenter.Models.Auth;
using StarAutoCenter.Models.Enums;

namespace StarAutoCenter.Services.Owner
{
    public interface IOwnerService
    {
        // Dashboard
        Task<OwnerDashboardDto> GetDashboardAsync(DateTime? startDate = null, DateTime? endDate = null, string? period = "This Month");

        // Users
        Task<List<UserDto>> GetUsersAsync(string? search = null, string? role = null, string? status = null);
        Task<UserDto> CreateUserAsync(CreateUserDto dto);
        Task<UserDto> UpdateUserAsync(string userId, UpdateUserDto dto);
        Task<bool> ToggleUserStatusAsync(string userId);
        Task<bool> ChangePasswordAsync(string userId, string newPassword);

        // Reports
        Task<OwnerReportsDto> GetReportsAsync();

        // Settings
        Task<BusinessSettingsDto> GetSettingsAsync();
        Task<BusinessSettingsDto> UpdateSettingsAsync(BusinessSettingsDto dto);
    }

    public class OwnerService : IOwnerService
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public OwnerService(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<OwnerDashboardDto> GetDashboardAsync(DateTime? startDate = null, DateTime? endDate = null, string? period = "This Month")
        {
            var today = DateTime.Today;
            DateTime start;
            DateTime end;

            if (startDate.HasValue && endDate.HasValue)
            {
                start = startDate.Value.Date;
                end = endDate.Value.Date.AddDays(1).AddTicks(-1);
                period = "Custom Range";
            }
            else
            {
                var p = (period ?? "This Month").Trim();
                if (p.Equals("Today", StringComparison.OrdinalIgnoreCase))
                {
                    start = today;
                    end = today.AddDays(1).AddTicks(-1);
                }
                else if (p.Equals("This Week", StringComparison.OrdinalIgnoreCase))
                {
                    int diff = (int)today.DayOfWeek - (int)DayOfWeek.Sunday;
                    if (diff < 0) diff += 7;
                    start = today.AddDays(-diff);
                    end = start.AddDays(7).AddTicks(-1);
                }
                else if (p.Equals("This Year", StringComparison.OrdinalIgnoreCase))
                {
                    start = new DateTime(today.Year, 1, 1);
                    end = new DateTime(today.Year, 12, 31, 23, 59, 59);
                }
                else // Default: This Month
                {
                    start = new DateTime(today.Year, today.Month, 1);
                    end = start.AddMonths(1).AddTicks(-1);
                    period = "This Month";
                }
            }

            // Duration for Previous Period comparison
            TimeSpan duration = end - start;
            if (duration.TotalDays < 1) duration = TimeSpan.FromDays(1);
            DateTime prevStart = start.Subtract(duration);
            DateTime prevEnd = start.AddTicks(-1);

            // Operational Metrics
            var totalJO = await _context.JobOrders.CountAsync(j => j.CreatedAt >= start && j.CreatedAt <= end);
            var openJO = await _context.JobOrders.CountAsync(j => j.Status == JobOrderStatus.Open && j.CreatedAt >= start && j.CreatedAt <= end);
            var completedJO = await _context.JobOrders.CountAsync(j => j.Status == JobOrderStatus.Completed && j.CreatedAt >= start && j.CreatedAt <= end);
            var closedJO = await _context.JobOrders.CountAsync(j => j.Status == JobOrderStatus.Closed && j.CreatedAt >= start && j.CreatedAt <= end);

            var totalParts = await _context.Parts.CountAsync();
            var lowStockCount = await _context.Parts.CountAsync(p => p.Status == PartStockStatus.LowStock || p.Status == PartStockStatus.OutOfStock);

            // Financial Metrics (Current Period)
            var totalRevenue = await _context.Invoices
                .Where(i => i.CreatedAt >= start && i.CreatedAt <= end)
                .SumAsync(i => (decimal?)i.GrandTotal) ?? 0m;

            var totalCollected = await _context.Payments
                .Where(p => p.Date >= start && p.Date <= end)
                .SumAsync(p => (decimal?)p.Amount) ?? 0m;

            var generalExpenses = await _context.Expenses
                .Where(e => !e.IsVoided && e.ExpenseDate >= start && e.ExpenseDate <= end)
                .SumAsync(e => (decimal?)e.Amount) ?? 0m;

            var payrollSalaryPaid = await _context.PayrollTransactions
                .Where(pt => pt.Type == "SALARY_PAYMENT" && pt.CreatedAt >= start && pt.CreatedAt <= end)
                .SumAsync(pt => (decimal?)Math.Abs(pt.Amount)) ?? 0m;

            var supplierPurchasesInPeriod = await _context.SupplierPurchases
                .Where(sp => sp.PurchaseDate >= start && sp.PurchaseDate <= end)
                .SumAsync(sp => (decimal?)sp.TotalAmount) ?? 0m;

            var supplierPaymentsInPeriod = await _context.SupplierPayments
                .Where(sp => sp.PaymentDate >= start && sp.PaymentDate <= end)
                .SumAsync(sp => (decimal?)sp.Amount) ?? 0m;

            var operatingExpenses = generalExpenses + payrollSalaryPaid;
            var totalExpenses = operatingExpenses + supplierPurchasesInPeriod;
            var netProfit = totalRevenue - totalExpenses;

            // Previous Period Financials
            var prevRevenue = await _context.Invoices
                .Where(i => i.CreatedAt >= prevStart && i.CreatedAt <= prevEnd)
                .SumAsync(i => (decimal?)i.GrandTotal) ?? 0m;

            var prevGenExp = await _context.Expenses
                .Where(e => !e.IsVoided && e.ExpenseDate >= prevStart && e.ExpenseDate <= prevEnd)
                .SumAsync(e => (decimal?)e.Amount) ?? 0m;

            var prevSalary = await _context.PayrollTransactions
                .Where(pt => pt.Type == "SALARY_PAYMENT" && pt.CreatedAt >= prevStart && pt.CreatedAt <= prevEnd)
                .SumAsync(pt => (decimal?)Math.Abs(pt.Amount)) ?? 0m;

            var prevPurchases = await _context.SupplierPurchases
                .Where(sp => sp.PurchaseDate >= prevStart && sp.PurchaseDate <= prevEnd)
                .SumAsync(sp => (decimal?)sp.TotalAmount) ?? 0m;

            var prevExpenses = prevGenExp + prevSalary + prevPurchases;
            var prevNetProfit = prevRevenue - prevExpenses;

            double revChangePct = prevRevenue > 0
                ? (double)((totalRevenue - prevRevenue) / prevRevenue * 100m)
                : (totalRevenue > 0 ? 100.0 : 0.0);

            double expChangePct = prevExpenses > 0
                ? (double)((totalExpenses - prevExpenses) / prevExpenses * 100m)
                : (totalExpenses > 0 ? 100.0 : 0.0);

            double profitChangePct = Math.Abs(prevNetProfit) > 0
                ? (double)((netProfit - prevNetProfit) / Math.Abs(prevNetProfit) * 100m)
                : (netProfit > 0 ? 100.0 : 0.0);

            // Cumulative Balances
            var totalInvoicesCount = await _context.Invoices.CountAsync();
            var unpaidInvoicesAmount = await _context.Invoices
                .Where(i => i.PaymentStatus != PaymentStatus.Paid)
                .SumAsync(i => (decimal?)(i.GrandTotal - i.PaidAmount)) ?? 0m;

            var allPurchases = await _context.SupplierPurchases.SumAsync(sp => (decimal?)sp.TotalAmount) ?? 0m;
            var allSupplierPaid = await _context.SupplierPayments.SumAsync(sp => (decimal?)sp.Amount) ?? 0m;
            var supplierOutstandingBalance = Math.Max(0m, allPurchases - allSupplierPaid);

            var totalEarnings = await _context.PayrollTransactions
                .Where(pt => pt.Type == "DAILY_EARNING" || pt.Type == "TECHNICIAN_TIP")
                .SumAsync(pt => (decimal?)pt.Amount) ?? 0m;
            var totalDeductions = await _context.PayrollTransactions
                .Where(pt => pt.Type == "DEDUCTION" || pt.Type == "ADVANCE_REPAYMENT")
                .SumAsync(pt => (decimal?)pt.Amount) ?? 0m;
            var allSalaryPaid = await _context.PayrollTransactions
                .Where(pt => pt.Type == "SALARY_PAYMENT")
                .SumAsync(pt => (decimal?)Math.Abs(pt.Amount)) ?? 0m;
            var technicianSalaryBalance = Math.Max(0m, totalEarnings - totalDeductions - allSalaryPaid);

            // Trend Points (5 intervals)
            var trendPoints = new List<DashboardTrendPointDto>();
            int buckets = 5;
            double stepDays = Math.Max(1.0, (end - start).TotalDays / buckets);
            for (int i = 0; i < buckets; i++)
            {
                var bucketStart = start.AddDays(i * stepDays);
                var bucketEnd = (i == buckets - 1) ? end : start.AddDays((i + 1) * stepDays).AddTicks(-1);

                var bucketRev = await _context.Invoices
                    .Where(inv => inv.CreatedAt >= bucketStart && inv.CreatedAt <= bucketEnd)
                    .SumAsync(inv => (decimal?)inv.GrandTotal) ?? 0m;

                var bucketExp = (await _context.Expenses.Where(e => !e.IsVoided && e.ExpenseDate >= bucketStart && e.ExpenseDate <= bucketEnd).SumAsync(e => (decimal?)e.Amount) ?? 0m) +
                                (await _context.SupplierPurchases.Where(sp => sp.PurchaseDate >= bucketStart && sp.PurchaseDate <= bucketEnd).SumAsync(sp => (decimal?)sp.TotalAmount) ?? 0m) +
                                (await _context.PayrollTransactions.Where(pt => pt.Type == "SALARY_PAYMENT" && pt.CreatedAt >= bucketStart && pt.CreatedAt <= bucketEnd).SumAsync(pt => (decimal?)Math.Abs(pt.Amount)) ?? 0m);

                trendPoints.Add(new DashboardTrendPointDto
                {
                    DateLabel = bucketStart.ToString("d MMM"),
                    Revenue = Math.Round(bucketRev, 2),
                    Profit = Math.Round(bucketRev - bucketExp, 2)
                });
            }

            // Expense Breakdown
            var breakdown = new List<ExpenseCategoryBreakdownDto>();
            decimal totalCatSum = supplierPurchasesInPeriod + payrollSalaryPaid + generalExpenses + supplierPaymentsInPeriod;
            if (totalCatSum <= 0m) totalCatSum = 1m;

            breakdown.Add(new ExpenseCategoryBreakdownDto
            {
                CategoryEn = "Parts Purchases",
                CategoryAr = "قطع الغيار",
                Amount = Math.Round(supplierPurchasesInPeriod, 2),
                Percentage = Math.Round((double)(supplierPurchasesInPeriod / totalCatSum * 100m), 1),
                Color = "#2563eb"
            });
            breakdown.Add(new ExpenseCategoryBreakdownDto
            {
                CategoryEn = "Salaries",
                CategoryAr = "الرواتب",
                Amount = Math.Round(payrollSalaryPaid, 2),
                Percentage = Math.Round((double)(payrollSalaryPaid / totalCatSum * 100m), 1),
                Color = "#7c3aed"
            });
            breakdown.Add(new ExpenseCategoryBreakdownDto
            {
                CategoryEn = "Operating Expenses",
                CategoryAr = "مصروفات تشغيلية",
                Amount = Math.Round(generalExpenses, 2),
                Percentage = Math.Round((double)(generalExpenses / totalCatSum * 100m), 1),
                Color = "#ef4444"
            });
            breakdown.Add(new ExpenseCategoryBreakdownDto
            {
                CategoryEn = "Suppliers Payments",
                CategoryAr = "الموردين",
                Amount = Math.Round(supplierPaymentsInPeriod, 2),
                Percentage = Math.Round((double)(supplierPaymentsInPeriod / totalCatSum * 100m), 1),
                Color = "#f59e0b"
            });

            // Low Stock Items
            var lowStockItems = await _context.Parts
                .Where(p => p.Status == PartStockStatus.LowStock || p.Status == PartStockStatus.OutOfStock)
                .OrderBy(p => p.CurrentQty)
                .Take(5)
                .Select(p => new DashboardLowStockItemDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    PartNumber = p.Number,
                    CurrentQty = p.CurrentQty,
                    MinQty = p.MinQty,
                    Status = p.Status.ToString()
                })
                .ToListAsync();

            // Recent Job Orders
            var recentJOs = await _context.JobOrders
                .Include(j => j.Customer)
                .Include(j => j.Vehicle)
                .OrderByDescending(j => j.CreatedAt)
                .Take(6)
                .Select(j => new DashboardRecentJobOrderDto
                {
                    Id = j.Id,
                    Number = j.Number,
                    CustomerName = j.Customer != null ? j.Customer.Name : "Customer",
                    VehicleName = j.Vehicle != null ? $"{j.Vehicle.Make} {j.Vehicle.Model}" : "Vehicle",
                    Plate = j.Vehicle != null ? j.Vehicle.Plate : "",
                    Status = j.Status.ToString(),
                    Date = j.CreatedAt.ToString("dd MMM yyyy")
                })
                .ToListAsync();

            // Recent Invoices
            var recentInvoices = await _context.Invoices
                .Include(i => i.JobOrder).ThenInclude(j => j.Customer)
                .OrderByDescending(i => i.CreatedAt)
                .Take(6)
                .Select(i => new DashboardRecentInvoiceDto
                {
                    Id = i.Id,
                    InvoiceNumber = i.InvoiceNumber,
                    CustomerName = i.JobOrder != null && i.JobOrder.Customer != null ? i.JobOrder.Customer.Name : "Customer",
                    Amount = Math.Round(i.GrandTotal, 2),
                    PaymentStatus = i.PaymentStatus.ToString(),
                    Date = i.CreatedAt.ToString("dd MMM yyyy")
                })
                .ToListAsync();

            return new OwnerDashboardDto
            {
                FilterPeriod = period,
                StartDate = start,
                EndDate = end,

                TotalJobOrders = totalJO > 0 ? totalJO : await _context.JobOrders.CountAsync(),
                OpenJobOrders = openJO,
                CompletedJobOrders = completedJO,
                ClosedJobOrders = closedJO,
                TotalParts = totalParts,
                LowStockParts = lowStockCount,

                TotalRevenue = Math.Round(totalRevenue, 2),
                RevenueChangePct = Math.Round(revChangePct, 1),

                TotalExpenses = Math.Round(totalExpenses, 2),
                ExpensesChangePct = Math.Round(expChangePct, 1),

                NetProfit = Math.Round(netProfit, 2),
                NetProfitChangePct = Math.Round(profitChangePct, 1),

                OutstandingPayables = Math.Round(supplierOutstandingBalance, 2),
                UnpaidInvoicesAmount = Math.Round(unpaidInvoicesAmount, 2),
                TechnicianSalaryBalance = Math.Round(technicianSalaryBalance, 2),
                CustomerReceivables = Math.Round(unpaidInvoicesAmount, 2),

                TotalCollected = Math.Round(totalCollected, 2),
                OperatingExpenses = Math.Round(operatingExpenses, 2),
                SupplierPurchasesTotal = Math.Round(supplierPurchasesInPeriod, 2),
                TotalOutflow = Math.Round(totalExpenses, 2),
                TotalInvoices = totalInvoicesCount,

                TrendPoints = trendPoints,
                ExpenseBreakdown = breakdown,
                LowStockItems = lowStockItems,
                RecentJobOrders = recentJOs,
                RecentInvoices = recentInvoices
            };
        }

        public async Task<List<UserDto>> GetUsersAsync(string? search = null, string? role = null, string? status = null)
        {
            var query = _userManager.Users.AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                var s = search.ToLower();
                query = query.Where(u => u.FullName.ToLower().Contains(s) || (u.Email != null && u.Email.ToLower().Contains(s)) || u.Phone.Contains(s));
            }

            if (!string.IsNullOrWhiteSpace(role) && role != "All")
            {
                if (Enum.TryParse<UserRole>(role, true, out var r))
                    query = query.Where(u => u.Role == r);
            }

            if (!string.IsNullOrWhiteSpace(status) && status != "All")
            {
                bool isActive = status == "Active";
                query = query.Where(u => u.IsActive == isActive);
            }

            return await query.Select(u => new UserDto
            {
                Id = u.Id,
                Name = u.FullName,
                Phone = u.Phone,
                Email = u.Email ?? "",
                Role = u.Role.ToString(),
                Status = u.IsActive ? "Active" : "Disabled",
                LastActivity = u.LastActivity.ToString("dd MMM yyyy, HH:mm"),
                Created = u.CreatedAt.ToString("dd MMM yyyy")
            }).ToListAsync();
        }

        public async Task<UserDto> CreateUserAsync(CreateUserDto dto)
        {
            if (!Enum.TryParse<UserRole>(dto.Role, true, out var role))
                role = UserRole.Engineer;

            var user = new ApplicationUser
            {
                UserName = dto.Email,
                Email = dto.Email,
                FullName = dto.Name,
                Phone = dto.Phone,
                Role = role,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };

            var result = await _userManager.CreateAsync(user, dto.Password);
            if (!result.Succeeded)
                throw new InvalidOperationException(string.Join(", ", result.Errors.Select(e => e.Description)));

            await _userManager.AddToRoleAsync(user, role.ToString());

            return new UserDto
            {
                Id = user.Id,
                Name = user.FullName,
                Phone = user.Phone,
                Email = user.Email!,
                Role = user.Role.ToString(),
                Status = "Active",
                LastActivity = "—",
                Created = DateTime.UtcNow.ToString("dd MMM yyyy")
            };
        }

        public async Task<UserDto> UpdateUserAsync(string userId, UpdateUserDto dto)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                throw new InvalidOperationException("User not found");

            user.FullName = dto.Name;
            user.Phone = dto.Phone;
            user.Email = dto.Email;
            user.UserName = dto.Email;

            if (Enum.TryParse<UserRole>(dto.Role, true, out var role))
            {
                if (user.Role != role)
                {
                    var currentRoles = await _userManager.GetRolesAsync(user);
                    if (currentRoles.Any())
                    {
                        await _userManager.RemoveFromRolesAsync(user, currentRoles);
                    }
                    user.Role = role;
                    await _userManager.AddToRoleAsync(user, role.ToString());
                }
            }

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
                throw new InvalidOperationException(string.Join(", ", result.Errors.Select(e => e.Description)));

            return new UserDto
            {
                Id = user.Id,
                Name = user.FullName,
                Phone = user.Phone,
                Email = user.Email!,
                Role = user.Role.ToString(),
                Status = user.IsActive ? "Active" : "Disabled",
                LastActivity = user.LastActivity.ToString("dd MMM yyyy, HH:mm"),
                Created = user.CreatedAt.ToString("dd MMM yyyy")
            };
        }

        public async Task<bool> ToggleUserStatusAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return false;

            user.IsActive = !user.IsActive;
            await _userManager.UpdateAsync(user);
            return true;
        }

        public async Task<bool> ChangePasswordAsync(string userId, string newPassword)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return false;

            var resetToken = await _userManager.GeneratePasswordResetTokenAsync(user);
            var result = await _userManager.ResetPasswordAsync(user, resetToken, newPassword);
            return result.Succeeded;
        }

        public async Task<BusinessSettingsDto> GetSettingsAsync()
        {
            var settings = await _context.BusinessSettings.FirstOrDefaultAsync();
            if (settings == null)
            {
                settings = new BusinessSettings
                {
                    CompanyName = "SOS Motor Works",
                    Address = "شارع شنزو آبي، الحي العاشر، مدينة نصر، القاهرة، بجوار سنتر شبانة",
                    Phone = "+20 100 933 4747",
                    Email = null,
                    Currency = "EGP",
                    LogoUrl = "/uploads/branding/sos_logo.jpeg",
                    UpdatedAt = DateTime.UtcNow,
                    UpdatedBy = "System"
                };
                _context.BusinessSettings.Add(settings);
                await _context.SaveChangesAsync();
            }

            return new BusinessSettingsDto
            {
                CompanyName = string.IsNullOrWhiteSpace(settings.CompanyName) ? "SOS Motor Works" : settings.CompanyName,
                Address = string.IsNullOrWhiteSpace(settings.Address) ? "شارع شنزو آبي، الحي العاشر، مدينة نصر، القاهرة، بجوار سنتر شبانة" : settings.Address,
                Phone = string.IsNullOrWhiteSpace(settings.Phone) ? "+20 100 933 4747" : settings.Phone,
                Email = settings.Email,
                Currency = string.IsNullOrWhiteSpace(settings.Currency) ? "EGP" : settings.Currency,
                LogoUrl = string.IsNullOrWhiteSpace(settings.LogoUrl) ? "/uploads/branding/sos_logo.jpeg" : settings.LogoUrl
            };
        }

        public async Task<BusinessSettingsDto> UpdateSettingsAsync(BusinessSettingsDto dto)
        {
            var settings = await _context.BusinessSettings.FirstOrDefaultAsync();
            if (settings == null)
            {
                settings = new BusinessSettings();
                _context.BusinessSettings.Add(settings);
            }

            settings.CompanyName = dto.CompanyName;
            settings.Address = dto.Address;
            settings.Phone = dto.Phone;
            settings.Email = dto.Email;
            settings.Currency = dto.Currency;
            settings.LogoUrl = dto.LogoUrl;

            await _context.SaveChangesAsync();
            return dto;
        }

        public async Task<OwnerReportsDto> GetReportsAsync()
        {
            var totalRevenue = await _context.Invoices.SumAsync(i => (decimal?)i.GrandTotal) ?? 0m;
            var generalExpenses = await _context.Expenses.Where(e => !e.IsVoided).SumAsync(e => (decimal?)e.Amount) ?? 0m;
            var supplierPurchases = await _context.SupplierPurchases.SumAsync(sp => (decimal?)sp.TotalAmount) ?? 0m;
            var salaryPaid = await _context.PayrollTransactions.Where(pt => pt.Type == "SALARY_PAYMENT").SumAsync(pt => (decimal?)Math.Abs(pt.Amount)) ?? 0m;
            
            var totalExpenses = generalExpenses + supplierPurchases + salaryPaid;
            var netProfit = totalRevenue - totalExpenses;

            var totalJO = await _context.JobOrders.CountAsync();
            var totalInv = await _context.Invoices.CountAsync();
            var totalCust = await _context.Customers.CountAsync();
            var totalVeh = await _context.Vehicles.CountAsync();
            var totalParts = await _context.Parts.CountAsync();

            return new OwnerReportsDto
            {
                TotalRevenue = Math.Round(totalRevenue, 2),
                TotalExpenses = Math.Round(totalExpenses, 2),
                NetProfit = Math.Round(netProfit, 2),
                TotalJobOrders = totalJO,
                TotalInvoices = totalInv,
                TotalCustomers = totalCust,
                TotalVehicles = totalVeh,
                TotalParts = totalParts
            };
        }
    }
}
