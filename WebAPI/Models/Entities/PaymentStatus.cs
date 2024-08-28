namespace SoftKiwiFlorist.Models.Entities;

public partial class PaymentStatus
{
    public Guid Id { get; set; }
    public string Status { get; set; } = null!;
    public virtual ICollection<PaymentTransaction> PaymentTransactions { get; set; } = new List<PaymentTransaction>();
}
