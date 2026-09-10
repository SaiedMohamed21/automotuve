using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using StarAutoCenter.Models;
using StarAutoCenter.Models.Auth;

namespace StarAutoCenter.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<JobOrder> JobOrders { get; set; }
        public DbSet<JobOrderWorkItem> JobOrderWorkItems { get; set; }
        public DbSet<DeferredWork> DeferredWorks { get; set; }
        public DbSet<ServiceHistory> ServiceHistories { get; set; }
        public DbSet<Part> Parts { get; set; }
        public DbSet<IssuedPart> IssuedParts { get; set; }
        public DbSet<StockMovement> StockMovements { get; set; }
        public DbSet<BusinessSettings> BusinessSettings { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Job Order - unique number index
            builder.Entity<JobOrder>()
                .HasIndex(j => j.Number)
                .IsUnique();

            // Vehicle - plate index
            builder.Entity<Vehicle>()
                .HasIndex(v => v.Plate);

            // Part - part number index
            builder.Entity<Part>()
                .HasIndex(p => p.Number)
                .IsUnique();

            // Customer - phone index
            builder.Entity<Customer>()
                .HasIndex(c => c.Phone);

            // Soft delete query filters
            builder.Entity<Customer>()
                .HasQueryFilter(c => !c.IsDeleted);

            builder.Entity<Vehicle>()
                .HasQueryFilter(v => !v.IsDeleted);

            // Relationships
            builder.Entity<Vehicle>()
                .HasOne(v => v.Customer)
                .WithMany(c => c.Vehicles)
                .HasForeignKey(v => v.CustomerId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<JobOrder>()
                .HasOne(j => j.Customer)
                .WithMany(c => c.JobOrders)
                .HasForeignKey(j => j.CustomerId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<JobOrder>()
                .HasOne(j => j.Vehicle)
                .WithMany(v => v.JobOrders)
                .HasForeignKey(j => j.VehicleId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<IssuedPart>()
                .HasOne(ip => ip.JobOrder)
                .WithMany(j => j.IssuedParts)
                .HasForeignKey(ip => ip.JobOrderId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<IssuedPart>()
                .HasOne(ip => ip.Part)
                .WithMany(p => p.IssuedParts)
                .HasForeignKey(ip => ip.PartId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
