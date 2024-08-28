namespace SoftKiwiFlorist.Models.DTOs;

public class RevenueResult
{
    public DateTime? OrderDate { get; set; }
    public int? OrderYear { get; set; }
    public int? OrderMonth { get; set; }
    public decimal Revenue { get; set; }
}