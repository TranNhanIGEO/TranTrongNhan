using Asp.Versioning;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Areas.Customer.Services.Interfaces;
using SoftKiwiFlorist.Models.Response;
using SoftKiwiFlorist.Models.DTOs;

namespace SoftKiwiFlorist.Areas.Customer.Controllers;
[ApiController]
[ApiVersion("1.0")]
[Area("Customer")]
[Route("api/customer/v{version:apiVersion}/cartItem")]

public class CustomerCartItemController : ControllerBase
{
    private readonly ICustomerCartItemService _cartItemService;
    private readonly ILogger<CustomerCartItemController> _logger;

    public CustomerCartItemController(ICustomerCartItemService cartItemService, ILogger<CustomerCartItemController> logger)
    {
        _cartItemService = cartItemService;
        _logger = logger;
    }

    [HttpPost, MapToApiVersion("1.0")]
    public async Task<IActionResult> CreateCartItem([FromForm]CartItemReqDTO model)
    {
        try
        {
            CartItemResDTO cartItem = await _cartItemService.CreateEntityAsync(model);
            return ResponseHelper.CreatedSuccessfullyResponse(new CreatedSuccessfullyResponseModel<CartItemResDTO>()
            {
                Message = "Created cartItem successfully!",
                Record = cartItem,
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
                Message = "Invalid information about cartItem",
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
    public async Task<IActionResult> UpdateCartItem([FromRoute]Guid id, [FromForm]CartItemReqDTO model)
    {
        try
        {
            CartItemResDTO cartItem = await _cartItemService.UpdateEntityAsync(id, model);
            return ResponseHelper.UpdatedSuccessfullyResponse(new UpdatedSuccessfullyResponseModel<CartItemResDTO>()
            {
                Message = "Updated cartItem successfully!",
                Record = cartItem,
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
                Message = "Invalid information about cartItem",
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
    public async Task<IActionResult> DeleteCartItem([FromRoute]Guid id)
    {
        try
        {
            await _cartItemService.DeleteEntityAsync(id);
            return ResponseHelper.DeletedSuccessfullyResponse(new DeletedSuccessfullyResponseModel()
            {
                Message = "Deleted cartItem successfully!",
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

    [HttpDelete("session/{sessionId}"), MapToApiVersion("1.0")]
    public async Task<IActionResult> DeleteCartItemList([FromRoute]Guid sessionId)
    {
        try
        {
            await _cartItemService.DeleteEntityListAsync(sessionId);
            return ResponseHelper.DeletedSuccessfullyResponse(new DeletedSuccessfullyResponseModel()
            {
                Message = "Deleted cartItem list successfully!",
                RecordId = sessionId.ToString(),
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