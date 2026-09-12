using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using StarAutoCenter.Models.Enums;

namespace StarAutoCenter.Models
{
    public class SupplierPurchase
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string PurchaseNumber { get; set; } = string.Empty;

        public int SupplierId { get; set; }

        [ForeignKey("SupplierId")]
        public Supplier Supplier { get; set; } = null!;

        public DateTime PurchaseDate { get; set; } = DateTime.UtcNow;

        public DateTime? DueDate { get; set; }

        [MaxLength(1000)]
        public string? Notes { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalAmount { get; set; } = 0;

        [Column(TypeName = "decimal(18,2)")]
        public decimal PaidAmount { get; set; } = 0;

        public PaymentStatus PaymentStatus { get; set; } = PaymentStatus.Unpaid;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public ICollection<SupplierPurchaseItem> Items { get; set; } = new List<SupplierPurchaseItem>();
        public ICollection<SupplierPayment> Payments { get; set; } = new List<SupplierPayment>();
    }
}
