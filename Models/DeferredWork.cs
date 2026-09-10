using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StarAutoCenter.Models
{
    public class DeferredWork
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(300)]
        public string Item { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Note { get; set; }

        public DateTime Date { get; set; }

        [MaxLength(20)]
        public string? JobOrderNumber { get; set; }

        [MaxLength(20)]
        public string? Km { get; set; }

        [MaxLength(200)]
        public string? Engineer { get; set; }

        // Foreign keys
        public int VehicleId { get; set; }

        [ForeignKey("VehicleId")]
        public Vehicle Vehicle { get; set; } = null!;
    }
}
