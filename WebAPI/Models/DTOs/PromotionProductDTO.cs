namespace SoftKiwiFlorist.Models.DTOs;

public abstract class PromotionProductDTO
{
    public Guid PromotionId { get; set; }
    public Guid ProductId { get; set; }
}

public class PromotionProductReqDTO : PromotionProductDTO
{

}

public class PromotionProductResDTO : PromotionProductDTO
{
    public Guid Id { get; set; }
    public string? PromotionName { get; set; }
    public string? ProductName { get; set; }
}