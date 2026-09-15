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
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<AdditionalExpense> AdditionalExpenses { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Technician> Technicians { get; set; }
        public DbSet<AttendanceRecord> AttendanceRecords { get; set; }
        public DbSet<PayrollTransaction> PayrollTransactions { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<SupplierPurchase> SupplierPurchases { get; set; }
        public DbSet<SupplierPurchaseItem> SupplierPurchaseItems { get; set; }
        public DbSet<SupplierPayment> SupplierPayments { get; set; }
        public DbSet<SupplierAccountTransaction> SupplierAccountTransactions { get; set; }
        public DbSet<Expense> Expenses { get; set; }
        public DbSet<JobOrderLaborItem> JobOrderLaborItems { get; set; }
        public DbSet<InvoiceLaborItem> InvoiceLaborItems { get; set; }

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

            // Invoice - unique number index
            builder.Entity<Invoice>()
                .HasIndex(i => i.InvoiceNumber)
                .IsUnique();

            // SupplierPurchase - unique purchase number index
            builder.Entity<SupplierPurchase>()
                .HasIndex(p => p.PurchaseNumber)
                .IsUnique();

            // SupplierPayment - unique payment number index
            builder.Entity<SupplierPayment>()
                .HasIndex(p => p.PaymentNumber)
                .IsUnique();

            // Expense - unique number index, date index, and category index
            builder.Entity<Expense>()
                .HasIndex(e => e.ExpenseNumber)
                .IsUnique();

            builder.Entity<Expense>()
                .HasIndex(e => e.ExpenseDate);

            builder.Entity<Expense>()
                .HasIndex(e => e.Category);

            // Soft delete query filters
            builder.Entity<Customer>()
                .HasQueryFilter(c => !c.IsDeleted);

            builder.Entity<Vehicle>()
                .HasQueryFilter(v => !v.IsDeleted);

            builder.Entity<Technician>()
                .HasQueryFilter(t => !t.IsDeleted);

            builder.Entity<Supplier>()
                .HasQueryFilter(s => !s.IsDeleted);

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

            // Invoice - JobOrder (one-to-one)
            builder.Entity<Invoice>()
                .HasOne(i => i.JobOrder)
                .WithOne(j => j.Invoice)
                .HasForeignKey<Invoice>(i => i.JobOrderId)
                .OnDelete(DeleteBehavior.Restrict);

            // AdditionalExpense - JobOrder
            builder.Entity<AdditionalExpense>()
                .HasOne(e => e.JobOrder)
                .WithMany(j => j.AdditionalExpenses)
                .HasForeignKey(e => e.JobOrderId)
                .OnDelete(DeleteBehavior.Cascade);

            // JobOrderLaborItem - JobOrder
            builder.Entity<JobOrderLaborItem>()
                .HasOne(li => li.JobOrder)
                .WithMany(j => j.LaborItems)
                .HasForeignKey(li => li.JobOrderId)
                .OnDelete(DeleteBehavior.Cascade);

            // InvoiceLaborItem - Invoice
            builder.Entity<InvoiceLaborItem>()
                .HasOne(li => li.Invoice)
                .WithMany(i => i.LaborItems)
                .HasForeignKey(li => li.InvoiceId)
                .OnDelete(DeleteBehavior.Cascade);

            // Payment - Invoice
            builder.Entity<Payment>()
                .HasOne(p => p.Invoice)
                .WithMany(i => i.Payments)
                .HasForeignKey(p => p.InvoiceId)
                .OnDelete(DeleteBehavior.Cascade);

            // Technician - AttendanceRecord
            builder.Entity<AttendanceRecord>()
                .HasOne(a => a.Technician)
                .WithMany(t => t.AttendanceRecords)
                .HasForeignKey(a => a.TechnicianId)
                .OnDelete(DeleteBehavior.Cascade);

            // AttendanceRecord unique index (TechnicianId + Date)
            builder.Entity<AttendanceRecord>()
                .HasIndex(a => new { a.TechnicianId, a.Date })
                .IsUnique();

            // Technician - PayrollTransaction
            builder.Entity<PayrollTransaction>()
                .HasOne(p => p.Technician)
                .WithMany(t => t.PayrollTransactions)
                .HasForeignKey(p => p.TechnicianId)
                .OnDelete(DeleteBehavior.Cascade);

            // Supplier - SupplierPurchase
            builder.Entity<SupplierPurchase>()
                .HasOne(p => p.Supplier)
                .WithMany(s => s.Purchases)
                .HasForeignKey(p => p.SupplierId)
                .OnDelete(DeleteBehavior.Restrict);

            // SupplierPurchase - SupplierPurchaseItem
            builder.Entity<SupplierPurchaseItem>()
                .HasOne(pi => pi.Purchase)
                .WithMany(p => p.Items)
                .HasForeignKey(pi => pi.PurchaseId)
                .OnDelete(DeleteBehavior.Cascade);

            // SupplierPurchaseItem - Part
            builder.Entity<SupplierPurchaseItem>()
                .HasOne(pi => pi.Part)
                .WithMany()
                .HasForeignKey(pi => pi.PartId)
                .OnDelete(DeleteBehavior.Restrict);

            // Supplier - SupplierPayment
            builder.Entity<SupplierPayment>()
                .HasOne(p => p.Supplier)
                .WithMany(s => s.Payments)
                .HasForeignKey(p => p.SupplierId)
                .OnDelete(DeleteBehavior.Restrict);

            // SupplierPurchase - SupplierPayment
            builder.Entity<SupplierPayment>()
                .HasOne(p => p.Purchase)
                .WithMany(p => p.Payments)
                .HasForeignKey(p => p.PurchaseId)
                .OnDelete(DeleteBehavior.Restrict);

            // Supplier - SupplierAccountTransaction
            builder.Entity<SupplierAccountTransaction>()
                .HasOne(t => t.Supplier)
                .WithMany(s => s.Transactions)
                .HasForeignKey(t => t.SupplierId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

