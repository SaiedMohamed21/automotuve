using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StarAutoCenter.Models
{
    public class SupplierPurchaseItem
    {
        public int Id { get; set; }

        public int PurchaseId { get; set; }

        [ForeignKey("PurchaseId")]
        public SupplierPurchase Purchase { get; set; } = null!;

        public int PartId { get; set; }

        [ForeignKey("PartId")]
        public Part Part { get; set; } = null!;

        public int Quantity { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal UnitPrice { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalPrice { get; set; }
    }
}
