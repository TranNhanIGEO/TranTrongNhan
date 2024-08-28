using Asp.Versioning;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Areas.Admin.Services.Interfaces;
using SoftKiwiFlorist.Models.Response;
using SoftKiwiFlorist.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using SoftKiwiFlorist.Models.Enums;

namespace SoftKiwiFlorist.Areas.Admin.Controllers;
[ApiController]
[ApiVersion("1.0")]
[Area("Admin")]
[Authorize(Roles = nameof(RoleTypes.Admin))]
[Route("api/admin/v{version:apiVersion}/banner")]

public class AdminBannerController : ControllerBase
{
    private readonly IAdminBannerService _bannerService;
    private readonly ILogger<AdminBannerController> _logger;

    public AdminBannerController(IAdminBannerService bannerService, ILogger<AdminBannerController> logger)
    {
        _bannerService = bannerService;
        _logger = logger;
    }

    [HttpPost, MapToApiVersion("1.0")]
    public async Task<IActionResult> CreateBanner([FromForm]BannerReqDTO model)
    {
        try
        {
            BannerResDTO banner = await _bannerService.CreateEntityAsync(model);
            return ResponseHelper.CreatedSuccessfullyResponse(new CreatedSuccessfullyResponseModel<BannerResDTO>()
            {
                Message = "Created banner successfully!",
                Record = banner,
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
                Message = "Invalid information about banner",
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
    public async Task<IActionResult> UpdateBanner([FromRoute]Guid id, [FromForm]BannerReqDTO model)
    {
        try
        {
            BannerResDTO banner = await _bannerService.UpdateEntityAsync(id, model);
            return ResponseHelper.UpdatedSuccessfullyResponse(new UpdatedSuccessfullyResponseModel<BannerResDTO>()
            {
                Message = "Updated banner successfully!",
                Record = banner,
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
                Message = "Invalid information about banner",
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
    public async Task<IActionResult> DeleteBanner([FromRoute]Guid id)
    {
        try
        {
            await _bannerService.DeleteEntityAsync(id);
            return ResponseHelper.DeletedSuccessfullyResponse(new DeletedSuccessfullyResponseModel()
            {
                Message = "Deleted banner successfully!",
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