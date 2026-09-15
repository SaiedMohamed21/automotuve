namespace StarAutoCenter.DTOs.Accountant
{
    // ── Labor DTOs ──
    public class LaborItemDto
    {
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public int SortOrder { get; set; }
    }

    public class LaborInputItem
    {
        public string Description { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public int SortOrder { get; set; }
    }

    public class SaveJobOrderLaborDto
    {
        public List<LaborInputItem> LaborItems { get; set; } = new();
    }

    // ── Dashboard ──
    public class AccountantDashboardDto
    {
        public int CompleteJobs { get; set; }
        public int OpenInvoices { get; set; }
        public int ClosedToday { get; set; }
        public decimal TotalRevenue { get; set; }
        public decimal PendingPayments { get; set; }
        public List<AccountantJobListDto> RecentJobs { get; set; } = new();
        public List<InvoiceListDto> RecentInvoices { get; set; } = new();
    }

    // ── Job Order List ──
    public class AccountantJobListDto
    {
        public int Id { get; set; }
        public string Number { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;
        public string Customer { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Vehicle { get; set; } = string.Empty;
        public string Plate { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string? Type { get; set; }
        public bool HasInvoice { get; set; }
    }

    // ── Job Order Details (Accountant view) ──
    public class AccountantJobDetailsDto
    {
        public int Id { get; set; }
        public string Number { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string? Type { get; set; }
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerPhone { get; set; } = string.Empty;
        public string VehicleName { get; set; } = string.Empty;
        public string VehiclePlate { get; set; } = string.Empty;
        public string? VehicleKm { get; set; }
        public string? VehicleVin { get; set; }
        public string? Engineer { get; set; }
        public string? CustomerRequest { get; set; }
        public decimal LaborAmount { get; set; }
        public List<LaborItemDto> LaborItems { get; set; } = new();
        public List<WorkFoundItemDto> WorkFoundItems { get; set; } = new();
        public List<ApprovedWorkDto> ApprovedItems { get; set; } = new();
        public List<string> DeferredItems { get; set; } = new();
        public List<IssuedPartDto> IssuedParts { get; set; } = new();
        public List<AdditionalExpenseDto> AdditionalExpenses { get; set; } = new();
        public decimal PartsTotal { get; set; }
        public decimal ExpensesTotal { get; set; }
        public decimal GrandTotal { get; set; }
        public bool HasInvoice { get; set; }
        public string? InvoiceNumber { get; set; }
    }

    public class WorkFoundItemDto
    {
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public string? Note { get; set; }
        public bool Approved { get; set; }
    }

    public class ApprovedWorkDto
    {
        public string Item { get; set; } = string.Empty;
        public string? Note { get; set; }
    }

    public class IssuedPartDto
    {
        public int PartId { get; set; }
        public string PartName { get; set; } = string.Empty;
        public string PartNumber { get; set; } = string.Empty;
        public int Qty { get; set; }
        public decimal SellingPrice { get; set; }
        public decimal Total { get; set; }
    }

    public class AdditionalExpenseDto
    {
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public decimal Amount { get; set; }
    }

    // ── Save Work Found ──
    public class SaveWorkFoundDto
    {
        public List<WorkFoundInputItem> Items { get; set; } = new();
    }

    public class WorkFoundInputItem
    {
        public string Description { get; set; } = string.Empty;
        public string? Note { get; set; }
        public bool Approved { get; set; }
    }

    // ── Create Invoice ──
    public class CreateInvoiceDto
    {
        public decimal LaborAmount { get; set; }
        public List<LaborInputItem> LaborItems { get; set; } = new();
        public List<ExpenseInputItem> AdditionalExpenses { get; set; } = new();
    }

    public class ExpenseInputItem
    {
        public string Description { get; set; } = string.Empty;
        public decimal Amount { get; set; }
    }

    // ── Invoice List ──
    public class InvoiceListDto
    {
        public string InvoiceNumber { get; set; } = string.Empty;
        public int JobOrderId { get; set; }
        public string JobOrderNumber { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;
        public string Customer { get; set; } = string.Empty;
        public string Vehicle { get; set; } = string.Empty;
        public decimal PartsTotal { get; set; }
        public decimal LaborAmount { get; set; }
        public decimal ExpensesTotal { get; set; }
        public decimal GrandTotal { get; set; }
        public string PaymentStatus { get; set; } = string.Empty;
    }

    // ── Invoice Details ──
    public class InvoiceDetailsDto
    {
        public string InvoiceNumber { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;
        public int JobOrderId { get; set; }
        public string JobOrderNumber { get; set; } = string.Empty;
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerPhone { get; set; } = string.Empty;
        public string VehicleName { get; set; } = string.Empty;
        public string VehiclePlate { get; set; } = string.Empty;
        public string? VehicleKm { get; set; }
        public string? VehicleVin { get; set; }
        public string? Engineer { get; set; }
        public List<IssuedPartDto> IssuedParts { get; set; } = new();
        public decimal PartsTotal { get; set; }
        public decimal LaborAmount { get; set; }
        public List<LaborItemDto> LaborItems { get; set; } = new();
        public List<AdditionalExpenseDto> AdditionalExpenses { get; set; } = new();
        public decimal ExpensesTotal { get; set; }
        public decimal GrandTotal { get; set; }
        public string PaymentStatus { get; set; } = string.Empty;
        public decimal PaidAmount { get; set; }
        public decimal RemainingAmount { get; set; }
        public List<PaymentDto> Payments { get; set; } = new();
    }

    // ── Payment ──
    public class PaymentDto
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public string Date { get; set; } = string.Empty;
        public string Method { get; set; } = string.Empty;
        public string? Note { get; set; }
        public string InvoiceNumber { get; set; } = string.Empty;
        public string CustomerName { get; set; } = string.Empty;
    }

    public class CreatePaymentDto
    {
        public string InvoiceNumber { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Method { get; set; } = "Cash";
        public string? Note { get; set; }
    }

    public class RecordPaymentResult
    {
        public bool Success { get; set; }
        public string? ErrorMessage { get; set; }
        public int StatusCode { get; set; } = 400;
        public PaymentDto? Payment { get; set; }
    }

    // ── Update Part Prices ──
    public class UpdatePartPricesDto
    {
        public decimal PurchasePrice { get; set; }
        public decimal SellingPrice { get; set; }
    }
}
