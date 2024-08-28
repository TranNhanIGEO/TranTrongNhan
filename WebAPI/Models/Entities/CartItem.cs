namespace SoftKiwiFlorist.Models.Entities;

public partial class CartItem
{
    public Guid Id { get; set; }
    public Guid SessionId { get; set; }
    public Guid ProductId { get; set; } 
    public int Quantity { get; set; }
    public virtual ShoppingSession? ShoppingSession { get; set; }
    public virtual Product? Product { get; set; }
}
