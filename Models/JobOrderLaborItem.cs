using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StarAutoCenter.Models
{
    public class JobOrderLaborItem
    {
        public int Id { get; set; }

        public int JobOrderId { get; set; }

        [ForeignKey("JobOrderId")]
        public JobOrder JobOrder { get; set; } = null!;

        [Required]
        [MaxLength(250)]
        public string Description { get; set; } = string.Empty;

        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        public int SortOrder { get; set; } = 0;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
