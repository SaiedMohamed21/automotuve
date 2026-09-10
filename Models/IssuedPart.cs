using System.ComponentModel.DataAnnotations.Schema;

namespace StarAutoCenter.Models
{
    public class IssuedPart
    {
        public int Id { get; set; }

        public int Qty { get; set; }

        // Foreign keys
        public int JobOrderId { get; set; }

        [ForeignKey("JobOrderId")]
        public JobOrder JobOrder { get; set; } = null!;

        public int PartId { get; set; }

        [ForeignKey("PartId")]
        public Part Part { get; set; } = null!;
    }
}
