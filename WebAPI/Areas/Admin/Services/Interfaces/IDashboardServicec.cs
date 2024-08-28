using SoftKiwiFlorist.Models.DTOs;

namespace SoftKiwiFlorist.Areas.Admin.Services.Interfaces;

public interface IDashboardService 
{
    Task<int> CountTotalUserAsync();
    Task<int> CountTotalShoppingSessionAsync();
    Task<int> CountTotalOrderAsync();
    Task<decimal> SumTotalRevenueAsync();
    Task<IList<RevenueResult>> FetchDailyRevenueAsync();
    Task<IList<RevenueResult>> FetchMonthlyRevenueAsync();
    Task<IList<RevenueResult>> FetchYearlyRevenueAsync();
}