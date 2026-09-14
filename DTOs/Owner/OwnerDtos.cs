namespace StarAutoCenter.DTOs.Owner
{
    public class OwnerDashboardDto
    {
        public string FilterPeriod { get; set; } = "This Month";
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public int TotalJobOrders { get; set; }
        public int OpenJobOrders { get; set; }
        public int CompletedJobOrders { get; set; }
        public int ClosedJobOrders { get; set; }
        public int TotalParts { get; set; }
        public int LowStockParts { get; set; }

        // Financial KPIs
        public decimal TotalRevenue { get; set; }
        public double RevenueChangePct { get; set; }

        public decimal TotalExpenses { get; set; }
        public double ExpensesChangePct { get; set; }

        public decimal NetProfit { get; set; }
        public double NetProfitChangePct { get; set; }

        public decimal OutstandingPayables { get; set; }
        public decimal UnpaidInvoicesAmount { get; set; }
        public decimal TechnicianSalaryBalance { get; set; }
        public decimal CustomerReceivables { get; set; }

        public decimal TotalCollected { get; set; }
        public decimal OperatingExpenses { get; set; }
        public decimal SupplierPurchasesTotal { get; set; }
        public decimal TotalOutflow { get; set; }
        public int TotalInvoices { get; set; }

        // Trend Chart Points
        public List<DashboardTrendPointDto> TrendPoints { get; set; } = new();

        // Expense Breakdown
        public List<ExpenseCategoryBreakdownDto> ExpenseBreakdown { get; set; } = new();

        // Low Stock Items
        public List<DashboardLowStockItemDto> LowStockItems { get; set; } = new();

        // Recent Job Orders
        public List<DashboardRecentJobOrderDto> RecentJobOrders { get; set; } = new();

        // Recent Invoices
        public List<DashboardRecentInvoiceDto> RecentInvoices { get; set; } = new();
    }

    public class OwnerReportsDto
    {
        public decimal TotalRevenue { get; set; }
        public decimal TotalExpenses { get; set; }
        public decimal NetProfit { get; set; }
        public int TotalJobOrders { get; set; }
        public int TotalInvoices { get; set; }
        public int TotalCustomers { get; set; }
        public int TotalVehicles { get; set; }
        public int TotalParts { get; set; }
        public List<DashboardTrendPointDto> MonthlyTrends { get; set; } = new();
    }

    public class DashboardTrendPointDto
    {
        public string DateLabel { get; set; } = string.Empty;
        public decimal Revenue { get; set; }
        public decimal Profit { get; set; }
    }

    public class ExpenseCategoryBreakdownDto
    {
        public string CategoryEn { get; set; } = string.Empty;
        public string CategoryAr { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public double Percentage { get; set; }
        public string Color { get; set; } = string.Empty;
    }

    public class DashboardLowStockItemDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string PartNumber { get; set; } = string.Empty;
        public int CurrentQty { get; set; }
        public int MinQty { get; set; }
        public string Status { get; set; } = string.Empty;
    }

    public class DashboardRecentJobOrderDto
    {
        public int Id { get; set; }
        public string Number { get; set; } = string.Empty;
        public string CustomerName { get; set; } = string.Empty;
        public string VehicleName { get; set; } = string.Empty;
        public string Plate { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;
    }

    public class DashboardRecentInvoiceDto
    {
        public int Id { get; set; }
        public string InvoiceNumber { get; set; } = string.Empty;
        public string CustomerName { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string PaymentStatus { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;
    }

    public class UserDto
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string LastActivity { get; set; } = string.Empty;
        public string Created { get; set; } = string.Empty;
    }

    public class CreateUserDto
    {
        public string Name { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = "Engineer";
        public string Password { get; set; } = string.Empty;
    }

    public class UpdateUserDto
    {
        public string Name { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
    }

    public class ChangePasswordDto
    {
        public string Password { get; set; } = string.Empty;
    }

    public class BusinessSettingsDto
    {
        public string CompanyName { get; set; } = string.Empty;
        public string? Address { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string Currency { get; set; } = "EGP";
        public string? LogoUrl { get; set; }
    }
}
