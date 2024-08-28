using AutoMapper;
using FluentValidation;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Repositories.Interfaces;
using SoftKiwiFlorist.Services.Interfaces;
using SoftKiwiFlorist.Models.Query;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;
using SoftKiwiFlorist.Services.Base;

namespace SoftKiwiFlorist.Services;

public class OrderService : BaseReaderService<Order, OrderResDTO, OrderQueryModel>, IOrderService
{
    private readonly IOrderRepository _orderRepository;

    public OrderService(IMapper mapper, IOrderRepository orderRepository) : base(mapper, orderRepository)
    {
        _orderRepository = orderRepository;
    }

    private IQueryable<Order> ApplyFindByCondition(IQueryable<Order> query, OrderQueryModel queryParams)
    {
        if (!string.IsNullOrEmpty(queryParams.UserId))
        {
            query = query.Where(o => o.UserId == queryParams.UserId);
        }
        return query;
    }

    public new async Task<IList<OrderResDTO>> FetchEntitiesAsync(OrderQueryModel queryParams)
    {
        if (queryParams == null) 
        {
            throw new BadRequestException("Query parameters cannot be null");
        }

        IQueryable<Order> query = _orderRepository.GetContext();

        query = ApplyFindByCondition(query, queryParams);
        query = ApplyFiltering(query, queryParams);
        query = ApplySorting(query, queryParams);
        query = ApplyPaging(query, queryParams);

        IList<Order> orderRecords = await _orderRepository.GetEntitiesByExcuteQueryAsync(query);

        return _mapper.Map<IList<OrderResDTO>>(orderRecords);
    }

    public new async Task<int> CountEntityAsync(OrderQueryModel queryParams)
    {
        if (queryParams == null) 
        {
            throw new BadRequestException("Query parameters cannot be null");
        }

        IQueryable<Order> query = _orderRepository.GetContext();

        query = ApplyFindByCondition(query, queryParams);
        
        if (string.IsNullOrEmpty(queryParams.SearchTerm))
        {
            return await _orderRepository.CountEntityByExcuteQueryAsync(query);
        }

        query = ApplyFiltering(query, queryParams);

        return await _orderRepository.CountEntityByExcuteQueryAsync(query);
    }
}