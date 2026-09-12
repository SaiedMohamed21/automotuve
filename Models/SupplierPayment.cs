using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StarAutoCenter.Models
{
    public class SupplierPayment
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string PaymentNumber { get; set; } = string.Empty;

        public int SupplierId { get; set; }

        [ForeignKey("SupplierId")]
        public Supplier Supplier { get; set; } = null!;

        public int? PurchaseId { get; set; }

        [ForeignKey("PurchaseId")]
        public SupplierPurchase? Purchase { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        public DateTime PaymentDate { get; set; } = DateTime.UtcNow;

        [MaxLength(50)]
        public string PaymentMethod { get; set; } = "Cash"; // Cash, Bank Transfer, InstaPay, Wallet, Other

        [MaxLength(200)]
        public string? Reference { get; set; }

        [MaxLength(1000)]
        public string? Notes { get; set; }

        [MaxLength(100)]
        public string? CreatedBy { get; set; } = "Accountant";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
