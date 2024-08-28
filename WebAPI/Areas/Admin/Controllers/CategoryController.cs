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
[Route("api/admin/v{version:apiVersion}/category")]

public class AdminCategoryController : ControllerBase
{
    private readonly IAdminCategoryService _categoryService;
    private readonly ILogger<AdminCategoryController> _logger;

    public AdminCategoryController(IAdminCategoryService categoryRepository, ILogger<AdminCategoryController> logger)
    {
        _categoryService = categoryRepository;
        _logger = logger;
    }

    [HttpPost, MapToApiVersion("1.0")]
    public async Task<IActionResult> CreateCategory([FromForm]CategoryReqDTO model)
    {
        try
        {
            CategoryResDTO category = await _categoryService.CreateEntityAsync(model);
            return ResponseHelper.CreatedSuccessfullyResponse(new CreatedSuccessfullyResponseModel<CategoryResDTO>()
            {
                Message = "Created category successfully!",
                Record = category,
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
                Message = "Invalid information about category",
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
    public async Task<IActionResult> UpdateCategory([FromRoute]Guid id, [FromForm]CategoryReqDTO model)
    {
        try
        {
            CategoryResDTO category = await _categoryService.UpdateEntityAsync(id, model);
            return ResponseHelper.UpdatedSuccessfullyResponse(new UpdatedSuccessfullyResponseModel<CategoryResDTO>()
            {
                Message = "Updated category successfully!",
                Record = category,
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
                Message = "Invalid information about category",
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
    public async Task<IActionResult> DeleteCategory([FromRoute]Guid id)
    {
        try
        {
            await _categoryService.DeleteEntityAsync(id);
            return ResponseHelper.DeletedSuccessfullyResponse(new DeletedSuccessfullyResponseModel()
            {
                Message = "Deleted category successfully!",
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