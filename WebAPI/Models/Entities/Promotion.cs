namespace SoftKiwiFlorist.Models.Entities;

public partial class Promotion
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public decimal Discount { get; set; }
    public decimal DiscountPercentage { get; set; }
    public DateTime StartAt { get; set; }
    public DateTime EndAt { get; set; } 
    public string NormalizedTerm { get; set; } = null!;
    public virtual ICollection<PromotionProduct> PromotionProducts { get; set; } = new List<PromotionProduct>();
}
