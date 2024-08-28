using Microsoft.AspNetCore.Mvc;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Response;
using SoftKiwiFlorist.Helpers;
using FluentValidation;
using Asp.Versioning;
using SoftKiwiFlorist.Areas.Customer.Services.Interfaces;
using SoftKiwiFlorist.Services.Interfaces;

namespace SoftKiwiFlorist.Areas.Customer.Controllers;
[ApiController]
[ApiVersion("1.0")]
[Area("Customer")]
[Route("api/customer/v{version:apiVersion}/feedback")]

public class CustomerFeedbackController : ControllerBase
{
    private readonly ICustomerFeedbackService _customerFeedbackService;
    private readonly IFeedbackService _feedbackService;
    private readonly ILogger<CustomerFeedbackController> _logger;

    public CustomerFeedbackController(ICustomerFeedbackService customerFeedbackService, IFeedbackService feedbackService, ILogger<CustomerFeedbackController> logger)
    {
        _customerFeedbackService = customerFeedbackService;
        _feedbackService = feedbackService;
        _logger = logger;
    }

    [HttpPost, MapToApiVersion("1.0")]
    public async Task<IActionResult> CreateFeedback([FromForm]FeedbackReqDTO model)
    {
        try
        {
            FeedbackResDTO feedback = await _customerFeedbackService.CreateEntityAsync(model);
            return ResponseHelper.CreatedSuccessfullyResponse(new CreatedSuccessfullyResponseModel<FeedbackResDTO>()
            {
                Message = "Created feedback successfully!",
                Record = feedback,
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
        catch (ValidationException err)
        {
            _logger.LogError(err, "ValidationException: {Message}", err.Message);
            return ResponseHelper.BadRequestErrorResponse(new BadRequestErrorResponseModel()
            {
                Message = "Invalid information about feedback",
                Errors = err.Errors.ToDictionary(e => e.PropertyName, e => e.ErrorMessage),
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

    [HttpPut("{id}"), MapToApiVersion("1.0")]
    public async Task<IActionResult> UpdateFeedback([FromRoute]Guid id, [FromForm]FeedbackReqDTO model)
    {
        try
        {
            FeedbackResDTO feedback = await _customerFeedbackService.UpdateEntityAsync(id, model);
            return ResponseHelper.UpdatedSuccessfullyResponse(new UpdatedSuccessfullyResponseModel<FeedbackResDTO>()
            {
                Message = "Updated feedback successfully!",
                Record = feedback,
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
        catch (ValidationException err)
        {
            _logger.LogError(err, "ValidationException: {Message}", err.Message);
            return ResponseHelper.BadRequestErrorResponse(new BadRequestErrorResponseModel()
            {
                Message = "Invalid information about feedback",
                Errors = err.Errors.ToDictionary(e => e.PropertyName, e => e.ErrorMessage),
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