using Microsoft.AspNetCore.Identity;
using StarAutoCenter.Models;
using StarAutoCenter.Models.Auth;
using StarAutoCenter.Models.Enums;

namespace StarAutoCenter.Data
{
    public static class SeedData
    {
        public static void Initialize(ApplicationDbContext context)
        {
            // Ensure Business Settings exist
            var settings = context.BusinessSettings.FirstOrDefault();
            if (settings == null)
            {
                context.BusinessSettings.Add(new BusinessSettings
                {
                    CompanyName = "SOS Motor Works",
                    Address = "شارع شنزو آبي، الحي العاشر، مدينة نصر، القاهرة، بجوار سنتر شبانة",
                    Phone = "+20 100 933 4747",
                    Email = null,
                    Currency = "EGP",
                    LogoUrl = "/uploads/branding/sos_logo.jpeg",
                    UpdatedAt = DateTime.UtcNow,
                    UpdatedBy = "Seed"
                });
                context.SaveChanges();
            }
            else if (settings.CompanyName == "Star Auto Center" && string.IsNullOrEmpty(settings.LogoUrl))
            {
                // Upgrade uncustomized initial default to requested canonical configuration
                settings.CompanyName = "SOS Motor Works";
                settings.Phone = "+20 100 933 4747";
                settings.Address = "شارع شنزو آبي، الحي العاشر، مدينة نصر، القاهرة، بجوار سنتر شبانة";
                settings.LogoUrl = "/uploads/branding/sos_logo.jpeg";
                settings.UpdatedAt = DateTime.UtcNow;
                settings.UpdatedBy = "Seed";
                context.SaveChanges();
            }
        }

        public static async Task SeedUsersAsync(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            // Ensure required roles exist
            string[] roles = { "Engineer", "Warehouse", "Accountant", "Owner" };
            foreach (var role in roles)
            {
                if (!await roleManager.RoleExistsAsync(role))
                {
                    await roleManager.CreateAsync(new IdentityRole(role));
                }
            }

            string defaultPassword = Environment.GetEnvironmentVariable("SEED_DEFAULT_PASSWORD") ?? "12345";
            string ownerPassword = Environment.GetEnvironmentVariable("SEED_OWNER_PASSWORD") ?? defaultPassword;

            var testAccounts = new[]
            {
                new { Email = "saied@owner.com", FullName = "Saied Owner", Phone = "01000000001", Role = UserRole.Owner, Password = ownerPassword },
                new { Email = "saied@accountant.com", FullName = "Saied Accountant", Phone = "01000000002", Role = UserRole.Accountant, Password = defaultPassword },
                new { Email = "saied@warehouse.com", FullName = "Saied Warehouse", Phone = "01000000003", Role = UserRole.Warehouse, Password = defaultPassword },
                new { Email = "saied@engineer.com", FullName = "Saied Engineer", Phone = "01000000004", Role = UserRole.Engineer, Password = defaultPassword }
            };

            foreach (var acc in testAccounts)
            {
                var existing = await userManager.FindByEmailAsync(acc.Email);
                if (existing == null)
                {
                    var user = new ApplicationUser
                    {
                        UserName = acc.Email,
                        Email = acc.Email,
                        FullName = acc.FullName,
                        Phone = acc.Phone,
                        Role = acc.Role,
                        IsActive = true,
                        CreatedAt = DateTime.UtcNow
                    };

                    var createResult = await userManager.CreateAsync(user, acc.Password);
                    if (!createResult.Succeeded)
                    {
                        throw new InvalidOperationException($"Failed to seed user '{acc.Email}': {string.Join(", ", createResult.Errors.Select(e => e.Description))}");
                    }

                    await userManager.AddToRoleAsync(user, acc.Role.ToString());
                }
            }
        }
    }
}
