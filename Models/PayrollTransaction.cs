using System.ComponentModel.DataAnnotations;

namespace StarAutoCenter.Models
{
    public class PayrollTransaction
    {
        [Key]
        [MaxLength(50)]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        [MaxLength(50)]
        public string TechnicianId { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        public string Date { get; set; } = string.Empty; // YYYY-MM-DD

        [Required]
        [MaxLength(50)]
        public string Type { get; set; } = string.Empty; // DAILY_EARNING, ADVANCE, ADVANCE_REPAYMENT, DEDUCTION, SALARY_PAYMENT, TECHNICIAN_TIP

        [System.ComponentModel.DataAnnotations.Schema.Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        [MaxLength(500)]
        public string? Notes { get; set; }

        [MaxLength(20)]
        public string Status { get; set; } = "Paid"; // Paid, Pending

        [MaxLength(200)]
        public string? Reason { get; set; }

        [MaxLength(50)]
        public string? PaymentMethod { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation property
        public Technician Technician { get; set; } = null!;
    }
}
