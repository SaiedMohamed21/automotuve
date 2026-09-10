using System.ComponentModel.DataAnnotations;

namespace StarAutoCenter.Models
{
    public class BusinessSettings
    {
        public int Id { get; set; }

        [MaxLength(200)]
        public string CompanyName { get; set; } = "Star Auto Center";

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
}
