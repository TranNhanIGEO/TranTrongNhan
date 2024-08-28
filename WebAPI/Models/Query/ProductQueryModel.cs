namespace SoftKiwiFlorist.Models.Query;

public class ProductQueryModel : QueryModel
{
    public Guid[]? CategoryIds { get; set; }
    public decimal[]? FromValues { get; set; }
    public decimal[]? ToValues { get; set; }
    public bool? IsNew { get; set; }
    public bool? IsBestSelling { get; set; }
}