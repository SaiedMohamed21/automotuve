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
    [Route("api/[controller]")]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerService _customerService;
        private readonly IHubContext<DataSyncHub> _hubContext;

        public CustomersController(ICustomerService customerService, IHubContext<DataSyncHub> hubContext)
        {
            _customerService = customerService;
            _hubContext = hubContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? search = null)
        {
            var result = await _customerService.GetAllAsync(search);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _customerService.GetByIdAsync(id);
            if (result == null) return NotFound(new { message = "Customer not found" });
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCustomerDto dto)
        {
            var result = await _customerService.CreateAsync(dto);
            await _hubContext.Clients.All.SendAsync("DataChanged", "Customers");
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CreateCustomerDto dto)
        {
            var result = await _customerService.UpdateAsync(id, dto);
            if (result == null) return NotFound(new { message = "Customer not found" });
            await _hubContext.Clients.All.SendAsync("DataChanged", "Customers");
            return Ok(result);
        }
    }
}
