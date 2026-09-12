using StarAutoCenter.DTOs.Payroll;

namespace StarAutoCenter.Services.Payroll
{
    public interface IPayrollService
    {
        // Technicians
        Task<List<TechnicianDto>> GetTechniciansAsync();
        Task<TechnicianDto?> GetTechnicianByIdAsync(string id);
        Task<TechnicianDto> CreateTechnicianAsync(CreateTechnicianDto dto);
        Task<TechnicianDto?> UpdateTechnicianAsync(string id, UpdateTechnicianDto dto);
        Task<bool> DeleteTechnicianAsync(string id);

        // Attendance
        Task<List<AttendanceRecordDto>> GetAttendanceRecordsAsync(string? technicianId = null, string? startDate = null, string? endDate = null);
        Task<AttendanceRecordDto> MarkAttendanceAsync(MarkAttendanceDto dto);

        // Payroll Transactions
        Task<List<PayrollTransactionDto>> GetPayrollTransactionsAsync(string? technicianId = null);
        Task<PayrollTransactionDto> RecordPayrollTransactionAsync(CreatePayrollTransactionDto dto);
        Task<bool> DeletePayrollTransactionAsync(string id);
    }
}
