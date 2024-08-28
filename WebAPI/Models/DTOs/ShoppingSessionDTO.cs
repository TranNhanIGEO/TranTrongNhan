namespace SoftKiwiFlorist.Models.DTOs;

public abstract class ShoppingSessionDTO
{
    public string? UserId { get; set; }
}

public class ShoppingSessionReqDTO : ShoppingSessionDTO
{
    
}

public class ShoppingSessionResDTO : ShoppingSessionDTO
{
    public Guid Id { get; set; }
    public Guid SessionStatusId { get; set; }
    public string? SessionStatus { get; set; }
    public int Quantity { get; set; }
    public decimal TotalUnitPrice { get; set; }
    public decimal TotalDiscount { get; set; }
    public decimal TotalPrice { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}