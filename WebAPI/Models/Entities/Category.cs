namespace SoftKiwiFlorist.Models.Entities;

public partial class Category
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string Image { get; set; } = null!;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string NormalizedTerm { get; set; } = null!;
    public virtual ICollection<Banner> Banners { get; set; } = new List<Banner>();
    public virtual ICollection<News> News { get; set; } = new List<News>();
    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
