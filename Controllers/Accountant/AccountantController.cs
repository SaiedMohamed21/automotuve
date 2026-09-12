using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StarAutoCenter.DTOs.Accountant;
using StarAutoCenter.Services.Accountant;

namespace StarAutoCenter.Controllers.Accountant
{
    [Authorize(Roles = "Accountant,Owner")]
    [ApiController]
    [Route("api/accountant")]
    public class AccountantController : ControllerBase
    {
        private readonly IAccountantService _accountantService;

        public AccountantController(IAccountantService accountantService)
        {
            _accountantService = accountantService;
        }

        [HttpGet("dashboard")]
        public async Task<IActionResult> GetDashboard()
        {
            var result = await _accountantService.GetDashboardAsync();
            return Ok(result);
        }

        [HttpGet("jobs")]
        public async Task<IActionResult> GetJobs(
            [FromQuery] string? search = null,
            [FromQuery] string? status = null)
        {
            var result = await _accountantService.GetJobsAsync(search, status);
            return Ok(result);
        }

        [HttpGet("jobs/{joNumber}")]
        public async Task<IActionResult> GetJobDetails(string joNumber)
        {
            var result = await _accountantService.GetJobDetailsAsync(joNumber);
            if (result == null) return NotFound(new { message = "Job order not found" });
            return Ok(result);
        }

        [HttpPost("jobs/{joNumber}/work-found")]
        public async Task<IActionResult> SaveWorkFound(string joNumber, [FromBody] SaveWorkFoundDto dto)
        {
            var success = await _accountantService.SaveWorkFoundAsync(joNumber, dto);
            if (!success) return NotFound(new { message = "Job order not found" });
            return Ok(new { message = "Work found saved successfully" });
        }

        [HttpPost("jobs/{joNumber}/invoice")]
        public async Task<IActionResult> CreateInvoice(string joNumber, [FromBody] CreateInvoiceDto dto)
        {
            var result = await _accountantService.CreateInvoiceAsync(joNumber, dto);
            if (result == null) return BadRequest(new { message = "Cannot create invoice. Job order not found or invoice already exists." });
            return Ok(result);
        }

        [HttpGet("invoices")]
        public async Task<IActionResult> GetInvoices(
            [FromQuery] string? search = null,
            [FromQuery] string? paymentStatus = null)
        {
            var result = await _accountantService.GetInvoicesAsync(search, paymentStatus);
            return Ok(result);
        }

        [HttpGet("invoices/{invoiceNumber}")]
        public async Task<IActionResult> GetInvoiceDetails(string invoiceNumber)
        {
            var result = await _accountantService.GetInvoiceDetailsAsync(invoiceNumber);
            if (result == null) return NotFound(new { message = "Invoice not found" });
            return Ok(result);
        }

        [HttpGet("payments")]
        public async Task<IActionResult> GetPayments([FromQuery] string? search = null)
        {
            var result = await _accountantService.GetPaymentsAsync(search);
            return Ok(result);
        }

        [HttpPost("payments")]
        public async Task<IActionResult> RecordPayment([FromBody] CreatePaymentDto dto)
        {
            var result = await _accountantService.RecordPaymentAsync(dto);
            if (result == null) return NotFound(new { message = "Invoice not found" });
            return Ok(result);
        }

        [HttpPut("parts/{partId}/prices")]
        public async Task<IActionResult> UpdatePartPrices(int partId, [FromBody] UpdatePartPricesDto dto)
        {
            var success = await _accountantService.UpdatePartPricesAsync(partId, dto);
            if (!success) return NotFound(new { message = "Part not found" });
            return Ok(new { message = "Prices updated successfully" });
        }
    }
}
