using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using StarAutoCenter.Models.Enums;

namespace StarAutoCenter.Models
{
    public class ServiceHistory
    {
        public int Id { get; set; }

        [MaxLength(20)]
        public string JobOrderNumber { get; set; } = string.Empty;

        public DateTime Date { get; set; }

        [MaxLength(20)]
        public string? Km { get; set; }

        [MaxLength(200)]
        public string? Inspection { get; set; }

        public JobOrderStatus Status { get; set; }

        // Foreign keys
        public int VehicleId { get; set; }

        [ForeignKey("VehicleId")]
        public Vehicle Vehicle { get; set; } = null!;
    }
}
