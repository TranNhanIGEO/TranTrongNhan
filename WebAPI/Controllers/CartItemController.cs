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

public class CartItemController : ControllerBase
{
    private readonly ICartItemService _cartItemService;
    private readonly ILogger<CartItemController> _logger;

    public CartItemController(ICartItemService cartItemService, ILogger<CartItemController> logger)
    {
        _cartItemService = cartItemService;
        _logger = logger;
    }

    [HttpGet, MapToApiVersion("1.0")]
    public async Task<IActionResult> GetCartItems([FromQuery]CartQueryModel queryParams)
    {
        try
        {
            var cartItemRecords = await _cartItemService.FetchEntitiesAsync(queryParams);

            return ResponseHelper.GetListSuccessfullyResponse(new GetListSuccessfullyResponseModel<CartItemResDTO>()
            {
                Records = cartItemRecords,
                Message = "Retrieved cart items successfully"
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
}