using Microsoft.EntityFrameworkCore;
using StarAutoCenter.Data;
using StarAutoCenter.DTOs.Engineer;
using StarAutoCenter.Models;
using StarAutoCenter.Models.Enums;

namespace StarAutoCenter.Services.Engineer
{
    public interface IJobOrderService
    {
        Task<List<JobOrderListDto>> GetAllAsync(string? search = null, string? status = null, string? sort = null);
        Task<JobOrderDetailsDto?> GetByNumberAsync(string number);
        Task<JobOrderDetailsDto?> GetByIdAsync(int id);
        Task<JobOrderListDto> CreateAsync(CreateJobOrderDto dto);
        Task<bool> UpdateStatusAsync(string number, string status);
        Task<string> GetNextNumberAsync();
    }

    public class JobOrderService : IJobOrderService
    {
        private readonly ApplicationDbContext _context;

        public JobOrderService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<JobOrderListDto>> GetAllAsync(string? search = null, string? status = null, string? sort = null)
        {
            var query = _context.JobOrders
                .Include(j => j.Customer)
                .Include(j => j.Vehicle)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                var s = search.ToLower();
                query = query.Where(j =>
                    j.Number.ToLower().Contains(s) ||
                    j.Customer.Name.ToLower().Contains(s) ||
                    (j.Vehicle.Make + " " + j.Vehicle.Model).ToLower().Contains(s) ||
                    j.Vehicle.Plate.ToLower().Contains(s));
            }

            if (!string.IsNullOrWhiteSpace(status) && status != "All")
            {
                if (Enum.TryParse<JobOrderStatus>(status, true, out var statusEnum))
                    query = query.Where(j => j.Status == statusEnum);
            }

            query = sort == "date-asc"
                ? query.OrderBy(j => j.Date)
                : query.OrderByDescending(j => j.Date);

            return await query.Select(j => new JobOrderListDto
            {
                Id = j.Id,
                Number = j.Number,
                Date = j.Date.ToString("dd MMM yyyy"),
                Customer = j.Customer.Name,
                Phone = j.Customer.Phone,
                Vehicle = j.Vehicle.Make + " " + j.Vehicle.Model,
                Plate = j.Vehicle.Plate,
                Status = j.Status.ToString(),
                Type = j.Type
            }).ToListAsync();
        }

        public async Task<JobOrderDetailsDto?> GetByNumberAsync(string number)
        {
            var jo = await _context.JobOrders
                .Include(j => j.Customer)
                .Include(j => j.Vehicle)
                .Include(j => j.WorkItems)
                .FirstOrDefaultAsync(j => j.Number == number);

            if (jo == null) return null;

            return new JobOrderDetailsDto
            {
                Id = jo.Id,
                Number = jo.Number,
                Date = jo.Date.ToString("dd MMM yyyy"),
                Status = jo.Status.ToString(),
                Type = jo.Type,
                CustomerId = jo.CustomerId,
                CustomerName = jo.Customer.Name,
                CustomerPhone = jo.Customer.Phone,
                VehicleId = jo.VehicleId,
                VehicleName = jo.Vehicle.Make + " " + jo.Vehicle.Model,
                VehiclePlate = jo.Vehicle.Plate,
                VehicleKm = jo.Km ?? jo.Vehicle.Km,
                VehicleVin = jo.Vehicle.VIN,
                Engineer = jo.Engineer,
                CustomerRequest = jo.RequiredWork,
                RequiredWork = jo.RequiredWork,
                Technicians = new List<string>(), // Simplified for now
                ApprovedItems = jo.WorkItems.Where(w => !w.IsDeferred && !w.IsRecommended).Select(w => new WorkItemDto
                {
                    Item = w.Item,
                    Note = w.Note
                }).ToList(),
                DeferredItems = jo.WorkItems.Where(w => w.IsDeferred).Select(w => w.Item).ToList(),
                RecommendedItems = jo.WorkItems.Where(w => w.IsRecommended).Select(w => new WorkItemDto
                {
                    Item = w.Item,
                    Note = w.Note
                }).ToList()
            };
        }

        public async Task<JobOrderDetailsDto?> GetByIdAsync(int id)
        {
            var jo = await _context.JobOrders
                .Include(j => j.Customer)
                .Include(j => j.Vehicle)
                .Include(j => j.WorkItems)
                .FirstOrDefaultAsync(j => j.Id == id);

            if (jo == null) return null;

            return new JobOrderDetailsDto
            {
                Id = jo.Id,
                Number = jo.Number,
                Date = jo.Date.ToString("dd MMM yyyy"),
                Status = jo.Status.ToString(),
                Type = jo.Type,
                CustomerId = jo.CustomerId,
                CustomerName = jo.Customer.Name,
                CustomerPhone = jo.Customer.Phone,
                VehicleId = jo.VehicleId,
                VehicleName = jo.Vehicle.Make + " " + jo.Vehicle.Model,
                VehiclePlate = jo.Vehicle.Plate,
                VehicleKm = jo.Km ?? jo.Vehicle.Km,
                VehicleVin = jo.Vehicle.VIN,
                Engineer = jo.Engineer,
                CustomerRequest = jo.RequiredWork,
                RequiredWork = jo.RequiredWork,
                Technicians = new List<string>(),
                ApprovedItems = jo.WorkItems.Where(w => !w.IsDeferred && !w.IsRecommended).Select(w => new WorkItemDto
                {
                    Item = w.Item,
                    Note = w.Note
                }).ToList(),
                DeferredItems = jo.WorkItems.Where(w => w.IsDeferred).Select(w => w.Item).ToList(),
                RecommendedItems = jo.WorkItems.Where(w => w.IsRecommended).Select(w => new WorkItemDto
                {
                    Item = w.Item,
                    Note = w.Note
                }).ToList()
            };
        }

        public async Task<JobOrderListDto> CreateAsync(CreateJobOrderDto dto)
        {
            var number = await GetNextNumberAsync();

            var jobOrder = new JobOrder
            {
                Number = number,
                Date = DateTime.UtcNow,
                Status = JobOrderStatus.Open,
                Type = dto.Type,
                RequiredWork = dto.RequiredWork,
                CompletedWork = dto.CompletedWork,
                Notes = dto.Notes,
                Km = dto.Km,
                Engineer = dto.Engineer,
                CustomerId = dto.CustomerId,
                VehicleId = dto.VehicleId
            };

            _context.JobOrders.Add(jobOrder);

            // Update existing vehicle visits and last visit date
            var vehicle = await _context.Vehicles.FindAsync(dto.VehicleId);
            if (vehicle != null)
            {
                vehicle.Visits++;
                vehicle.LastVisit = DateTime.UtcNow;
                if (!string.IsNullOrWhiteSpace(dto.Km))
                    vehicle.Km = dto.Km;
            }

            // Add service history
            var history = new ServiceHistory
            {
                VehicleId = dto.VehicleId,
                JobOrderNumber = number,
                Date = DateTime.UtcNow,
                Km = dto.Km ?? vehicle?.Km,
                Inspection = dto.RequiredWork?.Length > 60 ? dto.RequiredWork[..60] : dto.RequiredWork ?? "General Inspection",
                Status = JobOrderStatus.Open
            };
            _context.ServiceHistories.Add(history);

            await _context.SaveChangesAsync();

            var customer = await _context.Customers.FindAsync(dto.CustomerId);

            return new JobOrderListDto
            {
                Id = jobOrder.Id,
                Number = jobOrder.Number,
                Date = jobOrder.Date.ToString("dd MMM yyyy"),
                Customer = customer?.Name ?? "",
                Phone = customer?.Phone ?? "",
                Vehicle = vehicle != null ? $"{vehicle.Make} {vehicle.Model}" : "",
                Plate = vehicle?.Plate ?? "",
                Status = jobOrder.Status.ToString(),
                Type = jobOrder.Type
            };
        }

        public async Task<bool> UpdateStatusAsync(string number, string status)
        {
            var jo = await _context.JobOrders.FirstOrDefaultAsync(j => j.Number == number);
            if (jo == null) return false;

            if (Enum.TryParse<JobOrderStatus>(status, true, out var statusEnum))
            {
                jo.Status = statusEnum;
                await _context.SaveChangesAsync();
                return true;
            }

            return false;
        }

        public async Task<string> GetNextNumberAsync()
        {
            var year = DateTime.UtcNow.Year;
            var prefix = $"JO-{year}-";

            var existingNumbers = await _context.JobOrders
                .Where(j => j.Number.StartsWith(prefix))
                .Select(j => j.Number)
                .ToListAsync();

            int nextSeq = 1;
            while (existingNumbers.Contains($"{prefix}{nextSeq:D5}"))
            {
                nextSeq++;
            }

            return $"{prefix}{nextSeq:D5}";
        }
    }
}
