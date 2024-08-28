using Asp.Versioning;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using Serilog.Events;
using SoftKiwiFlorist.Areas.Account.Services.Interfaces;
using SoftKiwiFlorist.Areas.Account.Services;
using SoftKiwiFlorist.Repositories.Interfaces;
using SoftKiwiFlorist.Areas.Admin.Services.Interfaces;
using SoftKiwiFlorist.Repositories;
using SoftKiwiFlorist.Areas.Admin.Services;
using SoftKiwiFlorist.Areas.Customer.Services.Interfaces;
using SoftKiwiFlorist.Areas.Customer.Services;
using SoftKiwiFlorist.Services.Interfaces;
using SoftKiwiFlorist.Services;
using SoftKiwiFlorist.Services.External.Interfaces;
using SoftKiwiFlorist.Mappings;
using SoftKiwiFlorist.Models.Entities;
using SoftKiwiFlorist.Models.Services;
using SoftKiwiFlorist.Services.External;
using SoftKiwiFlorist.Repositories.Base;
using SoftKiwiFlorist.Repositories.Base.Interfaces;
using SoftKiwiFlorist.Areas.Admin.Validators;
using SoftKiwiFlorist.Areas.Account.Validators;
using SoftKiwiFlorist.Areas.Customer.Validators;

var builder = WebApplication.CreateBuilder(args);

// CORS configuration 
builder.Services.AddCors(policy => policy.AddDefaultPolicy(options =>
{
    options
        .WithOrigins(builder.Configuration["AppSettings:ClientURL"]?.ToString()!)
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
}));

// API version configuration
builder.Services.AddApiVersioning(options =>
{
    options.ReportApiVersions = true;
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.DefaultApiVersion = new ApiVersion(1, 0);
    options.ApiVersionReader = ApiVersionReader.Combine(
        new QueryStringApiVersionReader("v"),
        new HeaderApiVersionReader("x-api-version")
    );
});

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

// -- Mapper Service
builder.Services.AddAutoMapper(
    typeof(BannerMapper), 
    typeof(CategoryMapper),
    typeof(CartItemMapper),
    typeof(FeedbackMapper),
    typeof(NewsMapper),
    typeof(OrderMapper),
    typeof(OrderDetailMapper),
    typeof(OrderStatusHistoryMapper),
    typeof(ProductMapper),
    typeof(PromotionMapper),
    typeof(ShoppingSessionMapper),
    typeof(UserMapper)
);

// -- App Repositores
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IBannerRepository, BannerRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<ICartItemRepository, CartItemRepository>();
builder.Services.AddScoped<IFeedbackRepository, FeedbackRepository>();
builder.Services.AddScoped<INewsRepository, NewsRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IOrderDetailRepository, OrderDetailRepository>();
builder.Services.AddScoped<IOrderStatusHistoryRepository, OrderStatusHistoryRepository>();
builder.Services.AddScoped<IPaymentTransactionRepository, PaymentTransactionRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IPromotionRepository, PromotionRepository>();
builder.Services.AddScoped<IPromotionProductRepository, PromotionProductRepository>();
builder.Services.AddScoped<ISessionStatusRepository, SessionStatusRepository>();

builder.Services.AddScoped<IOrderStatusRepository, OrderStatusRepository>();
builder.Services.AddScoped<IPaymentMethodRepository, PaymentMethodRepository>();
builder.Services.AddScoped<IPaymentStatusRepository, PaymentStatusRepository>();
builder.Services.AddScoped<IShoppingSessionRepository, ShoppingSessionRepository>();

// -- App Services
builder.Services.AddScoped<IBannerService, BannerService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<ICartItemService, CartItemService>();
builder.Services.AddScoped<IFeedbackService, FeedbackService>();
builder.Services.AddScoped<INewsService, NewsService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IPromotionService, PromotionService>();
builder.Services.AddScoped<IShoppingSessionService, ShoppingSessionService>();

builder.Services.AddScoped<IOrderStatusService, OrderStatusService>();
builder.Services.AddScoped<IPaymentMethodService, PaymentMethodService>();
builder.Services.AddScoped<IPaymentStatusService, PaymentStatusService>();
builder.Services.AddScoped<ISessionStatusService, SessionStatusService>();

builder.Services.AddScoped<IDashboardService, DashboardService>();
builder.Services.AddScoped<IAdminBannerService, AdminBannerService>();
builder.Services.AddScoped<IAdminCategoryService, AdminCategoryService>();
builder.Services.AddScoped<IAdminFeedbackService, AdminFeedbackService>();
builder.Services.AddScoped<IAdminNewsService, AdminNewsService>();
builder.Services.AddScoped<IAdminOrderService, AdminOrderService>();
builder.Services.AddScoped<IAdminOrderStatusHistoryService, AdminOrderStatusHistoryService>();
builder.Services.AddScoped<IAdminProductService, AdminProductService>();
builder.Services.AddScoped<IAdminPromotionService, AdminPromotionService>();
builder.Services.AddScoped<IAdminUserService, AdminUserService>();

builder.Services.AddScoped<ICustomerCartItemService, CustomerCartItemService>();
builder.Services.AddScoped<ICustomerFeedbackService, CustomerFeedbackService>();
builder.Services.AddScoped<ICustomerOrderService, CustomerOrderService>();
builder.Services.AddScoped<ICustomerOrderDetailService, CustomerOrderDetailService>();
builder.Services.AddScoped<ICustomerOrderStatusHistoryService, CustomerOrderStatusHistoryService>();
builder.Services.AddScoped<ICustomerShoppingSessionService, CustomerShoppingSessionService>();

builder.Services.AddHttpContextAccessor(); 
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IUserService, UserService>();

// -- File Storage Service
builder.Services.AddScoped<IFileStorageService, FileStorageService>();
builder.Services.AddScoped<IImageProcessingService, ImageProcessingService>();

// -- Mail Sending Service
builder.Services.Configure<MailSettings>(builder.Configuration.GetSection("MailSettings"));
builder.Services.AddScoped<IMailSendingService, MailSendingService>();

// -- Fluent Validaton Service
builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<AdminBannerDTOValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<AdminCategoryDTOValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<AdminNewsDTOValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<AdminOrderDTOValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<AdminOrderStatusHistoryDTOValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<AdminProductDTOValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<AdminPromotionDTOValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<ProfileChangingDTOValidator>();

builder.Services.AddValidatorsFromAssemblyContaining<CustomerCartItemDTOValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<CustomerFeedbackDTOValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<CustomerOrderDetailDTOValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<CustomerOrderStatusHistoryDTOValidator>();

builder.Services.AddValidatorsFromAssemblyContaining<RegistraterModelValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<LoginModelValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<ProfileDTOValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<EmailChangingDTOValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<PasswordChangingDTOValidator>();

// -- IdentityDbContext and DbContext
builder.Services.AddDbContext<AppDbContext>(options => 
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default"));
});
builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();
builder.Services.Configure<IdentityOptions>(options => 
{
    // Setting lockout account
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(10);
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.Lockout.AllowedForNewUsers = true;

    // Setting for SignIn
    options.SignIn.RequireConfirmedEmail = true;
    options.SignIn.RequireConfirmedPhoneNumber = false;
    options.SignIn.RequireConfirmedAccount = true;
});
// -- Facebook and Google SignIn
builder.Services.AddAuthentication(options => 
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(option =>
    {
        var rsaEncryption = new RSAEncryptionService();
        rsaEncryption.CreateKeyPair();
        var publicKey = rsaEncryption.ReadPublicKey();
        var rsaSecurity = new RsaSecurityKey(publicKey);

        option.SaveToken = true;
        option.RequireHttpsMetadata = false;
        option.TokenValidationParameters = new TokenValidationParameters()
        {
            // This application generate tokens itself
            ValidateActor = false,
            ValidateIssuer = false,
            ValidateAudience = false,
            // Sign the token
            RequireExpirationTime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = rsaSecurity,
            ClockSkew = TimeSpan.Zero,
            // Turn on validate lifetime
            ValidateLifetime = true,
        };
    })
    .AddFacebook(options => 
    {
        var facebookAuth = builder.Configuration.GetSection("Authentication:Facebook");
        options.AppId = facebookAuth["AppId"] ?? "";
        options.AppSecret = facebookAuth["AppSecret"] ?? "";
    })
    .AddGoogle(options => 
    {
        var googleAuth = builder.Configuration.GetSection("Authentication:Google");
        options.ClientId = googleAuth["ClientId"] ?? "";
        options.ClientSecret = googleAuth["ClientSecret"] ?? "";
    });

// Logger customizations
Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Information()
    .MinimumLevel.Override("SoftKiwiFlorist", LogEventLevel.Information)
    .MinimumLevel.Warning()
    .MinimumLevel.Override("SoftKiwiFlorist", LogEventLevel.Warning)
    .MinimumLevel.Error()
    .MinimumLevel.Override("SoftKiwiFlorist", LogEventLevel.Error)
    .WriteTo.Console()
    .WriteTo.File(
        path: "log/log-.txt",
        rollingInterval: RollingInterval.Day,
        outputTemplate: "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{Level}] {Message}{NewLine}{Exception}",
        retainedFileCountLimit: 7
    )
    .CreateLogger();
builder.Host.UseSerilog();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.MapAreaControllerRoute(
    name: "default",
    areaName: "Customer",
    pattern: "{controller}/{action}/{id?}");

app.MapAreaControllerRoute(
    name: "default",
    areaName: "Admin",
    pattern: "{controller}/{action}/{id?}");

app.MapAreaControllerRoute(
    name: "default",
    areaName: "Account",
    pattern: "{controller}/{action}/{id?}");

app.Run();
