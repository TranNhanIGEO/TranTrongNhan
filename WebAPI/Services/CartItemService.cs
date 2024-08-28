using AutoMapper;
using SoftKiwiFlorist.Repositories.Interfaces;
using SoftKiwiFlorist.Models.Query;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;
using SoftKiwiFlorist.Services.Base;
using SoftKiwiFlorist.Services.Interfaces;
using SoftKiwiFlorist.Helpers;

namespace SoftKiwiFlorist.Services;

public class CartItemService : BaseReaderService<CartItem, CartItemResDTO, CartQueryModel>, ICartItemService
{
    private readonly ICartItemRepository _cartItemRepository;

    public CartItemService(IMapper mapper, ICartItemRepository cartItemRepository) : base(mapper, cartItemRepository)
    {
        _cartItemRepository = cartItemRepository;
    }

    private IQueryable<CartItem> ApplyFindByCondition(IQueryable<CartItem> query, CartQueryModel queryParams)
    {
        if (queryParams.SessionId != Guid.Empty)
        {
            query = query.Where(o => o.SessionId == queryParams.SessionId);
        }
        return query;
    }

    public new async Task<IList<CartItemResDTO>> FetchEntitiesAsync(CartQueryModel queryParams)
    {
        if (queryParams == null) 
        {
            throw new BadRequestException("Query parameters cannot be null");
        }

        IQueryable<CartItem> query = _cartItemRepository.GetContext();

        query = ApplyFindByCondition(query, queryParams);
        query = ApplyFiltering(query, queryParams);
        query = ApplySorting(query, queryParams);
        query = ApplyPaging(query, queryParams);

        IList<CartItem> cartItemRecords = await _cartItemRepository.GetEntitiesByExcuteQueryAsync(query);

        return _mapper.Map<IList<CartItemResDTO>>(cartItemRecords);
    }

    public new async Task<int> CountEntityAsync(CartQueryModel queryParams)
    {
        if (queryParams == null) 
        {
            throw new BadRequestException("Query parameters cannot be null");
        }

        IQueryable<CartItem> query = _cartItemRepository.GetContext();

        query = ApplyFindByCondition(query, queryParams);
        
        if (string.IsNullOrEmpty(queryParams.SearchTerm))
        {
            return await _cartItemRepository.CountEntityByExcuteQueryAsync(query);
        }

        query = ApplyFiltering(query, queryParams);

        return await _cartItemRepository.CountEntityByExcuteQueryAsync(query);
    }
}