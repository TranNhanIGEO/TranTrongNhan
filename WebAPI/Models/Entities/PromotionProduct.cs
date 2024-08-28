namespace SoftKiwiFlorist.Models.Entities;

public partial class PromotionProduct
{
    public Guid Id { get; set; }
    public Guid PromotionId { get; set; }
    public Guid ProductId { get; set; }
    public virtual Promotion? Promotion { get; set; }
    public virtual Product? Product { get; set; }
}
