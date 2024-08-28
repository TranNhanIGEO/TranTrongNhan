namespace SoftKiwiFlorist.Models.DTOs;

public abstract class FeedbackDTO
{
    public Guid Id { get; set; }
    public string UserId { get; set; } = null!;
    public Guid ProductId { get; set; }
    public int Vote { get; set; }
    public string Comment { get; set; } = null!;
    public string FullName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string? Image { get; set; }
}

public class FeedbackReqDTO : FeedbackDTO
{
    public IFormFile? File { get; set; }
}

public class FeedbackResDTO : FeedbackDTO
{
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string? UserFullName { get; set; }
    public string? UserAvatar { get; set; }
    public string? ProductName { get; set; }
}
