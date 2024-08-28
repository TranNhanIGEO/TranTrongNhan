using Microsoft.AspNetCore.Identity;

namespace SoftKiwiFlorist.Models.Entities;

public partial class User : IdentityUser
{
    public string? FullName { get; set; }
    public string? HomeAddress { get; set; }
    public string? Avatar { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string NormalizedTerm { get; set; } = null!;
    public virtual ICollection<ShoppingSession> ShoppingSessions { get; set; } = new List<ShoppingSession>();
    public virtual ICollection<PaymentTransaction> PaymentTransactions { get; set; } = new List<PaymentTransaction>();
    public virtual ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();
    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
