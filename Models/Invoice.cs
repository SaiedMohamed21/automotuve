using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using StarAutoCenter.Models.Enums;

namespace StarAutoCenter.Models
{
    public class Invoice
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string InvoiceNumber { get; set; } = string.Empty; // INV-YYYY-NNNNN

        public DateTime Date { get; set; } = DateTime.UtcNow;

        [Column(TypeName = "decimal(18,2)")]
        public decimal PartsTotal { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal LaborAmount { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal ExpensesTotal { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal GrandTotal { get; set; }

        public PaymentStatus PaymentStatus { get; set; } = PaymentStatus.Unpaid;

        [Column(TypeName = "decimal(18,2)")]
        public decimal PaidAmount { get; set; } = 0;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Foreign keys
        public int JobOrderId { get; set; }

        [ForeignKey("JobOrderId")]
        public JobOrder JobOrder { get; set; } = null!;

        // Navigation properties
        public ICollection<Payment> Payments { get; set; } = new List<Payment>();
    }
}
