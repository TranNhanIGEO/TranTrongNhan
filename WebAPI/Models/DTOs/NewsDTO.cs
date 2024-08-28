namespace SoftKiwiFlorist.Models.DTOs;

public abstract class NewsDTO 
{
    public Guid? CategoryId { get; set; }
    public string Title { get; set; } = null!;
    public string Summary { get; set; } = null!;
    public string Content { get; set; } = null!;
    public string Image { get; set; } = null!;
}

public class NewsReqDTO : NewsDTO
{
    public IFormFile? File { get; set; }
}

public class NewsResDTO : NewsDTO
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string? CategoryName { get; set; }
}
