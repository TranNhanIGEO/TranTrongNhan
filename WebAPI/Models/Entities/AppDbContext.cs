using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace SoftKiwiFlorist.Models.Entities;

public partial class AppDbContext : IdentityDbContext<User>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public virtual DbSet<Banner> Banners { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<CartItem> CartItems { get; set; }

    public virtual DbSet<Feedback> Feedbacks { get; set; }

    public virtual DbSet<News> News { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderDetail> OrderDetails { get; set; }

    public virtual DbSet<OrderStatus> OrderStatuses { get; set; }

    public virtual DbSet<OrderStatusHistory> OrderStatusHistories { get; set; }

    public virtual DbSet<PaymentMethod> PaymentMethods { get; set; }

    public virtual DbSet<PaymentStatus> PaymentStatuses { get; set; }

    public virtual DbSet<SessionStatus> SessionStatuses { get; set; }

    public virtual DbSet<PaymentTransaction> PaymentTransactions { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<Promotion> Promotions { get; set; }

    public virtual DbSet<PromotionProduct> PromotionProducts { get; set; }
    
    public virtual DbSet<ShoppingSession> ShoppingSessions { get; set; }

    // public virtual DbSet<Product> Users { get; set; }
    
    // public virtual DbSet<Product> Roles { get; set; }
    
    // public virtual DbSet<Product> UserRoles { get; set; }
    
    // public virtual DbSet<Product> UserLogins { get; set; }
    
    // public virtual DbSet<Product> UserTokens { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);

        #region Lazy Loading
        optionsBuilder.UseLazyLoadingProxies();
        #endregion
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        #region Db Context
        modelBuilder.Entity<Banner>(entity =>
        {
            entity.HasKey(e => e.Id);
            
            entity.Property(e => e.Image).IsRequired().HasMaxLength(256);
            entity.Property(e => e.CreatedAt).IsRequired().HasColumnType("datetime");
            entity.Property(e => e.UpdatedAt).IsRequired().HasColumnType("datetime");
            entity.Property(e => e.NormalizedTerm).IsRequired().HasMaxLength(256);

            entity.HasOne(d => d.Category).WithMany(p => p.Banners).HasForeignKey(d => d.CategoryId).HasConstraintName("FK_Banners_Categories").OnDelete(DeleteBehavior.Restrict);            
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Id);
            
            entity.Property(e => e.Name).IsRequired().HasMaxLength(25);
            entity.Property(e => e.Image).IsRequired().HasMaxLength(256);
            entity.Property(e => e.CreatedAt).IsRequired().HasColumnType("datetime");
            entity.Property(e => e.UpdatedAt).IsRequired().HasColumnType("datetime");
            entity.Property(e => e.NormalizedTerm).IsRequired().HasMaxLength(256);

            entity.HasMany(d => d.Banners).WithOne(p => p.Category).HasForeignKey(p => p.CategoryId).OnDelete(DeleteBehavior.Restrict);
            entity.HasMany(d => d.News).WithOne(p => p.Category).HasForeignKey(p => p.CategoryId).OnDelete(DeleteBehavior.Restrict);
            entity.HasMany(d => d.Products).WithOne(p => p.Category).HasForeignKey(p => p.CategoryId).OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<CartItem>(entity =>
        {
            entity.HasKey(e => e.Id);
            
            entity.Property(e => e.SessionId).IsRequired();
            entity.Property(e => e.ProductId).IsRequired();
            entity.Property(e => e.Quantity).IsRequired();

            entity.HasOne(d => d.Product).WithMany(p => p.CartItems).HasForeignKey(d => d.ProductId).HasConstraintName("FK_CartItems_Products").OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(d => d.ShoppingSession).WithMany(p => p.CartItems).HasForeignKey(d => d.SessionId).HasConstraintName("FK_CartItems_Users").OnDelete(DeleteBehavior.Restrict);            
        });

        modelBuilder.Entity<ShoppingSession>(entity =>
        {
            entity.HasKey(e => e.Id);
            
            entity.Property(e => e.SessionStatusId).IsRequired();
            entity.Property(e => e.CreatedAt).IsRequired().HasColumnType("datetime");
            entity.Property(e => e.UpdatedAt).IsRequired().HasColumnType("datetime");

            entity.HasOne(d => d.User).WithMany(p => p.ShoppingSessions).HasForeignKey(d => d.UserId).HasConstraintName("FK_ShoppingSessions_Users").OnDelete(DeleteBehavior.Restrict);            
            entity.HasOne(d => d.SessionStatus).WithMany(p => p.ShoppingSessions).HasForeignKey(d => d.SessionStatusId).HasConstraintName("FK_ShoppingSessions_SessionStatuses").OnDelete(DeleteBehavior.Restrict);            

            entity.HasMany(d => d.Orders).WithOne(p => p.ShoppingSession).HasForeignKey(d => d.SessionId).HasConstraintName("FK_ShoppingSessions_Orders").OnDelete(DeleteBehavior.Restrict);
            entity.HasMany(d => d.PaymentTransactions).WithOne(p => p.ShoppingSession).HasForeignKey(d => d.SessionId).HasConstraintName("FK_ShoppingSessions_PaymentTransactions").OnDelete(DeleteBehavior.Restrict);
            entity.HasMany(d => d.CartItems).WithOne(p => p.ShoppingSession).HasForeignKey(d => d.SessionId).HasConstraintName("FK_ShoppingSessions_CartItems").OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<Feedback>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.UserId).IsRequired();
            entity.Property(e => e.ProductId).IsRequired();
            
            entity.Property(e => e.Vote).IsRequired();
            entity.Property(c => c.FullName).HasMaxLength(256);
            entity.Property(c => c.Email).HasMaxLength(256);
            entity.Property(e => e.Comment).IsRequired().HasMaxLength(150);
            entity.Property(e => e.Image).HasDefaultValue(null).HasMaxLength(256);
            entity.Property(e => e.CreatedAt).IsRequired().HasColumnType("datetime");
            entity.Property(e => e.UpdatedAt).IsRequired().HasColumnType("datetime");
            entity.Property(e => e.NormalizedTerm).IsRequired().HasMaxLength(256);

            entity.HasOne(d => d.Product).WithMany(p => p.Feedbacks).HasForeignKey(d => d.ProductId).HasConstraintName("FK_Feedbacks_Products").OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(d => d.User).WithMany(p => p.Feedbacks).HasForeignKey(d => d.UserId).HasConstraintName("FK_Feedbacks_Users").OnDelete(DeleteBehavior.Restrict);            
        });

        modelBuilder.Entity<News>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Title).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Summary).IsRequired().HasMaxLength(256);
            entity.Property(e => e.Content).IsRequired().HasColumnType("nvarchar(max)");
            entity.Property(e => e.Image).IsRequired().HasMaxLength(256);
            entity.Property(e => e.CreatedAt).IsRequired().HasColumnType("datetime");
            entity.Property(e => e.UpdatedAt).IsRequired().HasColumnType("datetime");
            entity.Property(e => e.NormalizedTerm).IsRequired().HasColumnType("nvarchar(max)");

            entity.HasOne(d => d.Category).WithMany(p => p.News).HasForeignKey(d => d.CategoryId).HasConstraintName("FK_News_Categories").OnDelete(DeleteBehavior.Restrict);        
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.OrderStatusId).IsRequired();
            entity.Property(e => e.SessionId).IsRequired();
            
            entity.Property(e => e.ReceiverName).IsRequired().HasMaxLength(256);
            entity.Property(e => e.ReceiverAddress).IsRequired().HasMaxLength(256);
            entity.Property(e => e.PhoneNumber).IsRequired().HasMaxLength(12);
            entity.Property(e => e.Quantity).IsRequired();
            entity.Property(e => e.TotalAmount).IsRequired().HasColumnType("decimal(18, 3)");
            entity.Property(e => e.Note).HasDefaultValue(null);
            entity.Property(e => e.OrderAt).IsRequired().HasColumnType("datetime");
            entity.Property(e => e.NormalizedTerm).IsRequired().HasColumnType("nvarchar(500)");

            entity.HasOne(d => d.User).WithMany(p => p.Orders).HasForeignKey(d => d.UserId).HasConstraintName("FK_Orders_Users").OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(d => d.ShoppingSession).WithMany(p => p.Orders).HasForeignKey(d => d.SessionId).HasConstraintName("FK_Orders_ShoppingSessions").OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(d => d.OrderStatus).WithMany(p => p.Orders).HasForeignKey(d => d.OrderStatusId).HasConstraintName("FK_Orders_OrderStatuses").OnDelete(DeleteBehavior.Restrict);
            
            entity.HasMany(d => d.OrderDetails).WithOne(p => p.Order).HasForeignKey(p => p.OrderId).OnDelete(DeleteBehavior.Restrict);
            entity.HasMany(d => d.OrderStatusHistories).WithOne(p => p.Order).HasForeignKey(p => p.OrderId).OnDelete(DeleteBehavior.Restrict);  
            entity.HasMany(d => d.PaymentTransactions).WithOne(p => p.Order).HasForeignKey(p => p.OrderId).OnDelete(DeleteBehavior.Restrict);     
        });

        modelBuilder.Entity<OrderDetail>(entity =>
        {
            entity.HasKey(e => e.Id);
            
            entity.Property(e => e.Quantity).IsRequired();
            entity.Property(e => e.Discount).HasDefaultValue(null).HasColumnType("decimal(18, 3)");
            entity.Property(e => e.DiscountPercentage).HasDefaultValue(null).HasColumnType("decimal(18, 3)");
            entity.Property(e => e.UnitPrice).IsRequired().HasColumnType("decimal(18, 3)");
            entity.Property(e => e.TotalPrice).IsRequired().HasColumnType("decimal(18, 3)");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderDetails).HasForeignKey(d => d.OrderId).HasConstraintName("FK_OrderDetails_Orders").OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(d => d.Product).WithMany(p => p.OrderDetails).HasForeignKey(d => d.ProductId).HasConstraintName("FK_OrderDetails_Products").OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<OrderStatusHistory>(entity =>
        {
            entity.HasKey(e => e.Id);
            
            entity.Property(e => e.UpdatedAt).IsRequired().HasColumnType("datetime");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderStatusHistories).HasForeignKey(d => d.OrderId).HasConstraintName("FK_OrderStatusHistories_Orders").OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(d => d.OrderStatus).WithMany(p => p.OrderStatusHistories).HasForeignKey(d => d.OrderStatusId).HasConstraintName("FK_OrderStatusHistories_OrderStatuses").OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.CategoryId).IsRequired();
            
            entity.Property(e => e.Name).IsRequired().HasMaxLength(25);
            entity.Property(e => e.Description).IsRequired().HasMaxLength(256);
            entity.Property(e => e.Image).IsRequired().HasMaxLength(256);
            entity.Property(e => e.Price).IsRequired().HasColumnType("decimal(18, 3)");
            entity.Property(e => e.Sold).HasDefaultValue(null);
            entity.Property(e => e.Viewed).HasDefaultValue(null);
            entity.Property(e => e.CreatedAt).IsRequired().HasColumnType("datetime");
            entity.Property(e => e.UpdatedAt).IsRequired().HasColumnType("datetime");
            entity.Property(e => e.NormalizedTerm).IsRequired().HasMaxLength(500);

            entity.HasOne(d => d.Category).WithMany(p => p.Products).HasForeignKey(d => d.CategoryId).HasConstraintName("FK_Products_Categories").OnDelete(DeleteBehavior.Restrict);
            
            entity.HasMany(d => d.CartItems).WithOne(p => p.Product).HasForeignKey(p => p.ProductId).OnDelete(DeleteBehavior.Restrict);
            entity.HasMany(d => d.Feedbacks).WithOne(p => p.Product).HasForeignKey(p => p.ProductId).OnDelete(DeleteBehavior.Restrict);
            entity.HasMany(d => d.OrderDetails).WithOne(p => p.Product).HasForeignKey(p => p.ProductId).OnDelete(DeleteBehavior.Restrict);
            entity.HasMany(d => d.PromotionProducts).WithOne(p => p.Product).HasForeignKey(p => p.ProductId).OnDelete(DeleteBehavior.Restrict);            
        });

        modelBuilder.Entity<PaymentTransaction>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.OrderId).IsRequired();
            entity.Property(e => e.SessionId).IsRequired();
            entity.Property(e => e.PaymentMethodId).IsRequired();
            entity.Property(e => e.PaymentStatusId).IsRequired();
            
            entity.Property(e => e.TotalAmount).IsRequired().HasColumnType("decimal(18, 3)");
            entity.Property(e => e.CreatedAt).IsRequired().HasColumnType("datetime");
            entity.Property(e => e.UpdatedAt).IsRequired().HasColumnType("datetime");
            entity.Property(e => e.NormalizedTerm).IsRequired().HasColumnType("nvarchar(500)");

            entity.HasOne(d => d.Order).WithMany(p => p.PaymentTransactions).HasForeignKey(d => d.OrderId).HasConstraintName("FK_PaymentTransactions_Orders").OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(d => d.ShoppingSession).WithMany(p => p.PaymentTransactions).HasForeignKey(d => d.SessionId).HasConstraintName("FK_PaymentTransactions_ShoppingSessions").OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(d => d.PaymentMethod).WithMany(p => p.PaymentTransactions).HasForeignKey(d => d.PaymentMethodId).HasConstraintName("FK_PaymentTransactions_PaymentMethods").OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(d => d.PaymentStatus).WithMany(p => p.PaymentTransactions).HasForeignKey(d => d.PaymentStatusId).HasConstraintName("FK_PaymentTransactions_PaymentStatuses").OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<PaymentMethod>(entity =>
        {
            entity.HasKey(e => e.Id);
            
            entity.Property(e => e.Name).IsRequired().HasMaxLength(25);

            entity.HasMany(d => d.PaymentTransactions).WithOne(p => p.PaymentMethod).HasForeignKey(p => p.PaymentMethodId).OnDelete(DeleteBehavior.Restrict);            
        });

        modelBuilder.Entity<OrderStatus>(entity =>
        {
            entity.HasKey(e => e.Id);
            
            entity.Property(e => e.Status).IsRequired().HasMaxLength(20);

            entity.HasMany(d => d.Orders).WithOne(p => p.OrderStatus).HasForeignKey(p => p.OrderStatusId).OnDelete(DeleteBehavior.Restrict);           
            entity.HasMany(d => d.OrderStatusHistories).WithOne(p => p.OrderStatus).HasForeignKey(p => p.OrderStatusId).OnDelete(DeleteBehavior.Restrict);           
        });

        modelBuilder.Entity<PaymentStatus>(entity =>
        {
            entity.HasKey(e => e.Id);
            
            entity.Property(e => e.Status).IsRequired().HasMaxLength(20);

            entity.HasMany(d => d.PaymentTransactions).WithOne(p => p.PaymentStatus).HasForeignKey(p => p.PaymentMethodId).OnDelete(DeleteBehavior.Restrict);           
        });

        modelBuilder.Entity<SessionStatus>(entity =>
        {
            entity.HasKey(e => e.Id);
            
            entity.Property(e => e.Status).IsRequired().HasMaxLength(20);

            entity.HasMany(d => d.ShoppingSessions).WithOne(p => p.SessionStatus).HasForeignKey(p => p.SessionStatusId).OnDelete(DeleteBehavior.Restrict);           
        });

        modelBuilder.Entity<Promotion>(entity =>
        {
            entity.HasKey(e => e.Id);
            
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Description).IsRequired().HasMaxLength(150);
            entity.Property(e => e.Discount).HasDefaultValue(null).HasColumnType("decimal(18, 3)");
            entity.Property(e => e.DiscountPercentage).HasDefaultValue(null).HasColumnType("decimal(18, 3)");
            entity.Property(e => e.StartAt).IsRequired().HasColumnType("datetime");
            entity.Property(e => e.EndAt).IsRequired().HasColumnType("datetime");
            entity.Property(e => e.NormalizedTerm).IsRequired().HasMaxLength(256);

            entity.HasMany(d => d.PromotionProducts).WithOne(p => p.Promotion).HasForeignKey(p => p.PromotionId).OnDelete(DeleteBehavior.Restrict);            
        });

        modelBuilder.Entity<PromotionProduct>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.HasOne(d => d.Promotion).WithMany(p => p.PromotionProducts).HasForeignKey(d => d.PromotionId).HasConstraintName("FK_PromotionProducts_Promotions").OnDelete(DeleteBehavior.Restrict);          
            entity.HasOne(d => d.Product).WithMany(p => p.PromotionProducts).HasForeignKey(d => d.ProductId).HasConstraintName("FK_PromotionProducts_Products").OnDelete(DeleteBehavior.Restrict);                    
        });
        #endregion
        
        #region Identity Db Context
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            var tableName = entityType.GetTableName();
            if (tableName!.StartsWith("AspNet"))
            {
                entityType.SetTableName(tableName.Substring(6));
            }
        }
        // modelBuilder.Ignore<IdentityUserClaim<string>>();
        // modelBuilder.Ignore<IdentityRoleClaim<string>>();
        modelBuilder.Entity<User>(entity => 
        {
            // entity.HasKey(e => e.Id);
            
            // entity.HasIndex(e => e.UserName).IsUnique();
            // entity.HasIndex(e => e.Email).IsUnique();
            // entity.HasIndex(e => e.PhoneNumber).IsUnique();
            // entity.Property(e => e.PasswordHash).IsRequired().HasMaxLength(256);
            
            // entity.Property(e => e.EmailConfirmed).HasDefaultValue(false);
            // entity.Property(e => e.PhoneNumberConfirmed).HasDefaultValue(false);
            // entity.Property(e => e.TwoFactorEnabled).HasDefaultValue(false);
            // entity.Property(e => e.LockoutEnabled).HasDefaultValue(true);
            // entity.Property(e => e.LockoutEnd).HasDefaultValue(null).HasColumnType("datetimeoffset");
            // entity.Property(e => e.AccessFailedCount).HasDefaultValue(0);

            entity.Property(c => c.FullName).HasDefaultValue(null).HasMaxLength(256);
            entity.Property(c => c.HomeAddress).HasDefaultValue(null).HasMaxLength(256);
            entity.Property(c => c.Avatar).HasDefaultValue(null).HasMaxLength(256);
            entity.Property(e => e.CreatedAt).IsRequired().HasColumnType("datetime");
            entity.Property(e => e.UpdatedAt).IsRequired().HasColumnType("datetime");
            entity.Property(e => e.NormalizedTerm).IsRequired().HasColumnType("nvarchar(4000)");
            
            entity.HasMany(d => d.Feedbacks).WithOne(p => p.User).HasForeignKey(p => p.UserId).OnDelete(DeleteBehavior.Restrict);
            entity.HasMany(d => d.Orders).WithOne(p => p.User).HasForeignKey(p => p.UserId).OnDelete(DeleteBehavior.Restrict);            
        });

        // modelBuilder.Entity<Role>(entity => 
        // {
        //     entity.HasKey(e => e.Id);
        //     entity.HasIndex(e => e.Name).IsUnique();
        // });

        // modelBuilder.Entity<UserRole>(entity => 
        // {
        //     entity.HasKey(e => new { e.UserId, e.RoleId });
            
        //     entity.HasOne(d => d.User).WithMany(p => p.UserRoles).HasForeignKey(d => d.UserId).IsRequired();
        //     entity.HasOne(d => d.Role).WithMany(p => p.UserRoles).HasForeignKey(d => d.RoleId).IsRequired();
        // });

        // modelBuilder.Entity<UserLogin>(entity => 
        // {
        //     entity.HasKey(e => new { e.LoginProvider, e.ProviderKey });

        //     entity.HasOne(e => e.User).WithMany(u => u.Logins).HasForeignKey(e => e.UserId).IsRequired();
        // });

        // modelBuilder.Entity<UserToken>(entity => 
        // {
        //     entity.HasKey(e => new { e.UserId, e.LoginProvider, e.Name });

        //     entity.Property(e => e.Value).IsRequired().HasMaxLength(256);

        //     entity.HasOne(e => e.User).WithMany(u => u.Tokens).HasForeignKey(e => e.UserId).IsRequired();
        // });
        #endregion
    }
}
