using Microsoft.EntityFrameworkCore;
using StarAutoCenter.Data;
using StarAutoCenter.DTOs.Engineer;
using StarAutoCenter.Models;
using StarAutoCenter.Models.Enums;

namespace StarAutoCenter.Services.Engineer
{
    public interface IVehicleService
    {
        Task<List<VehicleDto>> GetAllAsync(string? search = null);
        Task<List<VehicleDto>> GetByCustomerIdAsync(int customerId);
        Task<VehicleDetailsDto?> GetDetailsAsync(int id);
        Task<VehicleDto> CreateAsync(CreateVehicleDto dto);
        Task<bool> ChangeOwnerAsync(int vehicleId, ChangeOwnerDto dto);
    }

    public class VehicleService : IVehicleService
    {
        private readonly ApplicationDbContext _context;

        public VehicleService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<VehicleDto>> GetAllAsync(string? search = null)
        {
            var query = _context.Vehicles.Include(v => v.Customer).AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                var s = search.Trim().ToLower();
                query = query.Where(v =>
                    v.Make.ToLower().Contains(s) ||
                    v.Model.ToLower().Contains(s) ||
                    v.Plate.ToLower().Contains(s) ||
                    (v.VIN != null && v.VIN.ToLower().Contains(s)) ||
                    (v.Customer != null && v.Customer.Name.ToLower().Contains(s)) ||
                    (v.Customer != null && v.Customer.Phone.ToLower().Contains(s)) ||
                    v.Id.ToString() == s);
            }

            return await query.Select(v => new VehicleDto
            {
                Id = v.Id,
                Make = v.Make,
                Model = v.Model,
                Year = v.Year,
                Plate = v.Plate,
                VIN = v.VIN,
                Color = v.Color,
                Km = v.Km,
                Visits = v.Visits,
                LastVisit = v.LastVisit.HasValue ? v.LastVisit.Value.ToString("dd MMM yyyy") : null,
                CustomerId = v.CustomerId,
                CustomerName = v.Customer != null ? v.Customer.Name : "",
                CustomerPhone = v.Customer != null ? v.Customer.Phone : ""
            }).ToListAsync();
        }

        public async Task<List<VehicleDto>> GetByCustomerIdAsync(int customerId)
        {
            return await _context.Vehicles
                .Where(v => v.CustomerId == customerId)
                .Select(v => new VehicleDto
                {
                    Id = v.Id,
                    Make = v.Make,
                    Model = v.Model,
                    Year = v.Year,
                    Plate = v.Plate,
                    VIN = v.VIN,
                    Color = v.Color,
                    Km = v.Km,
                    Visits = v.Visits,
                    LastVisit = v.LastVisit.HasValue ? v.LastVisit.Value.ToString("dd MMM yyyy") : null,
                    CustomerId = v.CustomerId
                }).ToListAsync();
        }

        public async Task<VehicleDetailsDto?> GetDetailsAsync(int id)
        {
            var vehicle = await _context.Vehicles
                .Include(v => v.Customer)
                .FirstOrDefaultAsync(v => v.Id == id);

            if (vehicle == null) return null;

            var serviceHistory = await _context.ServiceHistories
                .Where(sh => sh.VehicleId == id)
                .OrderByDescending(sh => sh.Date)
                .Select(sh => new ServiceHistoryDto
                {
                    JobOrderNumber = sh.JobOrderNumber,
                    Date = sh.Date.ToString("dd MMM yyyy"),
                    Km = sh.Km,
                    Inspection = sh.Inspection,
                    Status = sh.Status.ToString()
                }).ToListAsync();

            var deferredWork = await _context.DeferredWorks
                .Where(dw => dw.VehicleId == id)
                .OrderByDescending(dw => dw.Date)
                .Select(dw => new DeferredWorkDto
                {
                    Item = dw.Item,
                    Note = dw.Note,
                    Date = dw.Date.ToString("dd MMM yyyy"),
                    JobOrderNumber = dw.JobOrderNumber,
                    Km = dw.Km,
                    Engineer = dw.Engineer
                }).ToListAsync();

            var completedCount = serviceHistory.Count(sh => sh.Status == "Completed");

            return new VehicleDetailsDto
            {
                Vehicle = new VehicleDto
                {
                    Id = vehicle.Id,
                    Make = vehicle.Make,
                    Model = vehicle.Model,
                    Year = vehicle.Year,
                    Plate = vehicle.Plate,
                    VIN = vehicle.VIN,
                    Color = vehicle.Color,
                    Km = vehicle.Km,
                    Visits = vehicle.Visits,
                    LastVisit = vehicle.LastVisit?.ToString("dd MMM yyyy"),
                    CustomerId = vehicle.CustomerId,
                    CustomerName = vehicle.Customer.Name,
                    CustomerPhone = vehicle.Customer.Phone
                },
                ServiceHistory = serviceHistory,
                DeferredWork = deferredWork,
                Stats = new StatsDto
                {
                    TotalVisits = vehicle.Visits,
                    LastService = vehicle.LastVisit?.ToString("dd MMM yyyy"),
                    CompletedItems = completedCount,
                    DeferredItems = deferredWork.Count
                }
            };
        }

        public async Task<VehicleDto> CreateAsync(CreateVehicleDto dto)
        {
            var vehicle = new Vehicle
            {
                Make = dto.Make,
                Model = dto.Model,
                Year = dto.Year,
                Plate = dto.Plate,
                VIN = dto.VIN,
                Color = dto.Color,
                Km = dto.Km,
                CustomerId = dto.CustomerId
            };

            _context.Vehicles.Add(vehicle);
            await _context.SaveChangesAsync();

            var customer = await _context.Customers.FindAsync(dto.CustomerId);

            return new VehicleDto
            {
                Id = vehicle.Id,
                Make = vehicle.Make,
                Model = vehicle.Model,
                Year = vehicle.Year,
                Plate = vehicle.Plate,
                VIN = vehicle.VIN,
                Color = vehicle.Color,
                Km = vehicle.Km,
                Visits = 0,
                CustomerId = vehicle.CustomerId,
                CustomerName = customer?.Name,
                CustomerPhone = customer?.Phone
            };
        }

        public async Task<bool> ChangeOwnerAsync(int vehicleId, ChangeOwnerDto dto)
        {
            var vehicle = await _context.Vehicles.FindAsync(vehicleId);
            if (vehicle == null) return false;

            // Find or create customer
            var customer = await _context.Customers
                .FirstOrDefaultAsync(c => c.Phone == dto.Phone);

            if (customer == null)
            {
                customer = new Customer { Name = dto.Name, Phone = dto.Phone };
                _context.Customers.Add(customer);
                await _context.SaveChangesAsync();
            }
            else
            {
                customer.Name = dto.Name;
            }

            vehicle.CustomerId = customer.Id;
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
