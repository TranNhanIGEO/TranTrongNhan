using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Repositories.Interfaces;
using SoftKiwiFlorist.Areas.Admin.Services.Interfaces;
using SoftKiwiFlorist.Models;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;
using SoftKiwiFlorist.Repositories.Base.Interfaces;

namespace SoftKiwiFlorist.Areas.Admin.Services;

public class AdminOrderService : IAdminOrderService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IOrderRepository _orderRepository;
    private readonly IValidator<OrderReqDTO> _validatorReqDTO;
    private readonly Dictionary<string, Func<Order, object>> _normalizedTermProperties;

    public AdminOrderService(
        IMapper mapper, 
        IUnitOfWork unitOfWork, 
        IOrderRepository orderRepository, 
        IValidator<OrderReqDTO> validatorReqDTO)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
        _orderRepository = orderRepository;
        _validatorReqDTO = validatorReqDTO;
        _normalizedTermProperties = new Dictionary<string, Func<Order, object>>()
        {
            { nameof(Order.ReceiverName), c => c.ReceiverName },
            { nameof(Order.ReceiverAddress), c => c.ReceiverAddress },
            { nameof(Order.PhoneNumber), c => c.PhoneNumber },
            // { nameof(Order.OrderAt), c => c.OrderAt.ToString("O") },
            // { nameof(Order.DeliveryAt), c => c.DeliveryAt.ToString("O") },
        };
    }

    public async Task<OrderResDTO> UpdateEntityAsync(Guid id, OrderReqDTO model)
    {
        if (model == null)
        {
            throw new BadRequestException("Order request DTO cannot be null");
        }

        if (id == Guid.Empty)
        {
            throw new BadRequestException("ID cannot be empty");
        }

        Order? orderRecord = await _orderRepository.GetEntityByIdAsync(id);

        if (orderRecord == null)
        {
            throw new NotFoundException("Order not found");
        }

        ValidationResult validationResult = await _validatorReqDTO.ValidateAsync(model);

        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }

        _mapper.Map(model, orderRecord);
        // EntityHelper.SetDateTimeValue(orderRecord, new[] { nameof(Order.OrderAt) });
        EntityHelper.SetNormalizedTermValue(orderRecord, _normalizedTermProperties);

        await _orderRepository.UpdateEntityAsync(orderRecord);
        await _unitOfWork.SaveChangesAsync();
        
        return _mapper.Map<OrderResDTO>(orderRecord);
    }
}