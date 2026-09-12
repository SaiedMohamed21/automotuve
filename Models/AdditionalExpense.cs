using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StarAutoCenter.Models
{
    public class AdditionalExpense
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(300)]
        public string Description { get; set; } = string.Empty;

        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        // Foreign keys
        public int JobOrderId { get; set; }

        [ForeignKey("JobOrderId")]
        public JobOrder JobOrder { get; set; } = null!;
    }
}
