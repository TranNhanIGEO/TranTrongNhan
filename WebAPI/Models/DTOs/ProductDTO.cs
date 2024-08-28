namespace SoftKiwiFlorist.Models.DTOs;

public abstract class ProductDTO
{
    public Guid CategoryId { get; set; }
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string Image { get; set; } = null!;
    public decimal Price { get; set; }
}

public class ProductReqDTO : ProductDTO
{
    public IFormFile? File { get; set; }
}

public class ProductResDTO : ProductDTO
{
    public Guid Id { get; set; }
    public bool IsNew { get; set; }
    public decimal? Discount { get; set; }
    public decimal? DiscountPercentage { get; set; }
    public decimal FinalPrice { get; set; }
    public int? Sold { get; set; }
    public int? Viewed { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string? CategoryName { get; set; }
}
