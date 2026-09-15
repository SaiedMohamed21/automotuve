using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using StarAutoCenter.DTOs.Engineer;
using StarAutoCenter.Hubs;
using StarAutoCenter.Services.Engineer;

namespace StarAutoCenter.Controllers.Engineer
{
    [Authorize]
    [ApiController]
    [Route("api/job-orders")]
    public class JobOrdersController : ControllerBase
    {
        private readonly IJobOrderService _jobOrderService;
        private readonly IHubContext<DataSyncHub> _hubContext;

        public JobOrdersController(IJobOrderService jobOrderService, IHubContext<DataSyncHub> hubContext)
        {
            _jobOrderService = jobOrderService;
            _hubContext = hubContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(
            [FromQuery] string? search = null,
            [FromQuery] string? status = null,
            [FromQuery] string? sort = null)
        {
            var result = await _jobOrderService.GetAllAsync(search, status, sort);
            return Ok(result);
        }

        [HttpGet("{number}")]
        public async Task<IActionResult> GetByNumber(string number)
        {
            var result = await _jobOrderService.GetByNumberAsync(number);
            if (result == null) return NotFound(new { message = "Job order not found" });
            return Ok(result);
        }

        [HttpGet("by-id/{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _jobOrderService.GetByIdAsync(id);
            if (result == null) return NotFound(new { message = "Job order not found" });
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateJobOrderDto dto)
        {
            var userName = User.FindFirstValue(System.Security.Claims.ClaimTypes.Name) 
                           ?? User.Identity?.Name 
                           ?? User.FindFirstValue(System.Security.Claims.ClaimTypes.Email);

            if (!string.IsNullOrWhiteSpace(userName))
            {
                dto.Engineer = userName;
            }

            var result = await _jobOrderService.CreateAsync(dto);
            await _hubContext.Clients.All.SendAsync("DataChanged", "JobOrders");
            return CreatedAtAction(nameof(GetByNumber), new { number = result.Number }, result);
        }

        [HttpPut("{number}")]
        public async Task<IActionResult> Update(string number, [FromBody] UpdateJobOrderDto dto)
        {
            var result = await _jobOrderService.UpdateAsync(number, dto);
            if (result == null) return NotFound(new { message = "Job order not found" });
            await _hubContext.Clients.All.SendAsync("DataChanged", "JobOrders");
            return Ok(result);
        }

        [HttpPut("{number}/status")]
        public async Task<IActionResult> UpdateStatus(string number, [FromBody] UpdateStatusDto dto)
        {
            var success = await _jobOrderService.UpdateStatusAsync(number, dto.Status);
            if (!success) return NotFound(new { message = "Job order not found or invalid status" });
            await _hubContext.Clients.All.SendAsync("DataChanged", "JobOrders");
            return Ok(new { message = "Status updated successfully" });
        }

        [HttpGet("next-number")]
        public async Task<IActionResult> GetNextNumber()
        {
            var number = await _jobOrderService.GetNextNumberAsync();
            return Ok(new { number });
        }
    }

    public class UpdateStatusDto
    {
        public string Status { get; set; } = string.Empty;
    }
}
