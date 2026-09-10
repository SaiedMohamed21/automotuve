using Microsoft.EntityFrameworkCore;
using StarAutoCenter.Data;
using StarAutoCenter.DTOs.Engineer;
using StarAutoCenter.Models;

namespace StarAutoCenter.Services.Engineer
{
    public interface ICustomerService
    {
        Task<List<CustomerDto>> GetAllAsync(string? search = null);
        Task<CustomerDetailsDto?> GetByIdAsync(int id);
        Task<CustomerDto> CreateAsync(CreateCustomerDto dto);
        Task<CustomerDto?> UpdateAsync(int id, CreateCustomerDto dto);
    }

    public class CustomerService : ICustomerService
    {
        private readonly ApplicationDbContext _context;

        public CustomerService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<CustomerDto>> GetAllAsync(string? search = null)
        {
            var query = _context.Customers.AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                var s = search.ToLower();
                query = query.Where(c => c.Name.ToLower().Contains(s) || c.Phone.Contains(s));
            }

            return await query.Select(c => new CustomerDto
            {
                Id = c.Id,
                Name = c.Name,
                Phone = c.Phone,
                Email = c.Email,
                Address = c.Address,
                VehicleCount = c.Vehicles.Count(v => !v.IsDeleted)
            }).ToListAsync();
        }

        public async Task<CustomerDetailsDto?> GetByIdAsync(int id)
        {
            var customer = await _context.Customers
                .Include(c => c.Vehicles.Where(v => !v.IsDeleted))
                .FirstOrDefaultAsync(c => c.Id == id);

            if (customer == null) return null;

            var jobOrders = await _context.JobOrders
                .Where(jo => jo.CustomerId == id)
                .OrderByDescending(jo => jo.Date)
                .Select(jo => new JobOrderListDto
                {
                    Number = jo.Number,
                    Date = jo.Date.ToString("dd MMM yyyy"),
                    Customer = jo.Customer.Name,
                    Phone = jo.Customer.Phone,
                    Vehicle = jo.Vehicle.Make + " " + jo.Vehicle.Model,
                    Plate = jo.Vehicle.Plate,
                    Status = jo.Status.ToString(),
                    Type = jo.Type
                }).ToListAsync();

            return new CustomerDetailsDto
            {
                Id = customer.Id,
                Name = customer.Name,
                Phone = customer.Phone,
                Email = customer.Email,
                Address = customer.Address,
                Vehicles = customer.Vehicles.Select(v => new VehicleDto
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
                    LastVisit = v.LastVisit?.ToString("dd MMM yyyy"),
                    CustomerId = v.CustomerId
                }).ToList(),
                JobOrders = jobOrders
            };
        }

        public async Task<CustomerDto> CreateAsync(CreateCustomerDto dto)
        {
            var customer = new Customer
            {
                Name = dto.Name,
                Phone = dto.Phone,
                Email = dto.Email,
                Address = dto.Address
            };

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return new CustomerDto
            {
                Id = customer.Id,
                Name = customer.Name,
                Phone = customer.Phone,
                Email = customer.Email,
                Address = customer.Address,
                VehicleCount = 0
            };
        }

        public async Task<CustomerDto?> UpdateAsync(int id, CreateCustomerDto dto)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null) return null;

            customer.Name = dto.Name;
            customer.Phone = dto.Phone;
            customer.Email = dto.Email;
            customer.Address = dto.Address;

            await _context.SaveChangesAsync();

            return new CustomerDto
            {
                Id = customer.Id,
                Name = customer.Name,
                Phone = customer.Phone,
                Email = customer.Email,
                Address = customer.Address,
                VehicleCount = await _context.Vehicles.CountAsync(v => v.CustomerId == id)
            };
        }
    }
}
