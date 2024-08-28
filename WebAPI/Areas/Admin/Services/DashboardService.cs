using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SoftKiwiFlorist.Areas.Admin.Services.Interfaces;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;
using SoftKiwiFlorist.Repositories.Interfaces;

namespace SoftKiwiFlorist.Areas.Admin.Services;

public class DashboardService : IDashboardService
{
    private readonly UserManager<User> _userManager;
    private readonly IOrderRepository _orderRepository;
    private readonly IOrderDetailRepository _orderDetailRepository;
    private readonly IShoppingSessionRepository _shoppingSessionRepository;

    public DashboardService(
        UserManager<User> userManager,
        IOrderRepository orderRepository, 
        IOrderDetailRepository orderDetailRepository, 
        IShoppingSessionRepository shoppingSessionRepository)
    {
        _userManager = userManager;
        _orderRepository = orderRepository;
        _orderDetailRepository = orderDetailRepository;
        _shoppingSessionRepository = shoppingSessionRepository;
    }

    public async Task<int> CountTotalUserAsync()
    {
        IQueryable<User> query = _userManager.Users;

        int result = await query.CountAsync();

        return result;
    }

    public async Task<int> CountTotalShoppingSessionAsync()
    {
        IQueryable<ShoppingSession> query = _shoppingSessionRepository.GetContext();

        int result = await query.CountAsync();

        return result;
    }

    public async Task<int> CountTotalOrderAsync()
    {
        IQueryable<Order> query = _orderRepository.GetContext();

        int result = await query.CountAsync();

        return result;
    }

    public async Task<decimal> SumTotalRevenueAsync()
    {
        IQueryable<Order> query = _orderRepository.GetContext();

        decimal result = await query.SumAsync(o => o.TotalAmount);

        return result;
    }

    public async Task<IList<RevenueResult>> FetchDailyRevenueAsync()
    {
        IQueryable<OrderDetail> query = _orderDetailRepository.GetContext();
        
        IList<RevenueResult> result = await query
            .GroupBy(od => od.Order!.OrderAt.Date)
            .Select(g => new RevenueResult {
                OrderDate = g.Key.Date,
                Revenue = g.Sum(od => od.Quantity * od.TotalPrice)
            })
            .ToListAsync();

        return result;
    }

    public async Task<IList<RevenueResult>> FetchMonthlyRevenueAsync()
    {
        IQueryable<OrderDetail> query = _orderDetailRepository.GetContext();
        
        IList<RevenueResult> result = await query
            .GroupBy(od => new { od.Order!.OrderAt.Month, od.Order!.OrderAt.Year })
            .Select(g => new RevenueResult {
                OrderMonth = g.Key.Month,
                OrderYear = g.Key.Year,
                Revenue = g.Sum(od => od.Quantity * od.TotalPrice)
            })
            .ToListAsync();

        return result;
    }
    
    public async Task<IList<RevenueResult>> FetchYearlyRevenueAsync()
    {
        IQueryable<OrderDetail> query = _orderDetailRepository.GetContext();
        
        IList<RevenueResult> result = await query
            .GroupBy(od => new { od.Order!.OrderAt.Year })
            .Select(g => new RevenueResult {
                OrderYear = g.Key.Year,
                Revenue = g.Sum(od => od.Quantity * od.TotalPrice)
            })
            .ToListAsync();

        return result;
    }
}