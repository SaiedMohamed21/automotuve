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
        Task<bool> ToggleUserStatusAsync(string userId);

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

            return new OwnerDashboardDto
            {
                TotalJobOrders = totalJO,
                OpenJobOrders = openJO,
                CompletedJobOrders = completedJO,
                TotalParts = totalParts,
                LowStockParts = lowStockParts
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

        public async Task<bool> ToggleUserStatusAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return false;

            user.IsActive = !user.IsActive;
            await _userManager.UpdateAsync(user);
            return true;
        }

        public async Task<BusinessSettingsDto> GetSettingsAsync()
        {
            var settings = await _context.BusinessSettings.FirstOrDefaultAsync();
            if (settings == null)
            {
                settings = new BusinessSettings();
                _context.BusinessSettings.Add(settings);
                await _context.SaveChangesAsync();
            }

            return new BusinessSettingsDto
            {
                CompanyName = settings.CompanyName,
                Address = settings.Address,
                Phone = settings.Phone,
                Email = settings.Email,
                Currency = settings.Currency,
                LogoUrl = settings.LogoUrl
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
