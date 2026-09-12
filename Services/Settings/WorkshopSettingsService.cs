using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using StarAutoCenter.Data;
using StarAutoCenter.DTOs.Settings;
using StarAutoCenter.Models;

namespace StarAutoCenter.Services.Settings
{
    public interface IWorkshopSettingsService
    {
        Task<WorkshopSettingsDto> GetSettingsAsync();
        Task<WorkshopSettingsDto> UpdateSettingsAsync(UpdateWorkshopSettingsDto dto, string? updatedBy);
        Task<string> UploadLogoAsync(IFormFile file, string? updatedBy);
        Task<bool> DeleteLogoAsync(string? updatedBy);
    }

    public class WorkshopSettingsService : IWorkshopSettingsService
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _env;
        private static readonly string[] AllowedExtensions = { ".png", ".jpg", ".jpeg", ".webp", ".svg" };

        public WorkshopSettingsService(ApplicationDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        private async Task<BusinessSettings> GetOrCreateSettingsEntityAsync()
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
            return settings;
        }

        public async Task<WorkshopSettingsDto> GetSettingsAsync()
        {
            var settings = await GetOrCreateSettingsEntityAsync();
            return MapToDto(settings);
        }

        public async Task<WorkshopSettingsDto> UpdateSettingsAsync(UpdateWorkshopSettingsDto dto, string? updatedBy)
        {
            var settings = await GetOrCreateSettingsEntityAsync();

            settings.CompanyName = dto.CompanyName.Trim();
            settings.Phone = dto.Phone?.Trim();
            settings.Address = dto.Address?.Trim();
            settings.Email = dto.Email?.Trim();
            settings.Currency = string.IsNullOrWhiteSpace(dto.Currency) ? "EGP" : dto.Currency.Trim();
            if (dto.LogoUrl != null)
            {
                settings.LogoUrl = string.IsNullOrWhiteSpace(dto.LogoUrl) ? null : dto.LogoUrl.Trim();
            }
            settings.UpdatedAt = DateTime.UtcNow;
            settings.UpdatedBy = updatedBy;

            await _context.SaveChangesAsync();
            return MapToDto(settings);
        }

        public async Task<string> UploadLogoAsync(IFormFile file, string? updatedBy)
        {
            if (file == null || file.Length == 0)
                throw new ArgumentException("No file was provided.");

            if (file.Length > 5 * 1024 * 1024)
                throw new ArgumentException("Logo file size must not exceed 5MB.");

            var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (!AllowedExtensions.Contains(ext))
                throw new ArgumentException($"Invalid image type '{ext}'. Allowed types: {string.Join(", ", AllowedExtensions)}");

            var webRoot = _env.WebRootPath;
            if (string.IsNullOrEmpty(webRoot))
            {
                webRoot = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            }

            var brandingDir = Path.Combine(webRoot, "uploads", "branding");
            if (!Directory.Exists(brandingDir))
            {
                Directory.CreateDirectory(brandingDir);
            }

            var settings = await GetOrCreateSettingsEntityAsync();
            var oldLogoUrl = settings.LogoUrl;

            // Generate unique filename
            var fileName = $"logo_{Guid.NewGuid():N}{ext}";
            var fullPath = Path.Combine(brandingDir, fileName);

            await using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var relativeUrl = $"/uploads/branding/{fileName}";
            settings.LogoUrl = relativeUrl;
            settings.UpdatedAt = DateTime.UtcNow;
            settings.UpdatedBy = updatedBy;

            await _context.SaveChangesAsync();

            // Safely remove old uploaded logo (do not delete base default sos_logo.jpeg)
            if (!string.IsNullOrEmpty(oldLogoUrl) && oldLogoUrl.StartsWith("/uploads/branding/") && !oldLogoUrl.EndsWith("sos_logo.jpeg"))
            {
                try
                {
                    var oldFilePath = Path.Combine(webRoot, oldLogoUrl.TrimStart('/'));
                    if (File.Exists(oldFilePath))
                    {
                        File.Delete(oldFilePath);
                    }
                }
                catch
                {
                    // Ignore deletion errors for old file
                }
            }

            return relativeUrl;
        }

        public async Task<bool> DeleteLogoAsync(string? updatedBy)
        {
            var settings = await GetOrCreateSettingsEntityAsync();
            var oldLogoUrl = settings.LogoUrl;

            settings.LogoUrl = null;
            settings.UpdatedAt = DateTime.UtcNow;
            settings.UpdatedBy = updatedBy;
            await _context.SaveChangesAsync();

            if (!string.IsNullOrEmpty(oldLogoUrl) && oldLogoUrl.StartsWith("/uploads/branding/") && !oldLogoUrl.EndsWith("sos_logo.jpeg"))
            {
                try
                {
                    var webRoot = _env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
                    var oldFilePath = Path.Combine(webRoot, oldLogoUrl.TrimStart('/'));
                    if (File.Exists(oldFilePath))
                    {
                        File.Delete(oldFilePath);
                    }
                }
                catch
                {
                    // Ignore deletion error
                }
            }

            return true;
        }

        private static WorkshopSettingsDto MapToDto(BusinessSettings settings)
        {
            return new WorkshopSettingsDto
            {
                Id = settings.Id,
                CompanyName = settings.CompanyName,
                Address = settings.Address,
                Phone = settings.Phone,
                Email = settings.Email,
                Currency = settings.Currency,
                LogoUrl = settings.LogoUrl,
                UpdatedAt = settings.UpdatedAt,
                UpdatedBy = settings.UpdatedBy
            };
        }
    }
}
