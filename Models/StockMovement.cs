using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using StarAutoCenter.Models.Enums;

namespace StarAutoCenter.Models
{
    public class StockMovement
    {
        public int Id { get; set; }

        public StockMovementType Type { get; set; }

        [MaxLength(50)]
        public string? Reference { get; set; } // JO number or PO number

        [MaxLength(500)]
        public string? Note { get; set; }

        public DateTime Date { get; set; } = DateTime.UtcNow;

        public int Qty { get; set; } // Negative for Issue, Positive for Stock In

        // Foreign keys
        public int PartId { get; set; }

        [ForeignKey("PartId")]
        public Part Part { get; set; } = null!;
    }
}
