using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StarAutoCenter.DTOs.Suppliers;
using StarAutoCenter.Services.Suppliers;

namespace StarAutoCenter.Controllers.Suppliers
{
    [Authorize(Roles = "Warehouse,Accountant,Owner")]
    [ApiController]
    [Route("api/suppliers")]
    public class SuppliersController : ControllerBase
    {
        private readonly ISupplierService _supplierService;

        public SuppliersController(ISupplierService supplierService)
        {
            _supplierService = supplierService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? search = null, [FromQuery] string? filter = null)
        {
            var result = await _supplierService.GetSuppliersAsync(search, filter);
            return Ok(result);
        }

        [HttpGet("summary")]
        public async Task<IActionResult> GetSummary()
        {
            var result = await _supplierService.GetSummaryAsync();
            return Ok(result);
        }

        [HttpGet("next-purchase-number")]
        public async Task<IActionResult> GetNextPurchaseNumber()
        {
            var result = await _supplierService.GetNextPurchaseNumberAsync();
            return Ok(new { number = result });
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _supplierService.GetSupplierByIdAsync(id);
            if (result == null) return NotFound(new { message = "Supplier not found" });
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateSupplierDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var result = await _supplierService.CreateSupplierAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateSupplierDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var result = await _supplierService.UpdateSupplierAsync(id, dto);
            if (result == null) return NotFound(new { message = "Supplier not found" });
            return Ok(result);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _supplierService.DeleteSupplierAsync(id);
            if (!success) return NotFound(new { message = "Supplier not found" });
            return Ok(new { message = "Supplier archived successfully" });
        }

        [HttpGet("{id:int}/purchases")]
        public async Task<IActionResult> GetPurchases(int id)
        {
            var result = await _supplierService.GetPurchasesAsync(id);
            return Ok(result);
        }

        [HttpGet("purchases/{purchaseId:int}")]
        public async Task<IActionResult> GetPurchaseById(int purchaseId)
        {
            var result = await _supplierService.GetPurchaseByIdAsync(purchaseId);
            if (result == null) return NotFound(new { message = "Purchase not found" });
            return Ok(result);
        }

        [HttpPost("{id:int}/purchases")]
        public async Task<IActionResult> CreatePurchase(int id, [FromBody] CreateSupplierPurchaseDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                var result = await _supplierService.CreatePurchaseAsync(id, dto);
                return CreatedAtAction(nameof(GetPurchaseById), new { purchaseId = result.Id }, result);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("{id:int}/payments")]
        public async Task<IActionResult> GetPayments(int id)
        {
            var result = await _supplierService.GetPaymentsAsync(id);
            return Ok(result);
        }

        [HttpPost("{id:int}/payments")]
        public async Task<IActionResult> CreatePayment(int id, [FromBody] CreateSupplierPaymentDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                var result = await _supplierService.CreatePaymentAsync(id, dto);
                return Ok(result);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("{id:int}/statement")]
        public async Task<IActionResult> GetStatement(int id)
        {
            try
            {
                var result = await _supplierService.GetStatementAsync(id);
                return Ok(result);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }
    }
}
