using System.ComponentModel.DataAnnotations;

namespace StarAutoCenter.Models
{
    public class Supplier
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Phone { get; set; } = string.Empty;

        [MaxLength(200)]
        public string? Company { get; set; }

        [MaxLength(500)]
        public string? Address { get; set; }

        [MaxLength(1000)]
        public string? Notes { get; set; }

        public bool IsActive { get; set; } = true;

        public bool IsDeleted { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public ICollection<SupplierPurchase> Purchases { get; set; } = new List<SupplierPurchase>();
        public ICollection<SupplierPayment> Payments { get; set; } = new List<SupplierPayment>();
        public ICollection<SupplierAccountTransaction> Transactions { get; set; } = new List<SupplierAccountTransaction>();
    }
}
