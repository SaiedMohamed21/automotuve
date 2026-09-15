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
    public class VehiclesController : ControllerBase
    {
        private readonly IVehicleService _vehicleService;
        private readonly IHubContext<DataSyncHub> _hubContext;

        public VehiclesController(IVehicleService vehicleService, IHubContext<DataSyncHub> hubContext)
        {
            _vehicleService = vehicleService;
            _hubContext = hubContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? search = null)
        {
            var result = await _vehicleService.GetAllAsync(search);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetails(int id)
        {
            var result = await _vehicleService.GetDetailsAsync(id);
            if (result == null) return NotFound(new { message = "Vehicle not found" });
            return Ok(result);
        }

        [HttpGet("by-customer/{customerId}")]
        public async Task<IActionResult> GetByCustomer(int customerId)
        {
            var result = await _vehicleService.GetByCustomerIdAsync(customerId);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateVehicleDto dto)
        {
            var result = await _vehicleService.CreateAsync(dto);
            await _hubContext.Clients.All.SendAsync("DataChanged", "Vehicles");
            return CreatedAtAction(nameof(GetDetails), new { id = result.Id }, result);
        }

        [HttpPut("{id}/owner")]
        public async Task<IActionResult> ChangeOwner(int id, [FromBody] ChangeOwnerDto dto)
        {
            var success = await _vehicleService.ChangeOwnerAsync(id, dto);
            if (!success) return NotFound(new { message = "Vehicle not found" });
            await _hubContext.Clients.All.SendAsync("DataChanged", "Vehicles");
            return Ok(new { message = "Owner updated successfully" });
        }
    }
}
