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
        Task<OwnerDashboardDto> GetDashboardAsync();

        // Users
        Task<List<UserDto>> GetUsersAsync(string? search = null, string? role = null, string? status = null);
        Task<UserDto> CreateUserAsync(CreateUserDto dto);
        Task<UserDto> UpdateUserAsync(string userId, UpdateUserDto dto);
        Task<bool> ToggleUserStatusAsync(string userId);
        Task<bool> ChangePasswordAsync(string userId, string newPassword);

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

        public async Task<OwnerDashboardDto> GetDashboardAsync()
        {
            var totalJO = await _context.JobOrders.CountAsync();
            var openJO = await _context.JobOrders.CountAsync(j => j.Status == JobOrderStatus.Open);
            var completedJO = await _context.JobOrders.CountAsync(j => j.Status == JobOrderStatus.Completed);
            var totalParts = await _context.Parts.CountAsync();
            var lowStockParts = await _context.Parts.CountAsync(p => p.Status == PartStockStatus.LowStock || p.Status == PartStockStatus.OutOfStock);

            // Financial KPIs from database
            var totalCollected = await _context.Payments.SumAsync(p => (decimal?)p.Amount) ?? 0m;
            var generalExpenses = await _context.Expenses.Where(e => !e.IsVoided).SumAsync(e => (decimal?)e.Amount) ?? 0m;
            var payrollSalaryPaid = await _context.PayrollTransactions
                .Where(pt => pt.Type == "SALARY_PAYMENT")
                .SumAsync(pt => (decimal?)Math.Abs(pt.Amount)) ?? 0m;
            var operatingExpenses = generalExpenses + payrollSalaryPaid;

            var supplierPurchasesTotal = await _context.SupplierPurchases.SumAsync(sp => (decimal?)sp.TotalAmount) ?? 0m;
            var totalOutflow = operatingExpenses + supplierPurchasesTotal;

            var totalInvoices = await _context.Invoices.CountAsync();
            var unpaidInvoicesAmount = await _context.Invoices
                .Where(i => i.PaymentStatus != PaymentStatus.Paid)
                .SumAsync(i => (decimal?)(i.GrandTotal - i.PaidAmount)) ?? 0m;

            var supplierPaid = await _context.SupplierPayments.SumAsync(sp => (decimal?)sp.Amount) ?? 0m;
            var supplierOutstandingBalance = Math.Max(0m, supplierPurchasesTotal - supplierPaid);

            var totalEarnings = await _context.PayrollTransactions
                .Where(pt => pt.Type == "DAILY_EARNING" || pt.Type == "TECHNICIAN_TIP")
                .SumAsync(pt => (decimal?)pt.Amount) ?? 0m;
            var totalDeductions = await _context.PayrollTransactions
                .Where(pt => pt.Type == "DEDUCTION" || pt.Type == "ADVANCE_REPAYMENT")
                .SumAsync(pt => (decimal?)pt.Amount) ?? 0m;
            var technicianSalaryBalance = Math.Max(0m, totalEarnings - totalDeductions - payrollSalaryPaid);

            return new OwnerDashboardDto
            {
                TotalJobOrders = totalJO,
                OpenJobOrders = openJO,
                CompletedJobOrders = completedJO,
                TotalParts = totalParts,
                LowStockParts = lowStockParts,

                TotalCollected = Math.Round(totalCollected, 2),
                OperatingExpenses = Math.Round(operatingExpenses, 2),
                SupplierPurchasesTotal = Math.Round(supplierPurchasesTotal, 2),
                TotalOutflow = Math.Round(totalOutflow, 2),
                TotalInvoices = totalInvoices,
                UnpaidInvoicesAmount = Math.Round(unpaidInvoicesAmount, 2),
                SupplierOutstandingBalance = Math.Round(supplierOutstandingBalance, 2),
                TechnicianSalaryBalance = Math.Round(technicianSalaryBalance, 2),
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
    }
}
