using AutoMapper;
using SoftKiwiFlorist.Services.Interfaces;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;
using SoftKiwiFlorist.Models.Query;
using SoftKiwiFlorist.Repositories.Interfaces;
using SoftKiwiFlorist.Services.Base;

namespace SoftKiwiFlorist.Services;

public class OrderStatusService : BaseReaderService<OrderStatus, OrderStatusDTO, QueryModel>, IOrderStatusService
{
    private readonly IOrderStatusRepository _orderStatusRepository;

    public OrderStatusService(IMapper mapper, IOrderStatusRepository orderStatusRepository) : base(mapper, orderStatusRepository)
    {
        _orderStatusRepository = orderStatusRepository;
    }
}