namespace SoftKiwiFlorist.Models.Query;

public enum SortDirection
{
    ASC,
    DESC,
}

public class QueryModel 
{
    public string? SearchTerm { get; set; }
    public int? PageIndex { get; set; }
    public int? PageSize { get; set; }
    public string? SortBy { get; set; }
    public SortDirection? SortDirection { get; set; }
}