namespace SoftKiwiFlorist.Models.DTOs;

public abstract class BannerDTO
{
    public Guid? CategoryId { get; set; }
    public string Image { get; set; } = null!;
}

public class BannerReqDTO : BannerDTO
{
    public IFormFile? File { get; set; }
}

public class BannerResDTO : BannerDTO
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string? CategoryName { get; set; }
}