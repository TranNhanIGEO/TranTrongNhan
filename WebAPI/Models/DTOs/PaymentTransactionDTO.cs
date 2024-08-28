namespace SoftKiwiFlorist.Models.DTOs;

public abstract class PaymentTransactionDTO
{
    public Guid OrderId { get; set; }
    public Guid SessionId { get; set; }
    public Guid PaymentMethodId { get; set; }
    public Guid PaymentStatusId { get; set; }
    public decimal TotalAmount { get; set; }
}

public class PaymentTransactionReqDTO : PaymentTransactionDTO
{

}

public class PaymentTransactionResDTO : PaymentTransactionDTO
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string NormalizedTerm { get; set; } = null!;
    public string? SessionStatus { get; set; }
    public string? PaymentMethod { get; set; }
    public string? PaymentStatus { get; set; }
}