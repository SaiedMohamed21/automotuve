using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using StarAutoCenter.DTOs.Settings;
using StarAutoCenter.Hubs;
using StarAutoCenter.Services.Settings;

namespace StarAutoCenter.Controllers.Settings
{
    [ApiController]
    [Route("api/settings/workshop")]
    public class WorkshopSettingsController : ControllerBase
    {
        private readonly IWorkshopSettingsService _settingsService;
        private readonly IHubContext<DataSyncHub> _hubContext;

        public WorkshopSettingsController(IWorkshopSettingsService settingsService, IHubContext<DataSyncHub> hubContext)
        {
            _settingsService = settingsService;
            _hubContext = hubContext;
        }

        // GET: api/settings/workshop (Accessible to any authenticated user for invoice printing & branding display)
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetSettings()
        {
            var result = await _settingsService.GetSettingsAsync();
            return Ok(result);
        }

        // PUT: api/settings/workshop (Owner only!)
        [Authorize(Roles = "Owner")]
        [HttpPut]
        public async Task<IActionResult> UpdateSettings([FromBody] UpdateWorkshopSettingsDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updatedBy = User.Identity?.Name ?? User.FindFirstValue(ClaimTypes.Email) ?? "Owner";
            var result = await _settingsService.UpdateSettingsAsync(dto, updatedBy);
            await _hubContext.Clients.All.SendAsync("DataChanged", "WorkshopSettings");
            return Ok(result);
        }

        // POST: api/settings/workshop/logo (Owner only!)
        [Authorize(Roles = "Owner")]
        [HttpPost("logo")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UploadLogo([FromForm] UploadLogoDto dto)
        {
            try
            {
                var updatedBy = User.Identity?.Name ?? User.FindFirstValue(ClaimTypes.Email) ?? "Owner";
                var logoUrl = await _settingsService.UploadLogoAsync(dto.File, updatedBy);
                await _hubContext.Clients.All.SendAsync("DataChanged", "WorkshopSettings");
                return Ok(new { logoUrl, message = "Logo uploaded successfully" });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Failed to upload logo: " + ex.Message });
            }
        }

        // DELETE: api/settings/workshop/logo (Owner only!)
        [Authorize(Roles = "Owner")]
        [HttpDelete("logo")]
        public async Task<IActionResult> DeleteLogo()
        {
            var updatedBy = User.Identity?.Name ?? User.FindFirstValue(ClaimTypes.Email) ?? "Owner";
            await _settingsService.DeleteLogoAsync(updatedBy);
            await _hubContext.Clients.All.SendAsync("DataChanged", "WorkshopSettings");
            return Ok(new { message = "Logo removed successfully" });
        }
    }
}
