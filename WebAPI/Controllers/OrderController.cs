using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Models.Response;
using SoftKiwiFlorist.Models.Query;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Services.Interfaces;

namespace SoftKiwiFlorist.Controllers;
[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]

public class OrderController : ControllerBase
{
    private readonly IOrderService _orderService;
    private readonly ILogger<OrderController> _logger;

    public OrderController(IOrderService orderService, ILogger<OrderController> logger)
    {
        _orderService = orderService;
        _logger = logger;
    }

    [HttpGet, MapToApiVersion("1.0")]
    public async Task<IActionResult> GetOrders([FromQuery]OrderQueryModel queryParams)
    {
        try
        {
            var orderRecords = await _orderService.FetchEntitiesAsync(queryParams);
            int totalRecords = await _orderService.CountEntityAsync(queryParams);
            int filteredRecords = totalRecords;

            if (!string.IsNullOrEmpty(queryParams.SearchTerm))
            {
                filteredRecords = await _orderService.CountEntityAsync(queryParams);
            }
            
            return ResponseHelper.GetListSuccessfullyResponse(new GetListSuccessfullyResponseModel<OrderResDTO>()
            {
                Records = orderRecords,
                TotalRecords = totalRecords,
                FilteredRecords = filteredRecords,
                Message = "Retrieved orders successfully"
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
    public async Task<IActionResult> GetOrderById([FromRoute]Guid id)
    {
        try
        {
            OrderResDTO? order = await _orderService.FetchEntityByIdAsync(id);

            return ResponseHelper.GetOnlySuccessfullyResponse(new GetOnlySuccessfullyResponseModel<OrderResDTO>()
            {
                Record = order,
                Message = "Retrieved order successfully"
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
