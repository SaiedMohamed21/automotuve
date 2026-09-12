using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StarAutoCenter.DTOs.Settings;
using StarAutoCenter.Services.Settings;

namespace StarAutoCenter.Controllers.Settings
{
    [ApiController]
    [Route("api/settings/workshop")]
    public class WorkshopSettingsController : ControllerBase
    {
        private readonly IWorkshopSettingsService _settingsService;

        public WorkshopSettingsController(IWorkshopSettingsService settingsService)
        {
            _settingsService = settingsService;
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
            return Ok(new { message = "Logo removed successfully" });
        }
    }
}
