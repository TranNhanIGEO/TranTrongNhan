namespace SoftKiwiFlorist.Models.Entities;

public partial class SessionStatus
{
    public Guid Id { get; set; }
    public string Status { get; set; } = null!;
    public virtual ICollection<ShoppingSession> ShoppingSessions { get; set; } = new List<ShoppingSession>();
}
