using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StarAutoCenter.Models
{
    public class JobOrderWorkItem
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(300)]
        public string Item { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Note { get; set; }

        public bool IsDeferred { get; set; } = false;
        public bool IsRecommended { get; set; } = false;

        // Foreign keys
        public int JobOrderId { get; set; }

        [ForeignKey("JobOrderId")]
        public JobOrder JobOrder { get; set; } = null!;
    }
}
