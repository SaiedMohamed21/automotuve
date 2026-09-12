using System.ComponentModel.DataAnnotations;

namespace StarAutoCenter.Models
{
    public class Technician
    {
        [Key]
        [MaxLength(50)]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(20)]
        public string Phone { get; set; } = string.Empty;

        [MaxLength(20)]
        public string Status { get; set; } = "Active"; // Active, Inactive

        [System.ComponentModel.DataAnnotations.Schema.Column(TypeName = "decimal(18,2)")]
        public decimal DailyRate { get; set; }

        [MaxLength(50)]
        public string JoinedDate { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Notes { get; set; }

        public bool IsDeleted { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public ICollection<AttendanceRecord> AttendanceRecords { get; set; } = new List<AttendanceRecord>();
        public ICollection<PayrollTransaction> PayrollTransactions { get; set; } = new List<PayrollTransaction>();
    }
}
