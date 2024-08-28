namespace SoftKiwiFlorist.Models.DTOs;

public abstract class CategoryDTO
{
    public string Name { get; set; } = null!;
    public string Image { get; set; } = null!;
}

public class CategoryReqDTO : CategoryDTO
{
    public IFormFile? File { get; set; }
}

public class CategoryResDTO : CategoryDTO
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
