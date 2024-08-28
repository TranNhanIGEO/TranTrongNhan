using Microsoft.AspNetCore.Mvc;
using SoftKiwiFlorist.Models.Response;
using SoftKiwiFlorist.Areas.Admin.Services.Interfaces;
using SoftKiwiFlorist.Helpers;
using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using SoftKiwiFlorist.Models.Enums;

namespace SoftKiwiFlorist.Areas.Admin.Controllers;
[ApiController]
[ApiVersion("1.0")]
[Area("Admin")]
[Authorize(Roles = nameof(RoleTypes.Admin))]
[Route("api/admin/v{version:apiVersion}/feedback")]

public class AdminFeedbackController : ControllerBase
{
    private readonly IAdminFeedbackService _feedbackService;
    private readonly ILogger<AdminFeedbackController> _logger;

    public AdminFeedbackController(IAdminFeedbackService feedbackService, ILogger<AdminFeedbackController> logger)
    {
        _feedbackService = feedbackService;
        _logger = logger;
    }

    [HttpDelete("{id}"), MapToApiVersion("1.0")]
    public async Task<IActionResult> DeleteFeedback([FromRoute]Guid id)
    {
        try
        {
            await _feedbackService.DeleteEntityAsync(id);
            return ResponseHelper.DeletedSuccessfullyResponse(new DeletedSuccessfullyResponseModel()
            {
                Message = "Deleted feedback successfully!",
                RecordId = id.ToString(),
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