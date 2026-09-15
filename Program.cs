using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using StarAutoCenter.Data;
using StarAutoCenter.Middlewares;
using StarAutoCenter.Models.Auth;
using StarAutoCenter.Services.Auth;
using StarAutoCenter.Services.Engineer;
using StarAutoCenter.Services.Owner;
using StarAutoCenter.Services.Warehouse;
using StarAutoCenter.Services.Accountant;
using StarAutoCenter.Services.Payroll;
using StarAutoCenter.Services.Suppliers;
using StarAutoCenter.Services.Expenses;
using StarAutoCenter.Services.Settings;

using StarAutoCenter.Hubs;
using StarAutoCenter.Models.Enums;

var builder = WebApplication.CreateBuilder(args);

// ── Railway Dynamic Port Configuration ──
var port = Environment.GetEnvironmentVariable("PORT");
if (!string.IsNullOrEmpty(port))
{
    builder.WebHost.UseUrls($"http://0.0.0.0:{port}");
}

// ── SignalR Registration ──
builder.Services.AddSignalR();

// ── Database ──
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// ── Identity ──
builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredLength = 4;
})
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();

// ── JWT Authentication ──
var jwtKey = builder.Configuration["Jwt:Key"] ?? "StarAutoCenterSuperSecretKey2026!@#$%^&*()";
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"] ?? "StarAutoCenter",
        ValidAudience = builder.Configuration["Jwt:Audience"] ?? "StarAutoCenter",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
        RoleClaimType = ClaimTypes.Role,
        NameClaimType = ClaimTypes.Name
    };

    // Extract JWT token from query string for SignalR WebSocket connections
    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            var accessToken = context.Request.Query["access_token"];
            var path = context.HttpContext.Request.Path;
            if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/hubs"))
            {
                context.Token = accessToken;
            }
            return Task.CompletedTask;
        }
    };
});

// ── Services Registration ──
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IDashboardService, DashboardService>();
builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddScoped<IVehicleService, VehicleService>();
builder.Services.AddScoped<IJobOrderService, JobOrderService>();
builder.Services.AddScoped<IWarehouseService, WarehouseService>();
builder.Services.AddScoped<IOwnerService, OwnerService>();
builder.Services.AddScoped<IAccountantService, AccountantService>();
builder.Services.AddScoped<IPayrollService, PayrollService>();
builder.Services.AddScoped<ISupplierService, SupplierService>();
builder.Services.AddScoped<IExpenseService, ExpenseService>();
builder.Services.AddScoped<IWorkshopSettingsService, WorkshopSettingsService>();

// ── CORS ──
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        var originsStr = builder.Configuration["Cors:Origins"];
        var configuredOrigins = !string.IsNullOrWhiteSpace(originsStr)
            ? originsStr.Split(new[] { ',', ';' }, StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            : builder.Configuration.GetSection("Cors:Origins").Get<string[]>();

        if (configuredOrigins != null && configuredOrigins.Length > 0)
        {
            policy.WithOrigins(configuredOrigins)
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .AllowCredentials();
        }
        else
        {
            policy.SetIsOriginAllowed(_ => true)
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .AllowCredentials();
        }
    });
});

// ── Controllers & Swagger ──
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "SOS Motor Works API",
        Version = "v1",
        Description = "Backend API for SOS Motor Works — Workshop Management System"
    });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Enter 'Bearer' [space] and then your token.",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
            },
            Array.Empty<string>()
        }
    });
});

var app = builder.Build();

// ── Middleware Pipeline ──
app.UseMiddleware<ExceptionHandlingMiddleware>();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "SOS Motor Works API v1");
    c.RoutePrefix = "swagger";
});

app.UseCors("AllowFrontend");

// Serve SPA static files from wwwroot with CORS headers
var staticFileOptions = new StaticFileOptions
{
    OnPrepareResponse = ctx =>
    {
        ctx.Context.Response.Headers["Access-Control-Allow-Origin"] = "*";
    }
};

app.UseDefaultFiles();
app.UseStaticFiles(staticFileOptions);

// Serve external uploads directory if located outside wwwroot
var externalUploadsPath = Path.Combine(app.Environment.ContentRootPath, "uploads");
var wwwrootUploadsPath = Path.Combine(app.Environment.WebRootPath ?? Path.Combine(app.Environment.ContentRootPath, "wwwroot"), "uploads");

if (Directory.Exists(externalUploadsPath) && !string.Equals(externalUploadsPath, wwwrootUploadsPath, StringComparison.OrdinalIgnoreCase))
{
    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(externalUploadsPath),
        RequestPath = "/uploads",
        OnPrepareResponse = ctx =>
        {
            ctx.Context.Response.Headers["Access-Control-Allow-Origin"] = "*";
        }
    });
}

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapHub<DataSyncHub>("/hubs/sync");

// ── Unauthenticated Health Endpoint ──
app.MapGet("/api/health", () => Results.Ok(new { status = "ok" }));

app.MapGet("/api", () => Results.Json(new
{
    status = "Online",
    service = "SOS Motor Works Workshop API",
    swagger = "/swagger",
    health = "/api/health",
    endpoints = new[]
    {
        "/api/health",
        "/api/customers",
        "/api/vehicles",
        "/api/joborders",
        "/api/parts",
        "/api/invoices",
        "/api/additionalexpenses"
    }
}));

// SPA Fallback for client-side React routes
app.MapFallbackToFile("index.html");

// ── Seed Database ──
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<ApplicationDbContext>();
        context.Database.Migrate();

        var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
        var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();

        // Seed data & accounts
        SeedData.Initialize(context);
        await SeedData.SeedUsersAsync(userManager, roleManager);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while seeding the database");
    }
}

app.Run();
