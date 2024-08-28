namespace SoftKiwiFlorist.Models.DTOs;

public abstract class PromotionDTO
{
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public decimal? Discount { get; set; }
    public decimal? DiscountPercentage { get; set; }
    public DateTime StartAt { get; set; }
    public DateTime EndAt { get; set; } 
}

public class PromotionReqDTO : PromotionDTO
{

}

public class PromotionResDTO : PromotionDTO
{
    public Guid Id { get; set; }    
}
