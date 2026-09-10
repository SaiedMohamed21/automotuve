namespace StarAutoCenter.DTOs.Owner
{
    public class OwnerDashboardDto
    {
        public int TotalJobOrders { get; set; }
        public int OpenJobOrders { get; set; }
        public int CompletedJobOrders { get; set; }
        public int TotalParts { get; set; }
        public int LowStockParts { get; set; }
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
