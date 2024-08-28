using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Models;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;
using SoftKiwiFlorist.Areas.Admin.Services.Interfaces;
using SoftKiwiFlorist.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore.Storage;
using SoftKiwiFlorist.Repositories.Base.Interfaces;

namespace SoftKiwiFlorist.Areas.Admin.Services;

public class AdminOrderStatusHistoryService : IAdminOrderStatusHistoryService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IOrderStatusHistoryRepository _orderStatusHistoryRepository;
    private readonly IValidator<OrderStatusHistoryReqDTO> _validatorReqDTO;

    public AdminOrderStatusHistoryService(
        IMapper mapper, 
        IUnitOfWork unitOfWork, 
        IOrderStatusHistoryRepository orderStatusHistoryRepository, 
        IValidator<OrderStatusHistoryReqDTO> validatorReqDTO)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
        _orderStatusHistoryRepository = orderStatusHistoryRepository;
        _validatorReqDTO = validatorReqDTO;
    }

    public async Task<OrderStatusHistoryResDTO> UpdateEntityAsync(Guid orderId, OrderStatusHistoryReqDTO model)
    {
        if (model == null)
        {
            throw new BadRequestException("OrderStatusHistory request DTO cannot be null");
        }
        
        if (orderId == Guid.Empty)
        {
            throw new BadRequestException("Order Id cannot be null");
        }
        
        if (orderId != model.OrderId)
        {
            throw new BadRequestException("Invalid Order Id");
        }

        IList<OrderStatusHistory>? orderStatusHistoryRecords = await _orderStatusHistoryRepository.GetEntitiesByConditionAsync(osh => osh.OrderId == orderId);

        if (!orderStatusHistoryRecords.Any())
        {
            throw new NotFoundException("OrderStatus record not found");
        }

        OrderStatusHistory? existingOrderStatus = orderStatusHistoryRecords.FirstOrDefault(os => os.OrderStatusId == model.OrderStatusId);

        if (existingOrderStatus != null)
        {
            return _mapper.Map<OrderStatusHistoryResDTO>(orderStatusHistoryRecords);
        }

        ValidationResult validationResult = await _validatorReqDTO.ValidateAsync(model);
        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }
        
        OrderStatusHistory newOrderStatusHistory = _mapper.Map<OrderStatusHistory>(model);
        EntityHelper.SetDateTimeValue(newOrderStatusHistory, nameof(OrderStatusHistory.UpdatedAt));

        await _orderStatusHistoryRepository.AddEntityAsync(newOrderStatusHistory);
        await _unitOfWork.SaveChangesAsync();

        return _mapper.Map<OrderStatusHistoryResDTO>(newOrderStatusHistory);
    }
}