using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using StarAutoCenter.DTOs.Payroll;
using StarAutoCenter.Hubs;
using StarAutoCenter.Services.Payroll;

namespace StarAutoCenter.Controllers.Payroll
{
    [Authorize(Roles = "Accountant,Owner")]
    [ApiController]
    [Route("api/payroll")]
    public class PayrollController : ControllerBase
    {
        private readonly IPayrollService _payrollService;
        private readonly IHubContext<DataSyncHub> _hubContext;

        public PayrollController(IPayrollService payrollService, IHubContext<DataSyncHub> hubContext)
        {
            _payrollService = payrollService;
            _hubContext = hubContext;
        }

        // ── Technicians ──

        [HttpGet("technicians")]
        public async Task<IActionResult> GetTechnicians()
        {
            var result = await _payrollService.GetTechniciansAsync();
            return Ok(result);
        }

        [HttpGet("technicians/{id}")]
        public async Task<IActionResult> GetTechnicianById(string id)
        {
            var result = await _payrollService.GetTechnicianByIdAsync(id);
            if (result == null) return NotFound(new { message = "Technician not found" });
            return Ok(result);
        }

        [HttpPost("technicians")]
        public async Task<IActionResult> CreateTechnician([FromBody] CreateTechnicianDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Name))
                return BadRequest(new { message = "Technician name is required" });

            var result = await _payrollService.CreateTechnicianAsync(dto);
            await _hubContext.Clients.All.SendAsync("DataChanged", "Payroll");
            return CreatedAtAction(nameof(GetTechnicianById), new { id = result.Id }, result);
        }

        [HttpPut("technicians/{id}")]
        public async Task<IActionResult> UpdateTechnician(string id, [FromBody] UpdateTechnicianDto dto)
        {
            var result = await _payrollService.UpdateTechnicianAsync(id, dto);
            if (result == null) return NotFound(new { message = "Technician not found" });
            await _hubContext.Clients.All.SendAsync("DataChanged", "Payroll");
            return Ok(result);
        }

        [HttpDelete("technicians/{id}")]
        public async Task<IActionResult> DeleteTechnician(string id)
        {
            var success = await _payrollService.DeleteTechnicianAsync(id);
            if (!success) return NotFound(new { message = "Technician not found" });
            await _hubContext.Clients.All.SendAsync("DataChanged", "Payroll");
            return NoContent();
        }

        // ── Attendance ──

        [HttpGet("attendance")]
        public async Task<IActionResult> GetAttendance(
            [FromQuery] string? technicianId = null,
            [FromQuery] string? startDate = null,
            [FromQuery] string? endDate = null)
        {
            var result = await _payrollService.GetAttendanceRecordsAsync(technicianId, startDate, endDate);
            return Ok(result);
        }

        [HttpPost("attendance")]
        public async Task<IActionResult> MarkAttendance([FromBody] MarkAttendanceDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.TechnicianId) || string.IsNullOrWhiteSpace(dto.Date))
                return BadRequest(new { message = "TechnicianId and Date are required" });

            try
            {
                var result = await _payrollService.MarkAttendanceAsync(dto);
                await _hubContext.Clients.All.SendAsync("DataChanged", "Payroll");
                return Ok(result);
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        // ── Transactions ──

        [HttpGet("transactions")]
        public async Task<IActionResult> GetTransactions([FromQuery] string? technicianId = null)
        {
            var result = await _payrollService.GetPayrollTransactionsAsync(technicianId);
            return Ok(result);
        }

        [HttpPost("transactions")]
        public async Task<IActionResult> RecordTransaction([FromBody] CreatePayrollTransactionDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.TechnicianId) || string.IsNullOrWhiteSpace(dto.Date))
                return BadRequest(new { message = "TechnicianId and Date are required" });

            try
            {
                var result = await _payrollService.RecordPayrollTransactionAsync(dto);
                await _hubContext.Clients.All.SendAsync("DataChanged", "Payroll");
                return Ok(result);
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        [HttpDelete("transactions/{id}")]
        public async Task<IActionResult> DeleteTransaction(string id)
        {
            var success = await _payrollService.DeletePayrollTransactionAsync(id);
            if (!success) return NotFound(new { message = "Transaction not found" });
            await _hubContext.Clients.All.SendAsync("DataChanged", "Payroll");
            return NoContent();
        }
    }
}
