using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StarAutoCenter.DTOs.Engineer;
using StarAutoCenter.Services.Engineer;

namespace StarAutoCenter.Controllers.Engineer
{
    [ApiController]
    [Route("api/job-orders")]
    public class JobOrdersController : ControllerBase
    {
        private readonly IJobOrderService _jobOrderService;

        public JobOrdersController(IJobOrderService jobOrderService)
        {
            _jobOrderService = jobOrderService;
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

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateJobOrderDto dto)
        {
            var result = await _jobOrderService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetByNumber), new { number = result.Number }, result);
        }

        [HttpPut("{number}/status")]
        public async Task<IActionResult> UpdateStatus(string number, [FromBody] UpdateStatusDto dto)
        {
            var success = await _jobOrderService.UpdateStatusAsync(number, dto.Status);
            if (!success) return NotFound(new { message = "Job order not found or invalid status" });
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
