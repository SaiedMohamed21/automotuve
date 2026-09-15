using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using StarAutoCenter.Data;
using StarAutoCenter.DTOs.Warehouse;
using StarAutoCenter.Models;
using StarAutoCenter.Models.Enums;

namespace StarAutoCenter.Services.Warehouse
{
    public interface IWarehouseService
    {
        // Dashboard
        Task<WarehouseDashboardDto> GetDashboardAsync();

        // Parts
        Task<List<PartDto>> GetAllPartsAsync(string? search = null, string? category = null, string? status = null);
        Task<PartDetailsDto?> GetPartDetailsAsync(int id);
        Task<PartDto> CreatePartAsync(CreatePartDto dto);

        // Jobs & Issue
        Task<List<WarehouseJobDto>> GetOpenJobsAsync(string? search = null, string? status = null);
        Task<List<IssuedPartDto>> GetIssuedPartsAsync(string joNumber);
        Task<List<IssuedPartDto>> IssuePartsAsync(string joNumber, IssuePartRequestDto dto);
        Task<bool> RemoveIssuedPartAsync(string joNumber, int partId);
        Task<bool> ConfirmIssueAsync(string joNumber);
        Task<bool> CompleteJobOrderAsync(string joNumber);

        // Movements
        Task<List<StockMovementDto>> GetMovementsAsync(string? search = null);

        // Stock Count
        Task<bool> UpdateStockCountAsync(List<StockCountEntryDto> entries);
    }

    public class WarehouseService : IWarehouseService
    {
        private readonly ApplicationDbContext _context;

        public WarehouseService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<WarehouseDashboardDto> GetDashboardAsync()
        {
            var parts = await _context.Parts.ToListAsync();
            var lowStock = parts.Where(p => p.Status == PartStockStatus.LowStock).ToList();
            var outOfStock = parts.Where(p => p.Status == PartStockStatus.OutOfStock).ToList();

            var today = DateTime.UtcNow.Date;
            var issuedToday = await _context.StockMovements
                .Where(m => m.Type == StockMovementType.Issue && m.Date.Date == today)
                .SumAsync(m => Math.Abs(m.Qty));

            var stockInRecent = await _context.StockMovements
                .Where(m => m.Type == StockMovementType.StockIn)
                .OrderByDescending(m => m.Date)
                .Take(10)
                .SumAsync(m => m.Qty);

            var openJobs = await _context.JobOrders
                .Include(j => j.Customer)
                .Include(j => j.Vehicle)
                .Where(j => j.Status == JobOrderStatus.Open)
                .OrderByDescending(j => j.Date)
                .Select(j => new WarehouseJobDto
                {
                    Id = j.Id,
                    Number = j.Number,
                    Date = j.Date.ToString("dd MMM yyyy"),
                    Vehicle = j.Vehicle.Make + " " + j.Vehicle.Model,
                    Year = j.Vehicle.Year,
                    Color = j.Vehicle.Color ?? "",
                    Plate = j.Vehicle.Plate,
                    PartsIssued = j.IssuedParts.Sum(ip => ip.Qty),
                    ServiceType = j.Type ?? "Service",
                    Customer = j.Customer.Name,
                    Status = j.Status.ToString()
                }).ToListAsync();

            var movements = await _context.StockMovements
                .Include(m => m.Part)
                .OrderByDescending(m => m.Date)
                .Take(5)
                .Select(m => new StockMovementDto
                {
                    Part = m.Part.Name,
                    Type = m.Type.ToString(),
                    Reference = m.Reference,
                    Note = m.Note,
                    Date = m.Date.ToString("dd MMM yyyy"),
                    Qty = m.Qty
                }).ToListAsync();

            return new WarehouseDashboardDto
            {
                LowStockCount = lowStock.Count,
                OutOfStockCount = outOfStock.Count,
                PartsIssuedToday = issuedToday,
                StockInRecent = stockInRecent,
                OpenJobs = openJobs,
                OutOfStockParts = outOfStock.Select(p => new PartSummaryDto { Id = p.Id, Name = p.Name, Number = p.Number, Brand = p.Brand, CurrentQty = p.CurrentQty, MinQty = p.MinQty }).ToList(),
                LowStockParts = lowStock.Select(p => new PartSummaryDto { Id = p.Id, Name = p.Name, Number = p.Number, Brand = p.Brand, CurrentQty = p.CurrentQty, MinQty = p.MinQty }).ToList(),
                RecentMovements = movements
            };
        }

        public async Task<List<PartDto>> GetAllPartsAsync(string? search = null, string? category = null, string? status = null)
        {
            var query = _context.Parts.AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                var s = search.ToLower();
                query = query.Where(p => p.Name.ToLower().Contains(s) || p.Number.ToLower().Contains(s) || (p.Brand != null && p.Brand.ToLower().Contains(s)));
            }

            if (!string.IsNullOrWhiteSpace(category) && category != "All")
                query = query.Where(p => p.Category == category);

            if (!string.IsNullOrWhiteSpace(status) && status != "Status")
            {
                if (Enum.TryParse<PartStockStatus>(status.Replace(" ", ""), true, out var st))
                    query = query.Where(p => p.Status == st);
            }

            var parts = await query.ToListAsync();
            return parts.Select(p => new PartDto
            {
                Id = p.Id,
                Name = p.Name,
                Number = p.Number,
                OEM = p.OEM,
                Brand = p.Brand,
                Category = p.Category,
                CompatibleVehicles = p.CompatibleVehicles != null ? JsonSerializer.Deserialize<List<string>>(p.CompatibleVehicles) ?? new List<string>() : new List<string>(),
                CurrentQty = p.CurrentQty,
                MinQty = p.MinQty,
                Location = p.Location,
                Status = p.Status.ToString(),
                PurchasePrice = p.PurchasePrice,
                SellingPrice = p.SellingPrice
            }).ToList();
        }

        public async Task<PartDetailsDto?> GetPartDetailsAsync(int id)
        {
            var part = await _context.Parts.FindAsync(id);
            if (part == null) return null;

            var movements = await _context.StockMovements
                .Where(m => m.PartId == id)
                .OrderByDescending(m => m.Date)
                .Select(m => new StockMovementDto
                {
                    Part = part.Name,
                    Type = m.Type.ToString(),
                    Reference = m.Reference,
                    Note = m.Note,
                    Date = m.Date.ToString("dd MMM yyyy"),
                    Qty = m.Qty
                }).ToListAsync();

            return new PartDetailsDto
            {
                Part = new PartDto
                {
                    Id = part.Id,
                    Name = part.Name,
                    Number = part.Number,
                    OEM = part.OEM,
                    Brand = part.Brand,
                    Category = part.Category,
                    CompatibleVehicles = part.CompatibleVehicles != null ? JsonSerializer.Deserialize<List<string>>(part.CompatibleVehicles) ?? new List<string>() : new List<string>(),
                    CurrentQty = part.CurrentQty,
                    MinQty = part.MinQty,
                    Location = part.Location,
                    Status = part.Status.ToString(),
                    PurchasePrice = part.PurchasePrice,
                    SellingPrice = part.SellingPrice
                },
                Movements = movements
            };
        }

        public async Task<PartDto> CreatePartAsync(CreatePartDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Name))
                throw new ArgumentException("Part Name is required.");

            if (dto.CurrentQty < 0)
                throw new ArgumentException("Initial Quantity cannot be negative.");

            // Check duplicate by Part Number if provided
            if (!string.IsNullOrWhiteSpace(dto.Number))
            {
                var trimmedNum = dto.Number.Trim();
                var existingByNum = await _context.Parts.FirstOrDefaultAsync(p => p.Number.ToLower() == trimmedNum.ToLower());
                if (existingByNum != null)
                {
                    throw new InvalidOperationException($"Part Number '{trimmedNum}' already exists for part '{existingByNum.Name}' (ID #{existingByNum.Id}).");
                }
            }

            // Check duplicate by OEM if provided
            if (!string.IsNullOrWhiteSpace(dto.OEM))
            {
                var trimmedOem = dto.OEM.Trim();
                var existingByOem = await _context.Parts.FirstOrDefaultAsync(p => p.OEM != null && p.OEM.ToLower() == trimmedOem.ToLower());
                if (existingByOem != null)
                {
                    throw new InvalidOperationException($"OEM Number '{trimmedOem}' already exists for part '{existingByOem.Name}' (ID #{existingByOem.Id}).");
                }
            }

            var part = new Part
            {
                Name = dto.Name.Trim(),
                Number = string.IsNullOrWhiteSpace(dto.Number) ? $"PN-{DateTime.UtcNow.Ticks}" : dto.Number.Trim(),
                OEM = dto.OEM?.Trim(),
                Brand = dto.Brand?.Trim(),
                Category = string.IsNullOrWhiteSpace(dto.Category) ? "Other" : dto.Category.Trim(),
                CompatibleVehicles = dto.CompatibleVehicles != null ? JsonSerializer.Serialize(dto.CompatibleVehicles) : null,
                CurrentQty = dto.CurrentQty,
                MinQty = dto.MinQty,
                Location = dto.Location,
                PurchasePrice = dto.PurchasePrice,
                SellingPrice = dto.SellingPrice,
                Status = dto.CurrentQty <= 0 ? PartStockStatus.OutOfStock : dto.CurrentQty <= dto.MinQty ? PartStockStatus.LowStock : PartStockStatus.InStock
            };

            _context.Parts.Add(part);
            await _context.SaveChangesAsync();

            if (dto.CurrentQty > 0)
            {
                _context.StockMovements.Add(new StockMovement
                {
                    PartId = part.Id,
                    Type = StockMovementType.StockIn,
                    Reference = part.Number,
                    Note = "Initial Stock / Added Part",
                    Date = DateTime.UtcNow,
                    Qty = dto.CurrentQty
                });
                await _context.SaveChangesAsync();
            }

            return new PartDto
            {
                Id = part.Id,
                Name = part.Name,
                Number = part.Number,
                OEM = part.OEM,
                Brand = part.Brand,
                Category = part.Category,
                CompatibleVehicles = dto.CompatibleVehicles ?? new List<string>(),
                CurrentQty = part.CurrentQty,
                MinQty = part.MinQty,
                Location = part.Location,
                Status = part.Status.ToString(),
                PurchasePrice = part.PurchasePrice,
                SellingPrice = part.SellingPrice
            };
        }

        public async Task<List<WarehouseJobDto>> GetOpenJobsAsync(string? search = null, string? status = null)
        {
            var query = _context.JobOrders
                .Include(j => j.Customer)
                .Include(j => j.Vehicle)
                .Include(j => j.IssuedParts)
                .AsQueryable();

            if (string.IsNullOrWhiteSpace(status))
            {
                query = query.Where(j => j.Status == JobOrderStatus.Open);
            }
            else if (!status.Equals("all", StringComparison.OrdinalIgnoreCase))
            {
                if (Enum.TryParse<JobOrderStatus>(status, true, out var statusEnum))
                {
                    query = query.Where(j => j.Status == statusEnum);
                }
            }

            if (!string.IsNullOrWhiteSpace(search))
            {
                var s = search.ToLower();
                query = query.Where(j =>
                    j.Number.ToLower().Contains(s) ||
                    j.Vehicle.Plate.ToLower().Contains(s) ||
                    (j.Vehicle.Make + " " + j.Vehicle.Model).ToLower().Contains(s) ||
                    j.Customer.Name.ToLower().Contains(s));
            }

            return await query.OrderByDescending(j => j.Date)
                .Select(j => new WarehouseJobDto
                {
                    Id = j.Id,
                    Number = j.Number,
                    Date = j.Date.ToString("dd MMM yyyy"),
                    Vehicle = j.Vehicle.Make + " " + j.Vehicle.Model,
                    Year = j.Vehicle.Year,
                    Color = j.Vehicle.Color ?? "",
                    Plate = j.Vehicle.Plate,
                    PartsIssued = j.IssuedParts.Count,
                    ServiceType = j.Type ?? "Service",
                    Customer = j.Customer.Name,
                    Status = j.Status.ToString()
                }).ToListAsync();
        }

        public async Task<List<IssuedPartDto>> GetIssuedPartsAsync(string joNumber)
        {
            var jo = await _context.JobOrders
                .Include(j => j.IssuedParts)
                    .ThenInclude(ip => ip.Part)
                .FirstOrDefaultAsync(j => j.Number == joNumber);

            if (jo == null) return new List<IssuedPartDto>();

            return jo.IssuedParts.Select(ip => new IssuedPartDto
            {
                PartId = ip.PartId,
                PartName = ip.Part.Name,
                PartNumber = ip.Part.Number,
                Qty = ip.Qty
            }).ToList();
        }

        public async Task<List<IssuedPartDto>> IssuePartsAsync(string joNumber, IssuePartRequestDto dto)
        {
            var jo = await _context.JobOrders
                .Include(j => j.IssuedParts)
                .FirstOrDefaultAsync(j => j.Number == joNumber);

            if (jo == null) throw new InvalidOperationException("Job order not found");

            foreach (var item in dto.Parts)
            {
                var existing = jo.IssuedParts.FirstOrDefault(ip => ip.PartId == item.PartId);
                if (existing != null)
                {
                    existing.Qty += item.Qty;
                }
                else
                {
                    jo.IssuedParts.Add(new IssuedPart
                    {
                        PartId = item.PartId,
                        Qty = item.Qty
                    });
                }
            }

            await _context.SaveChangesAsync();
            return await GetIssuedPartsAsync(joNumber);
        }

        public async Task<bool> RemoveIssuedPartAsync(string joNumber, int partId)
        {
            var issued = await _context.IssuedParts
                .Include(ip => ip.JobOrder)
                .Include(ip => ip.Part)
                .FirstOrDefaultAsync(ip => ip.JobOrder.Number == joNumber && ip.PartId == partId);

            if (issued == null) return false;

            // Check if this part was physically issued to this job order
            var physicalMovements = await _context.StockMovements
                .Where(m => m.Reference == joNumber && m.PartId == partId && m.Type == StockMovementType.Issue)
                .ToListAsync();

            var returnMovements = await _context.StockMovements
                .Where(m => m.Reference == joNumber && m.PartId == partId && m.Type == StockMovementType.StockIn && m.Note != null && m.Note.Contains("Returned"))
                .ToListAsync();

            int netIssued = Math.Max(0, physicalMovements.Sum(m => Math.Abs(m.Qty)) - returnMovements.Sum(m => m.Qty));

            if (netIssued > 0 && issued.Part != null)
            {
                // Return the physically issued quantity back to warehouse stock
                int returnQty = Math.Min(issued.Qty, netIssued);
                issued.Part.CurrentQty += returnQty;
                issued.Part.Status = issued.Part.CurrentQty <= 0 ? PartStockStatus.OutOfStock
                    : issued.Part.CurrentQty <= issued.Part.MinQty ? PartStockStatus.LowStock
                    : PartStockStatus.InStock;

                _context.StockMovements.Add(new StockMovement
                {
                    PartId = partId,
                    Type = StockMovementType.StockIn,
                    Reference = joNumber,
                    Note = $"Returned to stock from {joNumber}",
                    Date = DateTime.UtcNow,
                    Qty = returnQty
                });
            }

            _context.IssuedParts.Remove(issued);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ConfirmIssueAsync(string joNumber)
        {
            var jo = await _context.JobOrders
                .Include(j => j.IssuedParts)
                    .ThenInclude(ip => ip.Part)
                .FirstOrDefaultAsync(j => j.Number == joNumber);

            if (jo == null) return false;

            if (jo.IssuedParts == null || !jo.IssuedParts.Any()) return false;

            // Calculate unissued quantity delta for each part on this job
            var itemsToDeduct = new List<(IssuedPart IssuedPart, int QtyToDeduct)>();

            foreach (var ip in jo.IssuedParts)
            {
                if (ip.Qty <= 0) return false;

                var previouslyIssuedQty = await _context.StockMovements
                    .Where(m => m.Reference == joNumber && m.PartId == ip.PartId && m.Type == StockMovementType.Issue)
                    .SumAsync(m => Math.Abs(m.Qty));

                var previouslyReturnedQty = await _context.StockMovements
                    .Where(m => m.Reference == joNumber && m.PartId == ip.PartId && m.Type == StockMovementType.StockIn && m.Note != null && m.Note.Contains("Returned"))
                    .SumAsync(m => m.Qty);

                int alreadyIssuedNet = Math.Max(0, previouslyIssuedQty - previouslyReturnedQty);
                int unissuedDelta = ip.Qty - alreadyIssuedNet;

                if (unissuedDelta > 0)
                {
                    if (ip.Part.CurrentQty < unissuedDelta) return false; // Insufficient stock
                    itemsToDeduct.Add((ip, unissuedDelta));
                }
            }

            if (!itemsToDeduct.Any())
            {
                // All items already physically confirmed
                return true;
            }

            foreach (var (ip, delta) in itemsToDeduct)
            {
                ip.Part.CurrentQty = Math.Max(0, ip.Part.CurrentQty - delta);
                ip.Part.Status = ip.Part.CurrentQty <= 0 ? PartStockStatus.OutOfStock
                    : ip.Part.CurrentQty <= ip.Part.MinQty ? PartStockStatus.LowStock
                    : PartStockStatus.InStock;

                _context.StockMovements.Add(new StockMovement
                {
                    PartId = ip.PartId,
                    Type = StockMovementType.Issue,
                    Reference = joNumber,
                    Note = $"Issued to {joNumber}",
                    Date = DateTime.UtcNow,
                    Qty = -delta
                });
            }

            // Physical stock issued; Job Order status remains Open for Engineer work
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> CompleteJobOrderAsync(string joNumber)
        {
            var jo = await _context.JobOrders.FirstOrDefaultAsync(j => j.Number == joNumber);
            if (jo == null) return false;

            if (jo.Status != JobOrderStatus.Open)
            {
                return false;
            }

            jo.Status = JobOrderStatus.Complete;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<StockMovementDto>> GetMovementsAsync(string? search = null)
        {
            var query = _context.StockMovements
                .Include(m => m.Part)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                var s = search.ToLower();
                query = query.Where(m =>
                    m.Part.Name.ToLower().Contains(s) ||
                    (m.Reference != null && m.Reference.ToLower().Contains(s)));
            }

            return await query
                .OrderByDescending(m => m.Date)
                .Select(m => new StockMovementDto
                {
                    Part = m.Part != null ? m.Part.Name : (m.Reference ?? "Part"),
                    Type = m.Type.ToString(),
                    Reference = m.Reference,
                    Note = m.Note,
                    Date = m.Date.ToString("dd MMM yyyy"),
                    Qty = m.Qty
                }).ToListAsync();
        }

        public async Task<bool> UpdateStockCountAsync(List<StockCountEntryDto> entries)
        {
            foreach (var entry in entries)
            {
                var part = await _context.Parts.FindAsync(entry.PartId);
                if (part == null || entry.ActualQty <= 0) continue;

                part.CurrentQty += entry.ActualQty;
                part.Status = part.CurrentQty <= 0 ? PartStockStatus.OutOfStock
                    : part.CurrentQty <= part.MinQty ? PartStockStatus.LowStock
                    : PartStockStatus.InStock;

                _context.StockMovements.Add(new StockMovement
                {
                    PartId = part.Id,
                    Type = StockMovementType.StockIn,
                    Reference = part.Number,
                    Note = $"Stock received: +{entry.ActualQty}",
                    Date = DateTime.UtcNow,
                    Qty = entry.ActualQty
                });
            }

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
