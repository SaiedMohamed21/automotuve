namespace StarAutoCenter.DTOs.Payroll
{
    public class TechnicianDto
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Status { get; set; } = "Active";
        public decimal DailyRate { get; set; }
        public string JoinedDate { get; set; } = string.Empty;
        public string? Notes { get; set; }
    }

    public class CreateTechnicianDto
    {
        public string? Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Status { get; set; } = "Active";
        public decimal DailyRate { get; set; }
        public string? JoinedDate { get; set; }
        public string? Notes { get; set; }
    }

    public class UpdateTechnicianDto
    {
        public string Name { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Status { get; set; } = "Active";
        public decimal DailyRate { get; set; }
        public string? JoinedDate { get; set; }
        public string? Notes { get; set; }
    }

    public class AttendanceRecordDto
    {
        public string Id { get; set; } = string.Empty;
        public string TechnicianId { get; set; } = string.Empty;
        public string TechnicianName { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty; // YYYY-MM-DD
        public string Status { get; set; } = "Present"; // Present, Absent
        public decimal DailyRate { get; set; }
        public string? Notes { get; set; }
        public string Timestamp { get; set; } = string.Empty;
    }

    public class MarkAttendanceDto
    {
        public string? Id { get; set; }
        public string TechnicianId { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty; // YYYY-MM-DD
        public string Status { get; set; } = "Present"; // Present, Absent
        public decimal? DailyRate { get; set; }
        public string? Notes { get; set; }
    }

    public class PayrollTransactionDto
    {
        public string Id { get; set; } = string.Empty;
        public string TechnicianId { get; set; } = string.Empty;
        public string TechnicianName { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string? Notes { get; set; }
        public string Status { get; set; } = "Paid";
        public string? Reason { get; set; }
        public string? PaymentMethod { get; set; }
        public string CreatedAt { get; set; } = string.Empty;
    }

    public class CreatePayrollTransactionDto
    {
        public string? Id { get; set; }
        public string TechnicianId { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string? Notes { get; set; }
        public string Status { get; set; } = "Paid";
        public string? Reason { get; set; }
        public string? PaymentMethod { get; set; }
    }
}
