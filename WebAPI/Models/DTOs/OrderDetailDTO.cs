namespace SoftKiwiFlorist.Models.DTOs;

public abstract class OrderDetailDTO
{
    public Guid OrderId { get; set; }
    public Guid ProductId { get; set; }
    public int Quantity { get; set; }
    public decimal? Discount { get; set; }
    public decimal? DiscountPercentage { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TotalPrice  { get; set; }
}

public class OrderDetailReqDTO : OrderDetailDTO
{

}

public class OrderDetailResDTO : OrderDetailDTO
{
    public Guid Id { get; set; }
    public string? ProductImage { get; set; }
    public string? ProductName { get; set; }
    public string? OrderReceiverName { get; set; }
}
