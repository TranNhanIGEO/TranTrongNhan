namespace SoftKiwiFlorist.Models.DTOs;

public abstract class OrderStatusHistoryDTO
{
    public Guid OrderId { get; set; }
    public Guid OrderStatusId { get; set; }
}

public class OrderStatusHistoryReqDTO : OrderStatusHistoryDTO
{
    
}

public class OrderStatusHistoryResDTO : OrderStatusHistoryDTO
{
    public Guid Id { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string? OrderReceiverName { get; set; }
    public string? OrderStatus { get; set; }
}
