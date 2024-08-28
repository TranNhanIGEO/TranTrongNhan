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
[Route("api/customer/v{version:apiVersion}/paymentTransaction")]

public class CustomerPaymentTransactionController : ControllerBase
{
    private readonly ICustomerPaymentTransactionService _paymentTransactionService;
    private readonly ILogger<CustomerPaymentTransactionController> _logger;

    public CustomerPaymentTransactionController(ICustomerPaymentTransactionService paymentTransactionService, ILogger<CustomerPaymentTransactionController> logger)
    {
        _paymentTransactionService = paymentTransactionService;
        _logger = logger;
    }

    [HttpPost, MapToApiVersion("1.0")]
    public async Task<IActionResult> CreatePaymentTransaction([FromForm]PaymentTransactionReqDTO model)
    {
        try
        {
            PaymentTransactionResDTO paymentTransaction = await _paymentTransactionService.CreateEntityAsync(model);
            return ResponseHelper.CreatedSuccessfullyResponse(new CreatedSuccessfullyResponseModel<PaymentTransactionResDTO>()
            {
                Message = "Created payment transaction successfully!",
                Record = paymentTransaction,
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
                Message = "Invalid information about paymentTransaction",
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
    public async Task<IActionResult> UpdatePaymentTransaction([FromRoute]Guid id, [FromForm]PaymentTransactionReqDTO model)
    {
        try
        {
            PaymentTransactionResDTO paymentTransaction = await _paymentTransactionService.UpdateEntityAsync(id, model);
            return ResponseHelper.UpdatedSuccessfullyResponse(new UpdatedSuccessfullyResponseModel<PaymentTransactionResDTO>()
            {
                Message = "Updated payment transaction successfully!",
                Record = paymentTransaction,
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
                Message = "Invalid information about paymentTransaction",
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