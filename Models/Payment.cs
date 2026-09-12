using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using StarAutoCenter.Models.Enums;

namespace StarAutoCenter.Models
{
    public class Payment
    {
        public int Id { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        public DateTime Date { get; set; } = DateTime.UtcNow;

        public PaymentMethod Method { get; set; } = PaymentMethod.Cash;

        [MaxLength(500)]
        public string? Note { get; set; }

        // Foreign keys
        public int InvoiceId { get; set; }

        [ForeignKey("InvoiceId")]
        public Invoice Invoice { get; set; } = null!;
    }
}
