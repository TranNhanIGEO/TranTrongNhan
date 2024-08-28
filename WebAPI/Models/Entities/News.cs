namespace SoftKiwiFlorist.Models.Entities;

public partial class News
{
    public Guid Id { get; set; }
    public Guid? CategoryId { get; set; }
    public string Title { get; set; } = null!;
    public string Summary { get; set; } = null!;
    public string Content { get; set; } = null!;
    public string Image { get; set; } = null!;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string NormalizedTerm { get; set; } = null!;
    public virtual Category? Category { get; set; }
}
