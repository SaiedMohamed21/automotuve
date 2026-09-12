using System.ComponentModel.DataAnnotations;

namespace StarAutoCenter.Models
{
    public class BusinessSettings
    {
        public int Id { get; set; }

        [MaxLength(200)]
        public string CompanyName { get; set; } = "SOS Motor Works";

        [MaxLength(500)]
        public string? Address { get; set; } = "شارع شنزو آبي، الحي العاشر، مدينة نصر، القاهرة، بجوار سنتر شبانة";

        [MaxLength(30)]
        public string? Phone { get; set; } = "+20 100 933 4747";

        [MaxLength(200)]
        public string? Email { get; set; }

        [MaxLength(10)]
        public string Currency { get; set; } = "EGP";

        [MaxLength(500)]
        public string? LogoUrl { get; set; } = "/uploads/branding/sos_logo.jpeg";

        public DateTime? UpdatedAt { get; set; }

        [MaxLength(100)]
        public string? UpdatedBy { get; set; }
    }
}
