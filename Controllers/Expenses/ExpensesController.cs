using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using StarAutoCenter.DTOs.Expenses;
using StarAutoCenter.Hubs;
using StarAutoCenter.Services.Expenses;

namespace StarAutoCenter.Controllers.Expenses
{
    [Authorize(Roles = "Accountant,Owner")]
    [ApiController]
    [Route("api/[controller]")]
    public class ExpensesController : ControllerBase
    {
        private readonly IExpenseService _expenseService;
        private readonly IHubContext<DataSyncHub> _hubContext;

        public ExpensesController(IExpenseService expenseService, IHubContext<DataSyncHub> hubContext)
        {
            _expenseService = expenseService;
            _hubContext = hubContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetExpenses([FromQuery] ExpenseFilterDto filter)
        {
            var expenses = await _expenseService.GetExpensesAsync(filter);
            return Ok(expenses);
        }

        [HttpGet("summary")]
        public async Task<IActionResult> GetSummary([FromQuery] DateTime? dateFrom, [FromQuery] DateTime? dateTo)
        {
            var summary = await _expenseService.GetSummaryAsync(dateFrom, dateTo);
            return Ok(summary);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetExpenseById(int id)
        {
            var expense = await _expenseService.GetExpenseByIdAsync(id);
            if (expense == null)
            {
                return NotFound(new { message = $"Expense with ID #{id} was not found." });
            }
            return Ok(expense);
        }

        [HttpPost]
        public async Task<IActionResult> CreateExpense([FromBody] CreateExpenseDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var username = User?.Identity?.Name ?? "Accountant";
                var created = await _expenseService.CreateExpenseAsync(dto, username);
                await _hubContext.Clients.All.SendAsync("DataChanged", "Expense");
                return CreatedAtAction(nameof(GetExpenseById), new { id = created.Id }, created);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to record expense.", error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateExpense(int id, [FromBody] UpdateExpenseDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var updated = await _expenseService.UpdateExpenseAsync(id, dto);
                if (updated == null)
                {
                    return NotFound(new { message = $"Expense with ID #{id} was not found." });
                }
                await _hubContext.Clients.All.SendAsync("DataChanged", "Expense");
                return Ok(updated);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to update expense.", error = ex.Message });
            }
        }

        [HttpPost("{id}/void")]
        public async Task<IActionResult> VoidExpense(int id, [FromBody] VoidExpenseDto? dto)
        {
            try
            {
                var result = await _expenseService.VoidExpenseAsync(id, dto?.Reason);
                if (result == null)
                {
                    return NotFound(new { message = $"Expense with ID #{id} was not found." });
                }
                await _hubContext.Clients.All.SendAsync("DataChanged", "Expense");
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to void expense.", error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpense(int id)
        {
            try
            {
                var success = await _expenseService.DeleteExpenseAsync(id);
                if (!success)
                {
                    return NotFound(new { message = $"Expense with ID #{id} was not found." });
                }
                await _hubContext.Clients.All.SendAsync("DataChanged", "Expense");
                return Ok(new { message = $"Expense #{id} has been voided/archived successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to delete expense.", error = ex.Message });
            }
        }
    }
}
