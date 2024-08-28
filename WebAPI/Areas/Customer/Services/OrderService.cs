using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;
using SoftKiwiFlorist.Areas.Customer.Services.Interfaces;
using SoftKiwiFlorist.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore.Storage;
using SoftKiwiFlorist.Repositories.Base.Interfaces;
using SoftKiwiFlorist.Models.Enums;
using SoftKiwiFlorist.Services.Interfaces;
using System.Text.Json;

namespace SoftKiwiFlorist.Areas.Customer.Services;

public class CustomerOrderService : ICustomerOrderService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IOrderRepository _orderRepository;
    private readonly IOrderStatusService _orderStatusService;
    private readonly ICustomerOrderDetailService _orderDetailService;
    private readonly ICustomerOrderStatusHistoryService _orderStatusHistoryService;
    private readonly IValidator<OrderReqDTO> _validatorReqDTO;
    private readonly Dictionary<string, Func<Order, object>> _normalizedTermProperties;

    public CustomerOrderService(
        IMapper mapper, 
        IUnitOfWork unitOfWork, 
        IOrderRepository orderRepository, 
        IOrderStatusService orderStatusService, 
        ICustomerOrderDetailService orderDetailService, 
        ICustomerOrderStatusHistoryService orderStatusHistoryService,
        IValidator<OrderReqDTO> validatorReqDTO)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
        _orderRepository = orderRepository;
        _orderStatusService = orderStatusService;
        _orderDetailService = orderDetailService;
        _orderStatusHistoryService = orderStatusHistoryService;
        _validatorReqDTO = validatorReqDTO;
        _normalizedTermProperties = new Dictionary<string, Func<Order, object>>()
        {
            { nameof(Order.User), c => c.User?.FullName! },
            { nameof(Order.OrderStatus), c => c.OrderStatus?.Status! },
            { nameof(Order.ReceiverName), c => c.ReceiverName },
            { nameof(Order.ReceiverAddress), c => c.ReceiverAddress },
            { nameof(Order.PhoneNumber), c => c.PhoneNumber },
            { nameof(Order.TotalAmount), c => c.TotalAmount },
            { nameof(Order.Note), c => c.Note! },
            { nameof(Order.OrderAt), c => c.OrderAt.ToString("O") }
        };
    }

    public async Task PlaceOrder(OrderReqDTO model)
    {
        using IDbContextTransaction transaction = await _unitOfWork.BeginTransactionAsync();

        if (model == null)
        {
            throw new BadRequestException("Order request DTO cannot be null");
        }

        try
        {
            string originalOrderStatus = nameof(OrderStatusTypes.Pending);
            OrderStatusDTO orderStatusDTO = await _orderStatusService.FecthEntityByConditionAsync(x => x.Status == originalOrderStatus);
            
            model.OrderStatusId = orderStatusDTO.Id;
            Order newOrder = await this.CreateOrderAsync(model);
            
            // model.OrderDetails?.ToList().ForEach(od => od.OrderId = newOrder.Id);
            // IList<OrderDetailResDTO> orderDetails = await _orderDetailService.CreateEntityListAsync(model.OrderDetails!);
            // Console.WriteLine(JsonSerializer.Serialize(orderDetails, new JsonSerializerOptions { WriteIndented = true }));

            OrderStatusHistoryReqDTO orderStatusHistoryReqDTO = new OrderStatusHistoryReqDTO();
            orderStatusHistoryReqDTO.OrderId = newOrder.Id;
            orderStatusHistoryReqDTO.OrderStatusId = orderStatusDTO.Id;
            await _orderStatusHistoryService.CreateEntityAsync(orderStatusHistoryReqDTO);

            await _orderRepository.AddEntityAsync(newOrder);

            await _unitOfWork.SaveChangesAsync();
            await _unitOfWork.EndTransactionAsync(transaction);
        }
        catch
        {
            await _unitOfWork.RollbackTransactionAsync(transaction);
        }
    }

    public async Task<Order> CreateOrderAsync(OrderReqDTO model)
    {
        if (model == null)
        {
            throw new BadRequestException("Order request DTO cannot be null");
        }

        ValidationResult validationResult = await _validatorReqDTO.ValidateAsync(model);

        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }
        
        Order newOrder = _mapper.Map<Order>(model);
        EntityHelper.SetIdValue(newOrder);
        EntityHelper.SetDateTimeValue(newOrder, nameof(Order.OrderAt));
        EntityHelper.SetNormalizedTermValue(newOrder, _normalizedTermProperties);
        
        return newOrder;
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
        EntityHelper.SetDateTimeValue(orderRecord, nameof(Order.OrderAt));
        EntityHelper.SetNormalizedTermValue(orderRecord, _normalizedTermProperties);

        await _orderRepository.UpdateEntityAsync(orderRecord);
        
        return _mapper.Map<OrderResDTO>(orderRecord);
    }
}