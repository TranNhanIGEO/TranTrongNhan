using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Services.Interfaces;
using SoftKiwiFlorist.Models.Response;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Query;

namespace SoftKiwiFlorist.Controllers;
[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]

public class BannerController : ControllerBase
{
    private readonly IBannerService _bannerService;
    private readonly ILogger<BannerController> _logger;

    public BannerController(IBannerService bannerService, ILogger<BannerController> logger)
    {
        _bannerService = bannerService;
        _logger = logger;
    }

    [HttpGet, MapToApiVersion("1.0")]
    public async Task<IActionResult> GetBanners([FromQuery]QueryModel queryParams)
    {
        try
        {
            var bannerRecords = await _bannerService.FetchEntitiesAsync(queryParams);
            int totalRecords = await _bannerService.CountEntityAsync(queryParams);
            int filteredRecords = totalRecords;

            if (!string.IsNullOrEmpty(queryParams.SearchTerm))
            {
                filteredRecords = await _bannerService.CountEntityAsync(queryParams);
            }
            
            return ResponseHelper.GetListSuccessfullyResponse(new GetListSuccessfullyResponseModel<BannerResDTO>()
            {
                Records = bannerRecords,
                TotalRecords = totalRecords,
                FilteredRecords = filteredRecords,
                Message = "Retrieved banners successfully"
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

    [HttpGet("{id}"), MapToApiVersion("1.0")]
    public async Task<IActionResult> GetBannerById([FromRoute]Guid id)
    {
        try
        {
            BannerResDTO? banner = await _bannerService.FetchEntityByIdAsync(id);

            return ResponseHelper.GetOnlySuccessfullyResponse(new GetOnlySuccessfullyResponseModel<BannerResDTO>()
            {
                Record = banner,
                Message = "Retrieved banner successfully"
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
        catch (NotFoundException err)
        {
            _logger.LogError(err, "NotFoundException: {Message}", err.Message);
            return ResponseHelper.NotFoundErrorResponse(new NotFoundErrorResponseModel()
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