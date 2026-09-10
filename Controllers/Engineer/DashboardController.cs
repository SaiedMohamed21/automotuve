using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StarAutoCenter.Services.Engineer;

namespace StarAutoCenter.Controllers.Engineer
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;

        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await _dashboardService.GetDashboardAsync();
            return Ok(result);
        }
    }
}
