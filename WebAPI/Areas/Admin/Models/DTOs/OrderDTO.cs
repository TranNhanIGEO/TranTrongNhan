namespace SoftKiwiFlorist.Areas.Admin.Models.DTOs;

public class AdminOrderReqDTO
{
    public Guid? OrderId { get; set;}
    public Guid? OrderStatusId { get; set; }
    public Guid? PaymentStatusId { get; set; }
}