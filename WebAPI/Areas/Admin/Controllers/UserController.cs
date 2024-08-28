using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Enums;
using SoftKiwiFlorist.Models.Query;
using SoftKiwiFlorist.Models.Response;
using SoftKiwiFlorist.Services.Interfaces;

namespace SoftKiwiFlorist.Areas.Admin.Controllers;
[ApiController]
[ApiVersion("1.0")]
[Area("Admin")]
[Authorize(Roles = nameof(RoleTypes.Admin))]
[Route("api/admin/v{version:apiVersion}/user")]

public class AdminUserController : ControllerBase
{
    private readonly IAdminUserService _userService;
    private readonly ILogger<AdminUserController> _logger;

    public AdminUserController(IAdminUserService bannerService, ILogger<AdminUserController> logger)
    {
        _userService = bannerService;
        _logger = logger;
    }
    
    [HttpGet, MapToApiVersion("1.0")]
    public async Task<IActionResult> GetBanners([FromQuery]QueryModel queryParams)
    {
        try
        {
            var bannerRecords = await _userService.FetchEntitiesAsync(queryParams);
            int totalRecords = await _userService.CountEntityAsync(queryParams);
            int filteredRecords = totalRecords;

            if (!string.IsNullOrEmpty(queryParams.SearchTerm))
            {
                filteredRecords = await _userService.CountEntityAsync(queryParams);
            }
            
            return ResponseHelper.GetListSuccessfullyResponse(new GetListSuccessfullyResponseModel<ProfileResDTO>()
            {
                Records = bannerRecords,
                TotalRecords = totalRecords,
                FilteredRecords = filteredRecords,
                Message = "Retrieved users successfully"
            });
        }
        catch (BadRequestException err)
        {
            _logger.LogError(err, "BadRequestException: {Message}", err.Message);
            return ResponseHelper.BadRequestErrorResponse(new BadRequestErrorResponseModel()
            {
                Message = err.Message
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