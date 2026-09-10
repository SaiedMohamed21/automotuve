using StarAutoCenter.Models;

namespace StarAutoCenter.Data
{
    public static class SeedData
    {
        public static void Initialize(ApplicationDbContext context)
        {
            // Ensure Business Settings exist
            if (!context.BusinessSettings.Any())
            {
                context.BusinessSettings.Add(new BusinessSettings
                {
                    CompanyName = "Star Auto Center",
                    Address = "123 Industrial Zone, Cairo, Egypt",
                    Phone = "+20 2 1234 5678",
                    Email = "info@starauto.com",
                    Currency = "EGP"
                });
                context.SaveChanges();
            }

            // Seed Parts if fewer than 5 parts
            if (context.Parts.Count() < 5)
            {
                context.Parts.AddRange(
                    new Part
                    {
                        Name = "Brake Pads Front",
                        Number = "BP-TY-001",
                        OEM = "04465-02220",
                        Brand = "Brembo",
                        Category = "Brakes",
                        CompatibleVehicles = "[\"Toyota Camry 2018-2023\", \"Toyota Corolla 2019-2024\"]",
                        CurrentQty = 18,
                        MinQty = 5,
                        Location = "Shelf A-12",
                        Status = Models.Enums.PartStockStatus.InStock
                    },
                    new Part
                    {
                        Name = "Synthetic Engine Oil 5W-30 (4L)",
                        Number = "OIL-5W30-4L",
                        OEM = "08880-83389",
                        Brand = "Mobil 1",
                        Category = "Fluids & Oils",
                        CompatibleVehicles = "[\"Universal / All Gasoline Engines\"]",
                        CurrentQty = 2,
                        MinQty = 5,
                        Location = "Shelf B-04",
                        Status = Models.Enums.PartStockStatus.LowStock
                    },
                    new Part
                    {
                        Name = "Oil Filter - Hyundai / Kia",
                        Number = "OF-HK-002",
                        OEM = "26300-35505",
                        Brand = "Mann-Filter",
                        Category = "Filters",
                        CompatibleVehicles = "[\"Hyundai Elantra 2016-2023\", \"Kia Cerato 2017-2023\"]",
                        CurrentQty = 0,
                        MinQty = 10,
                        Location = "Shelf A-02",
                        Status = Models.Enums.PartStockStatus.OutOfStock
                    },
                    new Part
                    {
                        Name = "Air Filter - Nissan Sunny",
                        Number = "AF-NS-003",
                        OEM = "16546-ED000",
                        Brand = "Bosch",
                        Category = "Filters",
                        CompatibleVehicles = "[\"Nissan Sunny 2012-2024\", \"Nissan Sentra 2014-2022\"]",
                        CurrentQty = 12,
                        MinQty = 4,
                        Location = "Shelf A-05",
                        Status = Models.Enums.PartStockStatus.InStock
                    },
                    new Part
                    {
                        Name = "Iridium Spark Plugs (Set of 4)",
                        Number = "SP-NGK-004",
                        OEM = "90919-01247",
                        Brand = "NGK",
                        Category = "Ignition",
                        CompatibleVehicles = "[\"Toyota RAV4 2019-2024\", \"Honda Civic 2016-2023\"]",
                        CurrentQty = 25,
                        MinQty = 8,
                        Location = "Shelf C-01",
                        Status = Models.Enums.PartStockStatus.InStock
                    },
                    new Part
                    {
                        Name = "Front Shock Absorber Pair",
                        Number = "SA-KYB-005",
                        OEM = "4060A045",
                        Brand = "KYB",
                        Category = "Suspension",
                        CompatibleVehicles = "[\"Mitsubishi Lancer EX 2008-2020\"]",
                        CurrentQty = 1,
                        MinQty = 3,
                        Location = "Shelf D-08",
                        Status = Models.Enums.PartStockStatus.LowStock
                    }
                );
                context.SaveChanges();
            }

            // Seed initial Stock In movements if empty or orphaned
            var validPartIds = context.Parts.Select(p => p.Id).ToHashSet();
            var orphanedMovements = context.StockMovements.Where(m => !validPartIds.Contains(m.PartId)).ToList();
            if (orphanedMovements.Any())
            {
                context.StockMovements.RemoveRange(orphanedMovements);
                context.SaveChanges();
            }

            if (!context.StockMovements.Any())
            {
                var allParts = context.Parts.ToList();
                foreach (var p in allParts)
                {
                    if (p.CurrentQty > 0)
                    {
                        context.StockMovements.Add(new StockMovement
                        {
                            PartId = p.Id,
                            Type = Models.Enums.StockMovementType.StockIn,
                            Reference = p.Number,
                            Note = "Initial Stock Added",
                            Date = DateTime.UtcNow,
                            Qty = p.CurrentQty
                        });
                    }
                }
                context.SaveChanges();
            }
        }
    }
}
