using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StarAutoCenter.Models
{
    public class Expense
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string ExpenseNumber { get; set; } = string.Empty;

        public DateTime ExpenseDate { get; set; } = DateTime.UtcNow;

        [Required]
        [MaxLength(100)]
        public string Category { get; set; } = string.Empty;

        [Required]
        [MaxLength(500)]
        public string Description { get; set; } = string.Empty;

        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        [MaxLength(50)]
        public string PaymentMethod { get; set; } = "Cash";

        [MaxLength(200)]
        public string? Reference { get; set; }

        [MaxLength(1000)]
        public string? Notes { get; set; }

        [MaxLength(100)]
        public string? CreatedBy { get; set; } = "Accountant";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        public bool IsVoided { get; set; } = false;

        [MaxLength(500)]
        public string? VoidReason { get; set; }

        public DateTime? VoidedAt { get; set; }
    }
}
