using Microsoft.AspNetCore.Mvc;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Response;
using SoftKiwiFlorist.Areas.Admin.Services.Interfaces;
using SoftKiwiFlorist.Helpers;
using FluentValidation;
using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using SoftKiwiFlorist.Models.Enums;

namespace SoftKiwiFlorist.Areas.Admin.Controllers;
[ApiController]
[ApiVersion("1.0")]
[Area("Admin")]
[Authorize(Roles = nameof(RoleTypes.Admin))]
[Route("api/admin/v{version:apiVersion}/promotion")]

public class AdminPromotionController : ControllerBase
{
    private readonly IAdminPromotionService _promotionService;
    private readonly ILogger<AdminPromotionController> _logger;

    public AdminPromotionController(IAdminPromotionService promotionRepository, ILogger<AdminPromotionController> logger)
    {
        _promotionService = promotionRepository;
        _logger = logger;
    }

    [HttpPost, MapToApiVersion("1.0")]
    public async Task<IActionResult> CreatePromotion([FromForm]PromotionReqDTO model)
    {
        try
        {
            PromotionResDTO promotion = await _promotionService.CreateEntityAsync(model);
            return ResponseHelper.CreatedSuccessfullyResponse(new CreatedSuccessfullyResponseModel<PromotionResDTO>()
            {
                Message = "Created promotion successfully!",
                Record = promotion,
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
                Message = "Invalid information about promotion",
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
    public async Task<IActionResult> UpdatePromotion([FromRoute]Guid id, [FromForm]PromotionReqDTO model)
    {
        try
        {
            PromotionResDTO promotion = await _promotionService.UpdateEntityAsync(id, model);
            return ResponseHelper.UpdatedSuccessfullyResponse(new UpdatedSuccessfullyResponseModel<PromotionResDTO>()
            {
                Message = "Updated promotion successfully!",
                Record = promotion,
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
                Message = "Invalid information about Promotion",
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

    [HttpDelete("{id}"), MapToApiVersion("1.0")]
    public async Task<IActionResult> DeletePromotion([FromRoute]Guid id)
    {
        try
        {
            await _promotionService.DeleteEntityAsync(id);
            return ResponseHelper.DeletedSuccessfullyResponse(new DeletedSuccessfullyResponseModel()
            {
                Message = "Deleted promotion successfully!",
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