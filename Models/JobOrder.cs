using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using StarAutoCenter.Models.Enums;

namespace StarAutoCenter.Models
{
    public class JobOrder
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string Number { get; set; } = string.Empty; // JO-YYYY-NNNNN

        public DateTime Date { get; set; } = DateTime.UtcNow;

        public JobOrderStatus Status { get; set; } = JobOrderStatus.Open;

        [MaxLength(100)]
        public string? Type { get; set; } // Full Service, Oil Change, Inspection, etc.

        public string? RequiredWork { get; set; }
        public string? CompletedWork { get; set; }
        public string? Notes { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal LaborAmount { get; set; } = 0;

        [MaxLength(20)]
        public string? Km { get; set; }

        [MaxLength(200)]
        public string? Engineer { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Foreign keys
        public int CustomerId { get; set; }

        [ForeignKey("CustomerId")]
        public Customer Customer { get; set; } = null!;

        public int VehicleId { get; set; }

        [ForeignKey("VehicleId")]
        public Vehicle Vehicle { get; set; } = null!;

        // Navigation properties
        public ICollection<IssuedPart> IssuedParts { get; set; } = new List<IssuedPart>();
        public ICollection<JobOrderWorkItem> WorkItems { get; set; } = new List<JobOrderWorkItem>();
        public ICollection<AdditionalExpense> AdditionalExpenses { get; set; } = new List<AdditionalExpense>();
        public Invoice? Invoice { get; set; }
    }
}
