namespace StarAutoCenter.DTOs.Warehouse
{
    public class WarehouseDashboardDto
    {
        public int LowStockCount { get; set; }
        public int OutOfStockCount { get; set; }
        public int PartsIssuedToday { get; set; }
        public int StockInRecent { get; set; }
        public List<WarehouseJobDto> OpenJobs { get; set; } = new();
        public List<PartSummaryDto> OutOfStockParts { get; set; } = new();
        public List<PartSummaryDto> LowStockParts { get; set; } = new();
        public List<StockMovementDto> RecentMovements { get; set; } = new();
    }

    public class WarehouseJobDto
    {
        public string Number { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;
        public string Vehicle { get; set; } = string.Empty;
        public string Year { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
        public string Plate { get; set; } = string.Empty;
        public int PartsIssued { get; set; }
        public string ServiceType { get; set; } = string.Empty;
        public string Customer { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
    }

    public class PartDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Number { get; set; } = string.Empty;
        public string? OEM { get; set; }
        public string? Brand { get; set; }
        public string? Category { get; set; }
        public List<string> CompatibleVehicles { get; set; } = new();
        public int CurrentQty { get; set; }
        public int MinQty { get; set; }
        public string? Location { get; set; }
        public string Status { get; set; } = string.Empty;
    }

    public class PartSummaryDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Number { get; set; } = string.Empty;
        public string? Brand { get; set; }
        public int CurrentQty { get; set; }
        public int MinQty { get; set; }
    }

    public class CreatePartDto
    {
        public string Name { get; set; } = string.Empty;
        public string Number { get; set; } = string.Empty;
        public string? OEM { get; set; }
        public string? Brand { get; set; }
        public string? Category { get; set; }
        public List<string>? CompatibleVehicles { get; set; }
        public int CurrentQty { get; set; }
        public int MinQty { get; set; }
        public string? Location { get; set; }
    }

    public class PartDetailsDto
    {
        public PartDto Part { get; set; } = new();
        public List<StockMovementDto> Movements { get; set; } = new();
    }

    public class IssuedPartDto
    {
        public int PartId { get; set; }
        public string PartName { get; set; } = string.Empty;
        public string PartNumber { get; set; } = string.Empty;
        public int Qty { get; set; }
    }

    public class IssuePartRequestDto
    {
        public List<IssuePartItemDto> Parts { get; set; } = new();
    }

    public class IssuePartItemDto
    {
        public int PartId { get; set; }
        public int Qty { get; set; }
    }

    public class StockMovementDto
    {
        public string Part { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public string? Reference { get; set; }
        public string? Note { get; set; }
        public string Date { get; set; } = string.Empty;
        public int Qty { get; set; }
    }

    public class StockCountEntryDto
    {
        public int PartId { get; set; }
        public int ActualQty { get; set; }
    }
}
