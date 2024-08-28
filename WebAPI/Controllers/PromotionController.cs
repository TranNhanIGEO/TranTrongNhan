using Microsoft.AspNetCore.Mvc;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Response;
using SoftKiwiFlorist.Models.Query;
using SoftKiwiFlorist.Services.Interfaces;
using SoftKiwiFlorist.Helpers;
using Asp.Versioning;

namespace SoftKiwiFlorist.Controllers;
[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]

public class PromotionController : ControllerBase
{
    private readonly IPromotionService _promotionService;
    private readonly ILogger<PromotionController> _logger;

    public PromotionController(IPromotionService promotionService, ILogger<PromotionController> logger)
    {
        _promotionService = promotionService;
        _logger = logger;
    }

    [HttpGet, MapToApiVersion("1.0")]
    public async Task<IActionResult> GetPromotions([FromQuery]QueryModel queryParams)
    {
        try
        {
            var promotionRecords = await _promotionService.FetchEntitiesAsync(queryParams);
            int totalRecords = await _promotionService.CountEntityAsync(queryParams);
            int filteredRecords = totalRecords;

            if (!string.IsNullOrEmpty(queryParams.SearchTerm))
            {
                filteredRecords = await _promotionService.CountEntityAsync(queryParams);
            }
            
            return ResponseHelper.GetListSuccessfullyResponse(new GetListSuccessfullyResponseModel<PromotionResDTO>()
            {
                Records = promotionRecords,
                TotalRecords = totalRecords,
                FilteredRecords = filteredRecords,
                Message = "Retrieved promotions successfully"
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
    public async Task<IActionResult> GetPromotionById([FromRoute]Guid id)
    {
        try
        {
            PromotionResDTO? promotion = await _promotionService.FetchEntityByIdAsync(id);

            return ResponseHelper.GetOnlySuccessfullyResponse(new GetOnlySuccessfullyResponseModel<PromotionResDTO>()
            {
                Record = promotion,
                Message = "Retrieved promotion successfully"
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