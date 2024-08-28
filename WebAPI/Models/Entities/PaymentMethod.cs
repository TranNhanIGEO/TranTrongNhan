namespace SoftKiwiFlorist.Models.Entities;

public partial class PaymentMethod
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public virtual ICollection<PaymentTransaction> PaymentTransactions { get; set; } = new List<PaymentTransaction>();
}
