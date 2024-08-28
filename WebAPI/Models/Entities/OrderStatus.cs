namespace SoftKiwiFlorist.Models.Entities;

public partial class OrderStatus
{
    public Guid Id { get; set; }
    public string Status { get; set; } = null!;
    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
    public virtual ICollection<OrderStatusHistory> OrderStatusHistories { get; set; } = new List<OrderStatusHistory>();
}
