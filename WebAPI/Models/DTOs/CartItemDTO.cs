namespace SoftKiwiFlorist.Models.DTOs;

public abstract class CartItemDTO
{
    public Guid SessionId { get; set; }
    public Guid ProductId { get; set; } 
    public int Quantity { get; set; }
}

public class CartItemReqDTO : CartItemDTO
{
    
}

public class CartItemResDTO : CartItemDTO
{
    public Guid Id { get; set; }
    public string? ProductName { get; set; }
    public string? ProductImage { get; set; }
    public decimal? ProductPrice { get; set; }
    public decimal? TotalAmount { get; set; }
}