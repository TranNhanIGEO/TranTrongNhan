using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Areas.Customer.Services.Interfaces;
using SoftKiwiFlorist.Models.Response;
using SoftKiwiFlorist.Models.DTOs;

namespace SoftKiwiFlorist.Areas.Customer.Controllers;
[ApiController]
[ApiVersion("1.0")]
[Area("Customer")]
[Route("api/customer/v{version:apiVersion}/shoppingSession")]

public class CustomerShoppingSessionController : ControllerBase
{
    private readonly ICustomerShoppingSessionService _shoppingSessionService;
    private readonly ILogger<CustomerShoppingSessionController> _logger;

    public CustomerShoppingSessionController(ICustomerShoppingSessionService shoppingSessionService, ILogger<CustomerShoppingSessionController> logger)
    {
        _shoppingSessionService = shoppingSessionService;
        _logger = logger;
    }

    [HttpPost, MapToApiVersion("1.0")]
    public async Task<IActionResult> CreateShoppingSession([FromForm]ShoppingSessionReqDTO model)
    {
        try
        {
            ShoppingSessionResDTO shoppingSession = await _shoppingSessionService.CreateEntityAsync(model);
            return ResponseHelper.CreatedSuccessfullyResponse(new CreatedSuccessfullyResponseModel<ShoppingSessionResDTO>()
            {
                Message = "Created shoppingSession successfully!",
                Record = shoppingSession,
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

    [HttpPut("{id}"), MapToApiVersion("1.0")]
    public async Task<IActionResult> UpdateShoppingSession([FromRoute]Guid id, [FromForm]ShoppingSessionReqDTO model)
    {
        try
        {
            ShoppingSessionResDTO shoppingSession = await _shoppingSessionService.UpdateEntityAsync(id, model);
            return ResponseHelper.UpdatedSuccessfullyResponse(new UpdatedSuccessfullyResponseModel<ShoppingSessionResDTO>()
            {
                Message = "Updated shoppingSession successfully!",
                Record = shoppingSession,
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