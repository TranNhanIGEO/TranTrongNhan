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

public class PaymentTransactionController : ControllerBase
{
    private readonly IPaymentTransactionService _paymentTransactionService;
    private readonly ILogger<PaymentTransactionController> _logger;

    public PaymentTransactionController(IPaymentTransactionService paymentTransactionService, ILogger<PaymentTransactionController> logger)
    {
        _paymentTransactionService = paymentTransactionService;
        _logger = logger;
    }

    [HttpGet, MapToApiVersion("1.0")]
    public async Task<IActionResult> GetPaymentTransactions([FromQuery]QueryModel queryParams)
    {
        try
        {
            var paymentTransactionRecords = await _paymentTransactionService.FetchEntitiesAsync(queryParams);
            int totalRecords = await _paymentTransactionService.CountEntityAsync(queryParams);
            int filteredRecords = totalRecords;

            if (!string.IsNullOrEmpty(queryParams.SearchTerm))
            {
                filteredRecords = await _paymentTransactionService.CountEntityAsync(queryParams);
            }
            
            return ResponseHelper.GetListSuccessfullyResponse(new GetListSuccessfullyResponseModel<PaymentTransactionResDTO>()
            {
                Records = paymentTransactionRecords,
                TotalRecords = totalRecords,
                FilteredRecords = filteredRecords,
                Message = "Retrieved paymentTransactions successfully"
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
    public async Task<IActionResult> GetPaymentTransactionById([FromRoute]Guid id)
    {
        try
        {
            PaymentTransactionResDTO? paymentTransaction = await _paymentTransactionService.FetchEntityByIdAsync(id);

            return ResponseHelper.GetOnlySuccessfullyResponse(new GetOnlySuccessfullyResponseModel<PaymentTransactionResDTO>()
            {
                Record = paymentTransaction,
                Message = "Retrieved paymentTransaction successfully"
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