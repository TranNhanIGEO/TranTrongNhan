using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;
using SoftKiwiFlorist.Areas.Customer.Services.Interfaces;
using SoftKiwiFlorist.Repositories.Interfaces;

namespace SoftKiwiFlorist.Areas.Customer.Services;

public class CustomerOrderStatusHistoryService : ICustomerOrderStatusHistoryService
{
    private readonly IMapper _mapper;
    private readonly IOrderStatusHistoryRepository _orderStatusHistoryRepository;
    private readonly IValidator<OrderStatusHistoryReqDTO> _validatorReqDTO;

    public CustomerOrderStatusHistoryService(
        IMapper mapper, 
        IOrderStatusHistoryRepository orderStatusHistoryRepository, 
        IValidator<OrderStatusHistoryReqDTO> validatorReqDTO)
    {
        _mapper = mapper;
        _orderStatusHistoryRepository = orderStatusHistoryRepository;
        _validatorReqDTO = validatorReqDTO;
    }

    public async Task<OrderStatusHistoryResDTO> CreateEntityAsync(OrderStatusHistoryReqDTO model)
    {
        if (model == null)
        {
            throw new BadRequestException("OrderStatusHistory request DTO cannot be null");
        }

        ValidationResult validationResult = await _validatorReqDTO.ValidateAsync(model);
        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }
        
        OrderStatusHistory newOrderStatusHistory = _mapper.Map<OrderStatusHistory>(model);
        EntityHelper.SetDateTimeValue(newOrderStatusHistory, nameof(OrderStatusHistory.UpdatedAt));

        await _orderStatusHistoryRepository.AddEntityAsync(newOrderStatusHistory);

        return _mapper.Map<OrderStatusHistoryResDTO>(newOrderStatusHistory);
    }
}