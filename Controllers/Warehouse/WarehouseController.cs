using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using StarAutoCenter.DTOs.Warehouse;
using StarAutoCenter.Hubs;
using StarAutoCenter.Services.Warehouse;

namespace StarAutoCenter.Controllers.Warehouse
{
    [Authorize(Roles = "Warehouse,Owner,Engineer,Accountant")]
    [ApiController]
    [Route("api/warehouse")]
    public class WarehouseController : ControllerBase
    {
        private readonly IWarehouseService _warehouseService;
        private readonly IHubContext<DataSyncHub> _hubContext;

        public WarehouseController(IWarehouseService warehouseService, IHubContext<DataSyncHub> hubContext)
        {
            _warehouseService = warehouseService;
            _hubContext = hubContext;
        }

        // ── Dashboard ──
        [HttpGet("dashboard")]
        public async Task<IActionResult> GetDashboard()
        {
            var result = await _warehouseService.GetDashboardAsync();
            return Ok(result);
        }

        // ── Parts ──
        [HttpGet("parts")]
        public async Task<IActionResult> GetParts(
            [FromQuery] string? search = null,
            [FromQuery] string? category = null,
            [FromQuery] string? status = null)
        {
            var result = await _warehouseService.GetAllPartsAsync(search, category, status);
            return Ok(result);
        }

        [HttpGet("parts/{id}")]
        public async Task<IActionResult> GetPartDetails(int id)
        {
            var result = await _warehouseService.GetPartDetailsAsync(id);
            if (result == null) return NotFound(new { message = "Part not found" });
            return Ok(result);
        }

        [HttpPost("parts")]
        public async Task<IActionResult> CreatePart([FromBody] CreatePartDto dto)
        {
            if (!ModelState.IsValid)
            {
                var firstError = ModelState.Values.SelectMany(v => v.Errors).FirstOrDefault()?.ErrorMessage;
                return BadRequest(new { message = firstError ?? "Invalid data provided." });
            }

            if (dto.CurrentQty < 0)
            {
                return BadRequest(new { message = "Initial Quantity cannot be negative." });
            }

            try
            {
                // Enforce server-side role security: Warehouse users cannot set SellingPrice or PurchasePrice
                if (User.IsInRole("Warehouse") && !User.IsInRole("Owner") && !User.IsInRole("Accountant"))
                {
                    dto.SellingPrice = 0;
                    dto.PurchasePrice = 0;
                }

                var result = await _warehouseService.CreatePartAsync(dto);
                await _hubContext.Clients.All.SendAsync("DataChanged", "Parts");
                return CreatedAtAction(nameof(GetPartDetails), new { id = result.Id }, result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { message = ex.Message });
            }
        }

        // ── Jobs ──
        [HttpGet("jobs")]
        public async Task<IActionResult> GetOpenJobs([FromQuery] string? search = null, [FromQuery] string? status = null)
        {
            var result = await _warehouseService.GetOpenJobsAsync(search, status);
            return Ok(result);
        }

        [HttpGet("jobs/{joNumber}/parts")]
        public async Task<IActionResult> GetIssuedParts(string joNumber)
        {
            var result = await _warehouseService.GetIssuedPartsAsync(joNumber);
            return Ok(result);
        }

        [HttpPost("jobs/{joNumber}/parts")]
        public async Task<IActionResult> IssueParts(string joNumber, [FromBody] IssuePartRequestDto dto)
        {
            try
            {
                var result = await _warehouseService.IssuePartsAsync(joNumber, dto);
                await _hubContext.Clients.All.SendAsync("DataChanged", "Parts");
                return Ok(result);
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        [HttpDelete("jobs/{joNumber}/parts/{partId}")]
        public async Task<IActionResult> RemoveIssuedPart(string joNumber, int partId)
        {
            var success = await _warehouseService.RemoveIssuedPartAsync(joNumber, partId);
            if (!success) return NotFound(new { message = "Part not found for this job order" });
            await _hubContext.Clients.All.SendAsync("DataChanged", "Parts");
            return Ok(new { message = "Part removed" });
        }

        [HttpPost("jobs/{joNumber}/confirm")]
        public async Task<IActionResult> ConfirmIssue(string joNumber)
        {
            var success = await _warehouseService.ConfirmIssueAsync(joNumber);
            if (!success) return NotFound(new { message = "Job order not found" });
            await _hubContext.Clients.All.SendAsync("DataChanged", "Parts");
            await _hubContext.Clients.All.SendAsync("DataChanged", "JobOrders");
            return Ok(new { message = "Parts confirmed and stock updated" });
        }

        // ── Movements ──
        [HttpGet("movements")]
        public async Task<IActionResult> GetMovements([FromQuery] string? search = null)
        {
            var result = await _warehouseService.GetMovementsAsync(search);
            return Ok(result);
        }

        // ── Stock Count ──
        [HttpPost("stock-count")]
        public async Task<IActionResult> UpdateStockCount([FromBody] List<StockCountEntryDto> entries)
        {
            var success = await _warehouseService.UpdateStockCountAsync(entries);
            await _hubContext.Clients.All.SendAsync("DataChanged", "Parts");
            return Ok(new { message = "Stock updated successfully" });
        }
    }
}
