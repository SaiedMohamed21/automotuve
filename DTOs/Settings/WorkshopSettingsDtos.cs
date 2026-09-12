using System.ComponentModel.DataAnnotations;

namespace StarAutoCenter.DTOs.Settings
{
    public class WorkshopSettingsDto
    {
        public int Id { get; set; }
        public string CompanyName { get; set; } = string.Empty;
        public string? Address { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string Currency { get; set; } = "EGP";
        public string? LogoUrl { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? UpdatedBy { get; set; }
    }

    public class UpdateWorkshopSettingsDto
    {
        [Required]
        [MaxLength(200)]
        public string CompanyName { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Address { get; set; }

        [MaxLength(30)]
        public string? Phone { get; set; }

        [MaxLength(200)]
        public string? Email { get; set; }

        [MaxLength(10)]
        public string Currency { get; set; } = "EGP";

        [MaxLength(500)]
        public string? LogoUrl { get; set; }
    }

    public class UploadLogoDto
    {
        [Required]
        public Microsoft.AspNetCore.Http.IFormFile File { get; set; } = null!;
    }
}
