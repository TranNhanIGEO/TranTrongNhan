namespace SoftKiwiFlorist.Models.Entities;

public partial class OrderStatusHistory
{
    public Guid Id { get; set; }
    public Guid OrderId { get; set; }
    public Guid OrderStatusId { get; set; }
    public DateTime UpdatedAt { get; set; }
    public virtual Order? Order { get; set; }
    public virtual OrderStatus? OrderStatus { get; set; }
}