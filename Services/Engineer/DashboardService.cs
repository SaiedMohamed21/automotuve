using Microsoft.EntityFrameworkCore;
using StarAutoCenter.Data;
using StarAutoCenter.DTOs.Engineer;
using StarAutoCenter.Models.Enums;

namespace StarAutoCenter.Services.Engineer
{
    public interface IDashboardService
    {
        Task<DashboardDto> GetDashboardAsync();
    }

    public class DashboardService : IDashboardService
    {
        private readonly ApplicationDbContext _context;

        public DashboardService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<DashboardDto> GetDashboardAsync()
        {
            var today = DateTime.UtcNow.Date;

            var todayJobs = await _context.JobOrders
                .CountAsync(j => j.Date.Date == today);

            var openJobs = await _context.JobOrders
                .CountAsync(j => j.Status == JobOrderStatus.Open);

            var completedToday = await _context.JobOrders
                .CountAsync(j => j.Status == JobOrderStatus.Completed && j.Date.Date == today);

            var recentJobOrders = await _context.JobOrders
                .Include(j => j.Customer)
                .Include(j => j.Vehicle)
                .OrderByDescending(j => j.Date)
                .Take(8)
                .Select(j => new JobOrderListDto
                {
                    Number = j.Number,
                    Date = j.Date.ToString("dd MMM yyyy"),
                    Customer = j.Customer.Name,
                    Phone = j.Customer.Phone,
                    Vehicle = j.Vehicle.Make + " " + j.Vehicle.Model,
                    Plate = j.Vehicle.Plate,
                    Status = j.Status.ToString(),
                    Type = j.Type
                }).ToListAsync();

            var recentVehicles = await _context.Vehicles
                .Include(v => v.Customer)
                .OrderByDescending(v => v.LastVisit)
                .Take(4)
                .Select(v => new RecentVehicleDto
                {
                    Name = v.Make + " " + v.Model,
                    Plate = v.Plate,
                    Owner = v.Customer.Name,
                    Date = v.LastVisit.HasValue ? v.LastVisit.Value.ToString("dd MMM yyyy") : ""
                }).ToListAsync();

            return new DashboardDto
            {
                TodayJobs = todayJobs,
                OpenJobs = openJobs,
                CompletedToday = completedToday,
                RecentJobOrders = recentJobOrders,
                RecentVehicles = recentVehicles
            };
        }
    }
}
