using System.ComponentModel.DataAnnotations;
using StarAutoCenter.Models.Enums;

namespace StarAutoCenter.Models
{
    public class Part
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(300)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Number { get; set; } = string.Empty; // Part Number

        [MaxLength(50)]
        public string? OEM { get; set; }

        [MaxLength(100)]
        public string? Brand { get; set; }

        [MaxLength(100)]
        public string? Category { get; set; }

        public string? CompatibleVehicles { get; set; } // JSON array stored as string

        public int CurrentQty { get; set; } = 0;
        public int MinQty { get; set; } = 0;

        [MaxLength(20)]
        public string? Location { get; set; } // Warehouse location (e.g., A-03, B-01)

        public PartStockStatus Status { get; set; } = PartStockStatus.InStock;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public ICollection<IssuedPart> IssuedParts { get; set; } = new List<IssuedPart>();
        public ICollection<StockMovement> StockMovements { get; set; } = new List<StockMovement>();
    }
}
