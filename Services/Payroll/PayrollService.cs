using Microsoft.EntityFrameworkCore;
using StarAutoCenter.Data;
using StarAutoCenter.DTOs.Payroll;
using StarAutoCenter.Models;

namespace StarAutoCenter.Services.Payroll
{
    public class PayrollService : IPayrollService
    {
        private readonly ApplicationDbContext _context;

        public PayrollService(ApplicationDbContext context)
        {
            _context = context;
        }

        // ── Technicians ──

        public async Task<List<TechnicianDto>> GetTechniciansAsync()
        {
            return await _context.Technicians
                .OrderBy(t => t.Name)
                .Select(t => new TechnicianDto
                {
                    Id = t.Id,
                    Name = t.Name,
                    Phone = t.Phone,
                    Status = t.Status,
                    DailyRate = t.DailyRate,
                    JoinedDate = t.JoinedDate,
                    Notes = t.Notes
                })
                .ToListAsync();
        }

        public async Task<TechnicianDto?> GetTechnicianByIdAsync(string id)
        {
            var t = await _context.Technicians.FindAsync(id);
            if (t == null) return null;

            return new TechnicianDto
            {
                Id = t.Id,
                Name = t.Name,
                Phone = t.Phone,
                Status = t.Status,
                DailyRate = t.DailyRate,
                JoinedDate = t.JoinedDate,
                Notes = t.Notes
            };
        }

        public async Task<TechnicianDto> CreateTechnicianAsync(CreateTechnicianDto dto)
        {
            var tech = new Technician
            {
                Id = !string.IsNullOrWhiteSpace(dto.Id) ? dto.Id : $"tech-{Guid.NewGuid().ToString("N")[..8]}",
                Name = dto.Name,
                Phone = dto.Phone,
                Status = string.IsNullOrWhiteSpace(dto.Status) ? "Active" : dto.Status,
                DailyRate = dto.DailyRate,
                JoinedDate = !string.IsNullOrWhiteSpace(dto.JoinedDate) ? dto.JoinedDate : DateTime.UtcNow.ToString("dd MMM yyyy"),
                Notes = dto.Notes,
                CreatedAt = DateTime.UtcNow
            };

            _context.Technicians.Add(tech);
            await _context.SaveChangesAsync();

            return new TechnicianDto
            {
                Id = tech.Id,
                Name = tech.Name,
                Phone = tech.Phone,
                Status = tech.Status,
                DailyRate = tech.DailyRate,
                JoinedDate = tech.JoinedDate,
                Notes = tech.Notes
            };
        }

        public async Task<TechnicianDto?> UpdateTechnicianAsync(string id, UpdateTechnicianDto dto)
        {
            var tech = await _context.Technicians.FindAsync(id);
            if (tech == null) return null;

            tech.Name = dto.Name;
            tech.Phone = dto.Phone;
            tech.Status = dto.Status;
            tech.DailyRate = dto.DailyRate;
            if (!string.IsNullOrWhiteSpace(dto.JoinedDate))
                tech.JoinedDate = dto.JoinedDate;
            tech.Notes = dto.Notes;

            await _context.SaveChangesAsync();

            return new TechnicianDto
            {
                Id = tech.Id,
                Name = tech.Name,
                Phone = tech.Phone,
                Status = tech.Status,
                DailyRate = tech.DailyRate,
                JoinedDate = tech.JoinedDate,
                Notes = tech.Notes
            };
        }

        public async Task<bool> DeleteTechnicianAsync(string id)
        {
            var tech = await _context.Technicians.FindAsync(id);
            if (tech == null) return false;

            tech.IsDeleted = true;
            tech.Status = "Inactive";
            await _context.SaveChangesAsync();
            return true;
        }

        // ── Attendance ──

        public async Task<List<AttendanceRecordDto>> GetAttendanceRecordsAsync(
            string? technicianId = null,
            string? startDate = null,
            string? endDate = null)
        {
            var query = _context.AttendanceRecords
                .Include(a => a.Technician)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(technicianId))
                query = query.Where(a => a.TechnicianId == technicianId);

            if (!string.IsNullOrWhiteSpace(startDate))
                query = query.Where(a => string.Compare(a.Date, startDate) >= 0);

            if (!string.IsNullOrWhiteSpace(endDate))
                query = query.Where(a => string.Compare(a.Date, endDate) <= 0);

            return await query
                .OrderByDescending(a => a.Date)
                .Select(a => new AttendanceRecordDto
                {
                    Id = a.Id,
                    TechnicianId = a.TechnicianId,
                    TechnicianName = a.Technician.Name,
                    Date = a.Date,
                    Status = a.Status,
                    DailyRate = a.DailyRate,
                    Notes = a.Notes,
                    Timestamp = a.CreatedAt.ToString("o")
                })
                .ToListAsync();
        }

        public async Task<AttendanceRecordDto> MarkAttendanceAsync(MarkAttendanceDto dto)
        {
            var tech = await _context.Technicians.FindAsync(dto.TechnicianId);
            if (tech == null)
                throw new InvalidOperationException($"Technician with ID {dto.TechnicianId} not found");

            var existing = await _context.AttendanceRecords
                .FirstOrDefaultAsync(a => a.TechnicianId == dto.TechnicianId && a.Date == dto.Date);

            decimal rate = dto.DailyRate ?? tech.DailyRate;

            if (existing != null)
            {
                existing.Status = dto.Status;
                existing.DailyRate = rate;
                existing.Notes = dto.Notes;
                await _context.SaveChangesAsync();

                return new AttendanceRecordDto
                {
                    Id = existing.Id,
                    TechnicianId = existing.TechnicianId,
                    TechnicianName = tech.Name,
                    Date = existing.Date,
                    Status = existing.Status,
                    DailyRate = existing.DailyRate,
                    Notes = existing.Notes,
                    Timestamp = existing.CreatedAt.ToString("o")
                };
            }

            var record = new AttendanceRecord
            {
                Id = !string.IsNullOrWhiteSpace(dto.Id) ? dto.Id : $"att-{Guid.NewGuid().ToString("N")[..8]}",
                TechnicianId = dto.TechnicianId,
                Date = dto.Date,
                Status = dto.Status,
                DailyRate = rate,
                Notes = dto.Notes,
                CreatedAt = DateTime.UtcNow
            };

            _context.AttendanceRecords.Add(record);
            await _context.SaveChangesAsync();

            return new AttendanceRecordDto
            {
                Id = record.Id,
                TechnicianId = record.TechnicianId,
                TechnicianName = tech.Name,
                Date = record.Date,
                Status = record.Status,
                DailyRate = record.DailyRate,
                Notes = record.Notes,
                Timestamp = record.CreatedAt.ToString("o")
            };
        }

        // ── Payroll Transactions ──

        public async Task<List<PayrollTransactionDto>> GetPayrollTransactionsAsync(string? technicianId = null)
        {
            var query = _context.PayrollTransactions
                .Include(p => p.Technician)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(technicianId))
                query = query.Where(p => p.TechnicianId == technicianId);

            return await query
                .OrderByDescending(p => p.CreatedAt)
                .Select(p => new PayrollTransactionDto
                {
                    Id = p.Id,
                    TechnicianId = p.TechnicianId,
                    TechnicianName = p.Technician.Name,
                    Date = p.Date,
                    Type = p.Type,
                    Amount = p.Amount,
                    Notes = p.Notes,
                    Status = p.Status,
                    Reason = p.Reason,
                    PaymentMethod = p.PaymentMethod,
                    CreatedAt = p.CreatedAt.ToString("o")
                })
                .ToListAsync();
        }

        public async Task<PayrollTransactionDto> RecordPayrollTransactionAsync(CreatePayrollTransactionDto dto)
        {
            var tech = await _context.Technicians.FindAsync(dto.TechnicianId);
            if (tech == null)
                throw new InvalidOperationException($"Technician with ID {dto.TechnicianId} not found");

            var tx = new PayrollTransaction
            {
                Id = !string.IsNullOrWhiteSpace(dto.Id) ? dto.Id : $"tx-{Guid.NewGuid().ToString("N")[..8]}",
                TechnicianId = dto.TechnicianId,
                Date = dto.Date,
                Type = dto.Type,
                Amount = dto.Amount,
                Notes = dto.Notes,
                Status = string.IsNullOrWhiteSpace(dto.Status) ? "Paid" : dto.Status,
                Reason = dto.Reason,
                PaymentMethod = dto.PaymentMethod,
                CreatedAt = DateTime.UtcNow
            };

            _context.PayrollTransactions.Add(tx);
            await _context.SaveChangesAsync();

            return new PayrollTransactionDto
            {
                Id = tx.Id,
                TechnicianId = tx.TechnicianId,
                TechnicianName = tech.Name,
                Date = tx.Date,
                Type = tx.Type,
                Amount = tx.Amount,
                Notes = tx.Notes,
                Status = tx.Status,
                Reason = tx.Reason,
                PaymentMethod = tx.PaymentMethod,
                CreatedAt = tx.CreatedAt.ToString("o")
            };
        }

        public async Task<bool> DeletePayrollTransactionAsync(string id)
        {
            var tx = await _context.PayrollTransactions.FindAsync(id);
            if (tx == null) return false;

            _context.PayrollTransactions.Remove(tx);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
