namespace SoftKiwiFlorist.Models.Entities;

public partial class ShoppingSession
{
    public Guid Id { get; set; }
    public string? UserId { get; set; }
    public Guid SessionStatusId { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; } 
    public virtual User? User { get; set; }
    public virtual SessionStatus? SessionStatus { get; set; }
    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
    public virtual ICollection<PaymentTransaction> PaymentTransactions { get; set; } = new List<PaymentTransaction>();
    public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
}
