using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using StarAutoCenter.DTOs.Expenses;

namespace StarAutoCenter.Services.Expenses
{
    public interface IExpenseService
    {
        Task<List<ExpenseDto>> GetExpensesAsync(ExpenseFilterDto filter);
        Task<ExpenseSummaryDto> GetSummaryAsync(DateTime? dateFrom = null, DateTime? dateTo = null);
        Task<ExpenseDto?> GetExpenseByIdAsync(int id);
        Task<ExpenseDto> CreateExpenseAsync(CreateExpenseDto dto, string? user = null);
        Task<ExpenseDto?> UpdateExpenseAsync(int id, UpdateExpenseDto dto);
        Task<ExpenseDto?> VoidExpenseAsync(int id, string? reason = null);
        Task<bool> DeleteExpenseAsync(int id);
    }
}
