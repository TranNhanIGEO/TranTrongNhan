
namespace SoftKiwiFlorist.Models.Entities;

public partial class Order
{
    public Guid Id { get; set; }
    public string? UserId { get; set; }
    public Guid SessionId { get; set; }
    public Guid OrderStatusId { get; set; }
    public string ReceiverName { get; set; } = null!;
    public string ReceiverAddress { get; set; } = null!;
    public string PhoneNumber { get; set; } = null!;
    public int Quantity { get; set; }
    public decimal TotalAmount { get; set; }
    public string? Note { get; set; }
    public DateTime OrderAt { get; set; }
    public string NormalizedTerm { get; set; } = null!;
    public virtual User? User { get; set; }
    public virtual ShoppingSession? ShoppingSession { get; set; }
    public virtual OrderStatus? OrderStatus { get; set; }
    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
    public virtual ICollection<OrderStatusHistory> OrderStatusHistories { get; set; } = new List<OrderStatusHistory>();
    public virtual ICollection<PaymentTransaction> PaymentTransactions { get; set; } = new List<PaymentTransaction>();
}
