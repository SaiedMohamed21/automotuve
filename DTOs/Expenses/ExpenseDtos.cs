using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace StarAutoCenter.DTOs.Expenses
{
    public class ExpenseDto
    {
        public int Id { get; set; }
        public string ExpenseNumber { get; set; } = string.Empty;
        public string ExpenseDate { get; set; } = string.Empty;
        public string ExpenseDateIso { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string PaymentMethod { get; set; } = "Cash";
        public string? Reference { get; set; }
        public string? Notes { get; set; }
        public string? CreatedBy { get; set; }
        public string CreatedAt { get; set; } = string.Empty;
        public string? UpdatedAt { get; set; }
        public bool IsVoided { get; set; }
        public string? VoidReason { get; set; }
        public string? VoidedAt { get; set; }
    }

    public class CreateExpenseDto
    {
        public DateTime? ExpenseDate { get; set; }

        [Required(ErrorMessage = "Expense category is required")]
        [MaxLength(100)]
        public string Category { get; set; } = string.Empty;

        [Required(ErrorMessage = "Expense description is required")]
        [MaxLength(500)]
        public string Description { get; set; } = string.Empty;

        [Range(0.01, double.MaxValue, ErrorMessage = "Expense amount must be greater than 0")]
        public decimal Amount { get; set; }

        [MaxLength(50)]
        public string PaymentMethod { get; set; } = "Cash";

        [MaxLength(200)]
        public string? Reference { get; set; }

        [MaxLength(1000)]
        public string? Notes { get; set; }

        [MaxLength(100)]
        public string? CreatedBy { get; set; }
    }

    public class UpdateExpenseDto
    {
        public DateTime? ExpenseDate { get; set; }

        [Required(ErrorMessage = "Expense category is required")]
        [MaxLength(100)]
        public string Category { get; set; } = string.Empty;

        [Required(ErrorMessage = "Expense description is required")]
        [MaxLength(500)]
        public string Description { get; set; } = string.Empty;

        [Range(0.01, double.MaxValue, ErrorMessage = "Expense amount must be greater than 0")]
        public decimal Amount { get; set; }

        [MaxLength(50)]
        public string PaymentMethod { get; set; } = "Cash";

        [MaxLength(200)]
        public string? Reference { get; set; }

        [MaxLength(1000)]
        public string? Notes { get; set; }
    }

    public class VoidExpenseDto
    {
        [MaxLength(500)]
        public string? Reason { get; set; }
    }

    public class ExpenseFilterDto
    {
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
        public string? Category { get; set; }
        public string? PaymentMethod { get; set; }
        public string? Search { get; set; }
        public bool IncludeVoided { get; set; } = false;
    }

    public class CategoryExpenseSummaryDto
    {
        public string Category { get; set; } = string.Empty;
        public decimal TotalAmount { get; set; }
        public int Count { get; set; }
        public double Percentage { get; set; }
    }

    public class ExpenseSummaryDto
    {
        public decimal TotalToday { get; set; }
        public decimal TotalThisMonth { get; set; }
        public decimal TotalThisYear { get; set; }
        public decimal TotalAllTime { get; set; }
        public decimal FilteredTotal { get; set; }
        public int ActiveCount { get; set; }
        public int VoidedCount { get; set; }
        public List<CategoryExpenseSummaryDto> CategoryBreakdown { get; set; } = new();
    }
}
