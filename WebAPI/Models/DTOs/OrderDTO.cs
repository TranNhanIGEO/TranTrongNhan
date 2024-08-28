namespace SoftKiwiFlorist.Models.DTOs;

public abstract class OrderDTO
{
    public string? UserId { get; set; } 
    public Guid SessionId { get; set; }
    public Guid OrderStatusId { get; set; }
    public string ReceiverName { get; set; } = null!;
    public string ReceiverAddress { get; set; } = null!;
    public string PhoneNumber { get; set; } = null!;
    public int Quantity { get; set; }
    public decimal TotalAmount { get; set; }
    public string? Note { get; set; }
}

public class OrderReqDTO : OrderDTO
{
    public IList<OrderDetailReqDTO> OrderDetails { get; set; } = null!;    
}

public class OrderResDTO : OrderDTO
{
    public Guid Id { get; set; }
    public DateTime OrderAt { get; set; }
    public string? UserFullName { get; set; }
    public string? PaymentStatus { get; set; }
    public string? SessionStatus { get; set; }
    public string? OrderStatus { get; set; }
    public IList<OrderDetailResDTO> OrderDetails { get; set; } = null!;    
}
