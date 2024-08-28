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

public class FeedbackController : ControllerBase
{
    private readonly IFeedbackService _feedbackService;
    private readonly ILogger<FeedbackController> _logger;

    public FeedbackController(IFeedbackService feedbackService, ILogger<FeedbackController> logger)
    {
        _feedbackService = feedbackService;
        _logger = logger;
    }

    [HttpGet, MapToApiVersion("1.0")]
    public async Task<IActionResult> GetFeedbacks([FromQuery]FeedbackQueryModel queryParams)
    {
        try
        {
            var feedbackRecords = await _feedbackService.FetchEntitiesAsync(queryParams);
            int totalRecords = await _feedbackService.CountEntityAsync(queryParams);
            int filteredRecords = totalRecords;

            if (!string.IsNullOrEmpty(queryParams.SearchTerm))
            {
                filteredRecords = await _feedbackService.CountEntityAsync(queryParams);
            }
            
            return ResponseHelper.GetListSuccessfullyResponse(new GetListSuccessfullyResponseModel<FeedbackResDTO>()
            {
                Records = feedbackRecords,
                TotalRecords = totalRecords,
                FilteredRecords = filteredRecords,
                Message = "Retrieved feedbacks successfully"
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
    public async Task<IActionResult> GetFeedbackById([FromRoute]Guid id)
    {
        try
        {
            FeedbackResDTO? feedback = await _feedbackService.FetchEntityByIdAsync(id);

            return ResponseHelper.GetOnlySuccessfullyResponse(new GetOnlySuccessfullyResponseModel<FeedbackResDTO>()
            {
                Record = feedback,
                Message = "Retrieved feedback successfully"
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