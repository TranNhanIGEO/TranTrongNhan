using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SoftKiwiFlorist.Areas.Admin.Services.Interfaces;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Enums;
using SoftKiwiFlorist.Models.Response;

namespace SoftKiwiFlorist.Areas.Admin.Controllers;
[ApiController]
[ApiVersion("1.0")]
[Area("Admin")]
[Authorize(Roles = nameof(RoleTypes.Admin))]
[Route("api/admin/v{version:apiVersion}/dashboard")]

public class DashboardController : ControllerBase
{
    private readonly IDashboardService _dashboardService;
    private readonly ILogger<DashboardController> _logger;

    public DashboardController(IDashboardService dashboardService, ILogger<DashboardController> logger)
    {
        _dashboardService = dashboardService;
        _logger = logger;
    }

    [HttpGet("Total-User")]
    public async Task<IActionResult> CountTotalUser()
    {
        try
        {
            int result = await _dashboardService.CountTotalUserAsync();
            return ResponseHelper.GetOnlySuccessfullyResponse(new GetOnlySuccessfullyResponseModel<int>()
            {
                Record = result,
                Message = "Retrieved Total User successfully"
            });
        }
        catch (Exception err)
        {
            _logger.LogError(err, "Exception: {Message}", err.Message);
            return ResponseHelper.InternalServerErrorResponse(new InternalServerErrorResponseModel()
            {
                Message = err.Message
            });
        }
    }

    [HttpGet("Total-ShoppingSession")]
    public async Task<IActionResult> CountTotalShoppingSession()
    {
        try
        {
            int result = await _dashboardService.CountTotalShoppingSessionAsync();
            return ResponseHelper.GetOnlySuccessfullyResponse(new GetOnlySuccessfullyResponseModel<int>()
            {
                Record = result,
                Message = "Retrieved Total ShoppingSession successfully"
            });
        }
        catch (Exception err)
        {
            _logger.LogError(err, "Exception: {Message}", err.Message);
            return ResponseHelper.InternalServerErrorResponse(new InternalServerErrorResponseModel()
            {
                Message = err.Message
            });
        }
    }

    [HttpGet("Total-Order")]
    public async Task<IActionResult> CountTotalOrder()
    {
        try
        {
            int result = await _dashboardService.CountTotalOrderAsync();
            return ResponseHelper.GetOnlySuccessfullyResponse(new GetOnlySuccessfullyResponseModel<int>()
            {
                Record = result,
                Message = "Retrieved Total Order successfully"
            });
        }
        catch (Exception err)
        {
            _logger.LogError(err, "Exception: {Message}", err.Message);
            return ResponseHelper.InternalServerErrorResponse(new InternalServerErrorResponseModel()
            {
                Message = err.Message
            });
        }
    }

    [HttpGet("Total-Revenue")]
    public async Task<IActionResult> SumTotalRevenue()
    {
        try
        {
            decimal result = await _dashboardService.SumTotalRevenueAsync();
            return ResponseHelper.GetOnlySuccessfullyResponse(new GetOnlySuccessfullyResponseModel<decimal>()
            {
                Record = result,
                Message = "Retrieved Total Revenue successfully"
            });
        }
        catch (Exception err)
        {
            _logger.LogError(err, "Exception: {Message}", err.Message);
            return ResponseHelper.InternalServerErrorResponse(new InternalServerErrorResponseModel()
            {
                Message = err.Message
            });
        }
    }

    [HttpGet("Daily-Revenue")]
    public async Task<IActionResult> GetDailyRevenue()
    {
        try
        {
            IList<RevenueResult> result = await _dashboardService.FetchDailyRevenueAsync();
            return ResponseHelper.GetListSuccessfullyResponse(new GetListSuccessfullyResponseModel<RevenueResult>()
            {
                Records = result,
                Message = "Retrieved Daily Revenue successfully"
            });
        }
        catch (Exception err)
        {
            _logger.LogError(err, "Exception: {Message}", err.Message);
            return ResponseHelper.InternalServerErrorResponse(new InternalServerErrorResponseModel()
            {
                Message = err.Message
            });
        }
    }

    [HttpGet("Monthly-Revenue")]
    public async Task<IActionResult> GetMonthlyRevenue()
    {
        try
        {
            IList<RevenueResult> result = await _dashboardService.FetchMonthlyRevenueAsync();
            return ResponseHelper.GetListSuccessfullyResponse(new GetListSuccessfullyResponseModel<RevenueResult>()
            {
                Records = result,
                Message = "Retrieved Monthly Revenue successfully"
            });
        }
        catch (Exception err)
        {
            _logger.LogError(err, "Exception: {Message}", err.Message);
            return ResponseHelper.InternalServerErrorResponse(new InternalServerErrorResponseModel()
            {
                Message = err.Message
            });
        }
    }

    [HttpGet("Yearly-Revenue")]
    public async Task<IActionResult> GetYearlyRevenue()
    {
        try
        {
            IList<RevenueResult> result = await _dashboardService.FetchYearlyRevenueAsync();
            return ResponseHelper.GetListSuccessfullyResponse(new GetListSuccessfullyResponseModel<RevenueResult>()
            {
                Records = result,
                Message = "Retrieved Yearly Revenue successfully"
            });
        }
        catch (Exception err)
        {
            _logger.LogError(err, "Exception: {Message}", err.Message);
            return ResponseHelper.InternalServerErrorResponse(new InternalServerErrorResponseModel()
            {
                Message = err.Message
            });
        }
    }
}
