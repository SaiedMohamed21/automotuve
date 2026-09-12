using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StarAutoCenter.DTOs.Owner;
using StarAutoCenter.Services.Owner;

namespace StarAutoCenter.Controllers.Owner
{
    [Authorize(Roles = "Owner")]
    [ApiController]
    [Route("api/owner")]
    public class OwnerController : ControllerBase
    {
        private readonly IOwnerService _ownerService;

        public OwnerController(IOwnerService ownerService)
        {
            _ownerService = ownerService;
        }

        // ── Dashboard ──
        [HttpGet("dashboard")]
        public async Task<IActionResult> GetDashboard()
        {
            var result = await _ownerService.GetDashboardAsync();
            return Ok(result);
        }

        // ── Users ──
        [HttpGet("users")]
        public async Task<IActionResult> GetUsers(
            [FromQuery] string? search = null,
            [FromQuery] string? role = null,
            [FromQuery] string? status = null)
        {
            var result = await _ownerService.GetUsersAsync(search, role, status);
            return Ok(result);
        }

        [HttpPost("users")]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserDto dto)
        {
            try
            {
                var result = await _ownerService.CreateUserAsync(dto);
                return Ok(result);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("users/{id}")]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] UpdateUserDto dto)
        {
            try
            {
                var result = await _ownerService.UpdateUserAsync(id, dto);
                return Ok(result);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("users/{id}/toggle-status")]
        public async Task<IActionResult> ToggleUserStatus(string id)
        {
            var success = await _ownerService.ToggleUserStatusAsync(id);
            if (!success) return NotFound(new { message = "User not found" });
            return Ok(new { message = "User status toggled" });
        }

        [HttpPost("users/{id}/change-password")]
        public async Task<IActionResult> ChangePassword(string id, [FromBody] ChangePasswordDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Password))
                return BadRequest(new { message = "Password cannot be empty" });

            var success = await _ownerService.ChangePasswordAsync(id, dto.Password);
            if (!success) return BadRequest(new { message = "Failed to change user password" });
            return Ok(new { message = "Password changed successfully" });
        }

        // ── Settings ──
        [HttpGet("settings")]
        public async Task<IActionResult> GetSettings()
        {
            var result = await _ownerService.GetSettingsAsync();
            return Ok(result);
        }

        [HttpPut("settings")]
        public async Task<IActionResult> UpdateSettings([FromBody] BusinessSettingsDto dto)
        {
            var result = await _ownerService.UpdateSettingsAsync(dto);
            return Ok(result);
        }
    }
}
