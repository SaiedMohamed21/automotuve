namespace StarAutoCenter.DTOs.Engineer
{
    // ── Dashboard ──
    public class DashboardDto
    {
        public int TodayJobs { get; set; }
        public int OpenJobs { get; set; }
        public int CompletedToday { get; set; }
        public List<JobOrderListDto> RecentJobOrders { get; set; } = new();
        public List<RecentVehicleDto> RecentVehicles { get; set; } = new();
    }

    public class RecentVehicleDto
    {
        public string Name { get; set; } = string.Empty;
        public string Plate { get; set; } = string.Empty;
        public string Owner { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;
    }

    // ── Customer ──
    public class CustomerDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string? Email { get; set; }
        public string? Address { get; set; }
        public int VehicleCount { get; set; }
    }

    public class CreateCustomerDto
    {
        public string Name { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string? Email { get; set; }
        public string? Address { get; set; }
    }

    public class CustomerDetailsDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string? Email { get; set; }
        public string? Address { get; set; }
        public List<VehicleDto> Vehicles { get; set; } = new();
        public List<JobOrderListDto> JobOrders { get; set; } = new();
    }

    // ── Vehicle ──
    public class VehicleDto
    {
        public int Id { get; set; }
        public string Make { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public string Year { get; set; } = string.Empty;
        public string Plate { get; set; } = string.Empty;
        public string? VIN { get; set; }
        public string? Color { get; set; }
        public string? Km { get; set; }
        public int Visits { get; set; }
        public string? LastVisit { get; set; }
        public int CustomerId { get; set; }
        public string? CustomerName { get; set; }
        public string? CustomerPhone { get; set; }
    }

    public class CreateVehicleDto
    {
        public string Make { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public string Year { get; set; } = string.Empty;
        public string Plate { get; set; } = string.Empty;
        public string? VIN { get; set; }
        public string? Color { get; set; }
        public string? Km { get; set; }
        public int CustomerId { get; set; }
    }

    public class VehicleDetailsDto
    {
        public VehicleDto Vehicle { get; set; } = new();
        public List<ServiceHistoryDto> ServiceHistory { get; set; } = new();
        public List<DeferredWorkDto> DeferredWork { get; set; } = new();
        public StatsDto Stats { get; set; } = new();
    }

    public class StatsDto
    {
        public int TotalVisits { get; set; }
        public string? LastService { get; set; }
        public int CompletedItems { get; set; }
        public int DeferredItems { get; set; }
    }

    public class ChangeOwnerDto
    {
        public string Name { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
    }

    // ── Job Order ──
    public class JobOrderListDto
    {
        public int Id { get; set; }
        public string Number { get; set; } = string.Empty;
        public string? Date { get; set; }
        public string Customer { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Vehicle { get; set; } = string.Empty;
        public string Plate { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string? Type { get; set; }
    }

    public class CreateJobOrderDto
    {
        public int CustomerId { get; set; }
        public int VehicleId { get; set; }
        public string? Type { get; set; }
        public string? RequiredWork { get; set; }
        public string? CompletedWork { get; set; }
        public string? Notes { get; set; }
        public string? Km { get; set; }
        public string? Engineer { get; set; }
    }

    public class JobOrderDetailsDto
    {
        public int Id { get; set; }
        public string Number { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string? Type { get; set; }
        public int CustomerId { get; set; }
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerPhone { get; set; } = string.Empty;
        public int VehicleId { get; set; }
        public string VehicleName { get; set; } = string.Empty;
        public string VehicleMake { get; set; } = string.Empty;
        public string VehicleModel { get; set; } = string.Empty;
        public string VehicleYear { get; set; } = string.Empty;
        public string VehiclePlate { get; set; } = string.Empty;
        public string? VehicleKm { get; set; }
        public string? VehicleVin { get; set; }
        public string? VehicleColor { get; set; }
        public string? Engineer { get; set; }
        public string? CustomerRequest { get; set; }
        public string? RequiredWork { get; set; }
        public string? Notes { get; set; }
        public List<string> Technicians { get; set; } = new();
        public List<WorkItemDto> ApprovedItems { get; set; } = new();
        public List<string> DeferredItems { get; set; } = new();
        public List<WorkItemDto> RecommendedItems { get; set; } = new();
    }

    public class WorkItemDto
    {
        public string Item { get; set; } = string.Empty;
        public string? Note { get; set; }
    }

    // ── Service History & Deferred Work ──
    public class ServiceHistoryDto
    {
        public string JobOrderNumber { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;
        public string? Km { get; set; }
        public string? Inspection { get; set; }
        public string Status { get; set; } = string.Empty;
    }

    public class DeferredWorkDto
    {
        public string Item { get; set; } = string.Empty;
        public string? Note { get; set; }
        public string Date { get; set; } = string.Empty;
        public string? JobOrderNumber { get; set; }
        public string? Km { get; set; }
        public string? Engineer { get; set; }
    }
}
