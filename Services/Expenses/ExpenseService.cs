using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StarAutoCenter.Data;
using StarAutoCenter.DTOs.Expenses;
using StarAutoCenter.Models;

namespace StarAutoCenter.Services.Expenses
{
    public class ExpenseService : IExpenseService
    {
        private readonly ApplicationDbContext _context;

        public ExpenseService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<ExpenseDto>> GetExpensesAsync(ExpenseFilterDto filter)
        {
            var query = _context.Expenses.AsQueryable();

            if (!filter.IncludeVoided)
            {
                query = query.Where(e => !e.IsVoided);
            }

            if (filter.DateFrom.HasValue)
            {
                var fromDate = filter.DateFrom.Value.Date;
                query = query.Where(e => e.ExpenseDate >= fromDate);
            }

            if (filter.DateTo.HasValue)
            {
                var toDate = filter.DateTo.Value.Date.AddDays(1).AddTicks(-1);
                query = query.Where(e => e.ExpenseDate <= toDate);
            }

            if (!string.IsNullOrWhiteSpace(filter.Category) && filter.Category != "All")
            {
                var catTrim = filter.Category.Trim().ToLower();
                query = query.Where(e => e.Category.ToLower() == catTrim);
            }

            if (!string.IsNullOrWhiteSpace(filter.PaymentMethod) && filter.PaymentMethod != "All")
            {
                var pmTrim = filter.PaymentMethod.Trim().ToLower();
                query = query.Where(e => e.PaymentMethod.ToLower() == pmTrim);
            }

            if (!string.IsNullOrWhiteSpace(filter.Search))
            {
                var q = filter.Search.Trim().ToLower();
                query = query.Where(e =>
                    e.ExpenseNumber.ToLower().Contains(q) ||
                    e.Description.ToLower().Contains(q) ||
                    e.Category.ToLower().Contains(q) ||
                    (e.Reference != null && e.Reference.ToLower().Contains(q)) ||
                    (e.Notes != null && e.Notes.ToLower().Contains(q)) ||
                    (e.CreatedBy != null && e.CreatedBy.ToLower().Contains(q))
                );
            }

            var list = await query
                .OrderByDescending(e => e.ExpenseDate)
                .ThenByDescending(e => e.Id)
                .ToListAsync();

            return list.Select(MapToDto).ToList();
        }

        public async Task<ExpenseSummaryDto> GetSummaryAsync(DateTime? dateFrom = null, DateTime? dateTo = null)
        {
            var now = DateTime.UtcNow;
            var today = now.Date;
            var currentYear = now.Year;
            var currentMonth = now.Month;

            // Only active expenses count toward financial totals
            var activeExpenses = await _context.Expenses
                .Where(e => !e.IsVoided)
                .ToListAsync();

            var voidedCount = await _context.Expenses
                .CountAsync(e => e.IsVoided);

            var totalToday = activeExpenses
                .Where(e => e.ExpenseDate.Date == today)
                .Sum(e => e.Amount);

            var totalThisMonth = activeExpenses
                .Where(e => e.ExpenseDate.Year == currentYear && e.ExpenseDate.Month == currentMonth)
                .Sum(e => e.Amount);

            var totalThisYear = activeExpenses
                .Where(e => e.ExpenseDate.Year == currentYear)
                .Sum(e => e.Amount);

            var totalAllTime = activeExpenses
                .Sum(e => e.Amount);

            // Filtered set for category breakdown
            var filtered = activeExpenses.AsEnumerable();
            if (dateFrom.HasValue)
            {
                var df = dateFrom.Value.Date;
                filtered = filtered.Where(e => e.ExpenseDate >= df);
            }
            if (dateTo.HasValue)
            {
                var dt = dateTo.Value.Date.AddDays(1).AddTicks(-1);
                filtered = filtered.Where(e => e.ExpenseDate <= dt);
            }

            var filteredList = filtered.ToList();
            var filteredTotal = filteredList.Sum(e => e.Amount);

            var breakdown = filteredList
                .GroupBy(e => string.IsNullOrWhiteSpace(e.Category) ? "Other" : e.Category.Trim())
                .Select(g =>
                {
                    var catTotal = g.Sum(x => x.Amount);
                    var pct = filteredTotal > 0 ? (double)(catTotal / filteredTotal) * 100 : 0.0;
                    return new CategoryExpenseSummaryDto
                    {
                        Category = g.Key,
                        TotalAmount = catTotal,
                        Count = g.Count(),
                        Percentage = Math.Round(pct, 1)
                    };
                })
                .OrderByDescending(b => b.TotalAmount)
                .ToList();

            return new ExpenseSummaryDto
            {
                TotalToday = totalToday,
                TotalThisMonth = totalThisMonth,
                TotalThisYear = totalThisYear,
                TotalAllTime = totalAllTime,
                FilteredTotal = filteredTotal,
                ActiveCount = activeExpenses.Count,
                VoidedCount = voidedCount,
                CategoryBreakdown = breakdown
            };
        }

        public async Task<ExpenseDto?> GetExpenseByIdAsync(int id)
        {
            var expense = await _context.Expenses.FindAsync(id);
            if (expense == null) return null;
            return MapToDto(expense);
        }

        public async Task<ExpenseDto> CreateExpenseAsync(CreateExpenseDto dto, string? user = null)
        {
            if (dto.Amount <= 0)
            {
                throw new ArgumentException("Expense amount must be greater than 0");
            }

            if (string.IsNullOrWhiteSpace(dto.Category))
            {
                throw new ArgumentException("Expense category is required");
            }

            if (string.IsNullOrWhiteSpace(dto.Description))
            {
                throw new ArgumentException("Expense description is required");
            }

            var expenseDate = dto.ExpenseDate ?? DateTime.UtcNow;
            var expenseNumber = await GenerateExpenseNumberAsync(expenseDate);

            var expense = new Expense
            {
                ExpenseNumber = expenseNumber,
                ExpenseDate = expenseDate,
                Category = dto.Category.Trim(),
                Description = dto.Description.Trim(),
                Amount = dto.Amount,
                PaymentMethod = string.IsNullOrWhiteSpace(dto.PaymentMethod) ? "Cash" : dto.PaymentMethod.Trim(),
                Reference = dto.Reference?.Trim(),
                Notes = dto.Notes?.Trim(),
                CreatedBy = user?.Trim() ?? dto.CreatedBy?.Trim() ?? "Accountant",
                CreatedAt = DateTime.UtcNow,
                IsVoided = false
            };

            _context.Expenses.Add(expense);
            await _context.SaveChangesAsync();

            return MapToDto(expense);
        }

        public async Task<ExpenseDto?> UpdateExpenseAsync(int id, UpdateExpenseDto dto)
        {
            var expense = await _context.Expenses.FindAsync(id);
            if (expense == null) return null;

            if (expense.IsVoided)
            {
                throw new InvalidOperationException("Cannot modify an expense that has been voided.");
            }

            if (dto.Amount <= 0)
            {
                throw new ArgumentException("Expense amount must be greater than 0");
            }

            if (string.IsNullOrWhiteSpace(dto.Category))
            {
                throw new ArgumentException("Expense category is required");
            }

            if (string.IsNullOrWhiteSpace(dto.Description))
            {
                throw new ArgumentException("Expense description is required");
            }

            // Strictly preserve Id and ExpenseNumber
            if (dto.ExpenseDate.HasValue)
            {
                expense.ExpenseDate = dto.ExpenseDate.Value;
            }

            expense.Category = dto.Category.Trim();
            expense.Description = dto.Description.Trim();
            expense.Amount = dto.Amount;
            expense.PaymentMethod = string.IsNullOrWhiteSpace(dto.PaymentMethod) ? "Cash" : dto.PaymentMethod.Trim();
            expense.Reference = dto.Reference?.Trim();
            expense.Notes = dto.Notes?.Trim();
            expense.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return MapToDto(expense);
        }

        public async Task<ExpenseDto?> VoidExpenseAsync(int id, string? reason = null)
        {
            var expense = await _context.Expenses.FindAsync(id);
            if (expense == null) return null;

            if (!expense.IsVoided)
            {
                expense.IsVoided = true;
                expense.VoidReason = string.IsNullOrWhiteSpace(reason) ? "Voided by user" : reason.Trim();
                expense.VoidedAt = DateTime.UtcNow;
                expense.UpdatedAt = DateTime.UtcNow;

                await _context.SaveChangesAsync();
            }

            return MapToDto(expense);
        }

        public async Task<bool> DeleteExpenseAsync(int id)
        {
            var expense = await _context.Expenses.FindAsync(id);
            if (expense == null) return false;

            // Audit-safe behavior: mark as voided instead of hard deleting historical financial record
            expense.IsVoided = true;
            expense.VoidReason = "Deleted/Voided via API";
            expense.VoidedAt = DateTime.UtcNow;
            expense.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }

        private async Task<string> GenerateExpenseNumberAsync(DateTime expenseDate)
        {
            var year = expenseDate.Year;
            var prefix = $"EXP-{year}-";

            var lastNumber = await _context.Expenses
                .Where(e => e.ExpenseNumber.StartsWith(prefix))
                .OrderByDescending(e => e.ExpenseNumber)
                .Select(e => e.ExpenseNumber)
                .FirstOrDefaultAsync();

            int nextSeq = 1;
            if (!string.IsNullOrEmpty(lastNumber) && lastNumber.Length > prefix.Length)
            {
                var seqPart = lastNumber.Substring(prefix.Length);
                if (int.TryParse(seqPart, out int parsed))
                {
                    nextSeq = parsed + 1;
                }
            }

            return $"{prefix}{nextSeq:D5}";
        }

        private static ExpenseDto MapToDto(Expense e)
        {
            return new ExpenseDto
            {
                Id = e.Id,
                ExpenseNumber = e.ExpenseNumber,
                ExpenseDate = e.ExpenseDate.ToString("dd MMM yyyy"),
                ExpenseDateIso = e.ExpenseDate.ToString("yyyy-MM-dd"),
                Category = e.Category,
                Description = e.Description,
                Amount = e.Amount,
                PaymentMethod = e.PaymentMethod,
                Reference = e.Reference,
                Notes = e.Notes,
                CreatedBy = e.CreatedBy,
                CreatedAt = e.CreatedAt.ToString("dd MMM yyyy HH:mm"),
                UpdatedAt = e.UpdatedAt?.ToString("dd MMM yyyy HH:mm"),
                IsVoided = e.IsVoided,
                VoidReason = e.VoidReason,
                VoidedAt = e.VoidedAt?.ToString("dd MMM yyyy HH:mm")
            };
        }
    }
}
