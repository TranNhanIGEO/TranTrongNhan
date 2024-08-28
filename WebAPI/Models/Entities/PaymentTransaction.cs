namespace SoftKiwiFlorist.Models.Entities;

public partial class PaymentTransaction
{
    public Guid Id { get; set; }
    public Guid OrderId { get; set; }
    public Guid SessionId { get; set; }
    public Guid PaymentMethodId { get; set; }
    public Guid PaymentStatusId { get; set; }
    public decimal TotalAmount { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string NormalizedTerm { get; set; } = null!;
    public virtual Order? Order { get; set; }
    public virtual ShoppingSession? ShoppingSession { get; set; }
    public virtual PaymentMethod? PaymentMethod { get; set; }
    public virtual PaymentStatus? PaymentStatus { get; set; }
}
