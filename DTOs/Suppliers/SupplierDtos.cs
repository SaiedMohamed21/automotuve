using System.ComponentModel.DataAnnotations;

namespace StarAutoCenter.DTOs.Suppliers
{
    public class SupplierDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string? Company { get; set; }
        public string? Address { get; set; }
        public string? Notes { get; set; }
        public bool IsActive { get; set; } = true;
        public string CreatedAt { get; set; } = string.Empty;
        public decimal TotalPurchases { get; set; } = 0;
        public decimal TotalPaid { get; set; } = 0;
        public decimal OutstandingBalance { get; set; } = 0;
        public string? LastPaymentDate { get; set; }
    }

    public class CreateSupplierDto
    {
        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Phone { get; set; } = string.Empty;

        [MaxLength(200)]
        public string? Company { get; set; }

        [MaxLength(500)]
        public string? Address { get; set; }

        [MaxLength(1000)]
        public string? Notes { get; set; }

        public bool IsActive { get; set; } = true;
    }

    public class UpdateSupplierDto
    {
        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Phone { get; set; } = string.Empty;

        [MaxLength(200)]
        public string? Company { get; set; }

        [MaxLength(500)]
        public string? Address { get; set; }

        [MaxLength(1000)]
        public string? Notes { get; set; }

        public bool IsActive { get; set; } = true;
    }

    public class SupplierPurchaseItemDto
    {
        public int Id { get; set; }
        public int PartId { get; set; }
        public string PartName { get; set; } = string.Empty;
        public string PartNumber { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
    }

    public class CreatePurchaseItemDto
    {
        [Required]
        public int PartId { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be greater than 0")]
        public int Quantity { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Unit price must be non-negative")]
        public decimal UnitPrice { get; set; }
    }

    public class SupplierPurchaseDto
    {
        public int Id { get; set; }
        public string PurchaseNumber { get; set; } = string.Empty;
        public int SupplierId { get; set; }
        public string SupplierName { get; set; } = string.Empty;
        public string PurchaseDate { get; set; } = string.Empty;
        public string? DueDate { get; set; }
        public string? Notes { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal PaidAmount { get; set; }
        public decimal RemainingAmount => Math.Max(0, TotalAmount - PaidAmount);
        public string PaymentStatus { get; set; } = "Unpaid";
        public string CreatedAt { get; set; } = string.Empty;
        public List<SupplierPurchaseItemDto> Items { get; set; } = new();
    }

    public class CreateSupplierPurchaseDto
    {
        public DateTime? PurchaseDate { get; set; }
        public DateTime? DueDate { get; set; }
        public string? Notes { get; set; }

        [Required]
        [MinLength(1, ErrorMessage = "At least one item is required")]
        public List<CreatePurchaseItemDto> Items { get; set; } = new();

        public decimal PaidNow { get; set; } = 0;
        public string? PaymentMethod { get; set; } = "Cash";
        public string? PaymentReference { get; set; }
    }

    public class SupplierPaymentDto
    {
        public int Id { get; set; }
        public string PaymentNumber { get; set; } = string.Empty;
        public int SupplierId { get; set; }
        public string SupplierName { get; set; } = string.Empty;
        public int? PurchaseId { get; set; }
        public string? PurchaseNumber { get; set; }
        public decimal Amount { get; set; }
        public string PaymentDate { get; set; } = string.Empty;
        public string PaymentMethod { get; set; } = "Cash";
        public string? Reference { get; set; }
        public string? Notes { get; set; }
        public string? CreatedBy { get; set; }
        public string CreatedAt { get; set; } = string.Empty;
    }

    public class CreateSupplierPaymentDto
    {
        [Range(0.01, double.MaxValue, ErrorMessage = "Payment amount must be greater than 0")]
        public decimal Amount { get; set; }

        public DateTime? PaymentDate { get; set; }

        [Required]
        public string PaymentMethod { get; set; } = "Cash";

        public int? PurchaseId { get; set; }

        [MaxLength(200)]
        public string? Reference { get; set; }

        [MaxLength(1000)]
        public string? Notes { get; set; }
    }

    public class SupplierStatementEntryDto
    {
        public int Id { get; set; }
        public string Date { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty; // PURCHASE or PAYMENT
        public string ReferenceNumber { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Debit { get; set; } // Purchase amount
        public decimal Credit { get; set; } // Payment amount
        public decimal Balance { get; set; } // Running balance owed
    }

    public class SupplierStatementDto
    {
        public int SupplierId { get; set; }
        public string SupplierName { get; set; } = string.Empty;
        public decimal TotalPurchases { get; set; }
        public decimal TotalPaid { get; set; }
        public decimal OutstandingBalance { get; set; }
        public List<SupplierStatementEntryDto> Transactions { get; set; } = new();
    }

    public class SupplierDashboardSummaryDto
    {
        public int TotalSuppliers { get; set; }
        public decimal TotalPurchases { get; set; }
        public decimal TotalPaid { get; set; }
        public decimal TotalOutstandingDebt { get; set; }
    }
}
