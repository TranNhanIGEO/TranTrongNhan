namespace SoftKiwiFlorist.Models.Entities;

public partial class Feedback
{
    public Guid Id { get; set; }
    public string UserId { get; set; } = null!;
    public Guid ProductId { get; set; }
    public int Vote { get; set; }
    public string FullName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Comment { get; set; } = null!;
    public string? Image { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string NormalizedTerm { get; set; } = null!;
    public virtual Product? Product { get; set; }
    public virtual User? User { get; set; }
}
