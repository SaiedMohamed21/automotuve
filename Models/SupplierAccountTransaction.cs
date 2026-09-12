using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StarAutoCenter.Models
{
    public class SupplierAccountTransaction
    {
        public int Id { get; set; }

        public int SupplierId { get; set; }

        [ForeignKey("SupplierId")]
        public Supplier Supplier { get; set; } = null!;

        public DateTime TransactionDate { get; set; } = DateTime.UtcNow;

        [Required]
        [MaxLength(20)]
        public string TransactionType { get; set; } = "PURCHASE"; // PURCHASE, PAYMENT

        [MaxLength(50)]
        public string ReferenceNumber { get; set; } = string.Empty;

        [MaxLength(500)]
        public string Description { get; set; } = string.Empty;

        [Column(TypeName = "decimal(18,2)")]
        public decimal Debit { get; set; } = 0; // Purchase amount: increases debt

        [Column(TypeName = "decimal(18,2)")]
        public decimal Credit { get; set; } = 0; // Payment amount: decreases debt

        [Column(TypeName = "decimal(18,2)")]
        public decimal RunningBalance { get; set; } = 0; // Cumulative balance owed to supplier

        public int? PurchaseId { get; set; }
        public int? PaymentId { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
