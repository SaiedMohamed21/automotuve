using System.ComponentModel.DataAnnotations;

namespace StarAutoCenter.Models
{
    public class AttendanceRecord
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
        [MaxLength(20)]
        public string Status { get; set; } = "Present"; // Present, Absent

        [System.ComponentModel.DataAnnotations.Schema.Column(TypeName = "decimal(18,2)")]
        public decimal DailyRate { get; set; }

        [MaxLength(500)]
        public string? Notes { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation property
        public Technician Technician { get; set; } = null!;
    }
}
