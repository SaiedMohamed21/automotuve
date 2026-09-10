using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StarAutoCenter.Models
{
    public class Vehicle
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Make { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Model { get; set; } = string.Empty;

        [MaxLength(10)]
        public string Year { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        public string Plate { get; set; } = string.Empty;

        [MaxLength(50)]
        public string? VIN { get; set; }

        [MaxLength(50)]
        public string? Color { get; set; }

        [MaxLength(20)]
        public string? Km { get; set; }

        public int Visits { get; set; } = 0;
        public DateTime? LastVisit { get; set; }

        public bool IsDeleted { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Foreign keys
        public int CustomerId { get; set; }

        [ForeignKey("CustomerId")]
        public Customer Customer { get; set; } = null!;

        // Navigation properties
        public ICollection<ServiceHistory> ServiceHistories { get; set; } = new List<ServiceHistory>();
        public ICollection<DeferredWork> DeferredWorks { get; set; } = new List<DeferredWork>();
        public ICollection<JobOrder> JobOrders { get; set; } = new List<JobOrder>();
    }
}
