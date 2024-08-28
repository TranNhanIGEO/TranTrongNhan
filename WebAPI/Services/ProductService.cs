using AutoMapper;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Repositories.Interfaces;
using SoftKiwiFlorist.Services.Interfaces;
using SoftKiwiFlorist.Models.Query;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;
using SoftKiwiFlorist.Services.Base;

namespace SoftKiwiFlorist.Services;

public class ProductService : BaseReaderService<Product, ProductResDTO, ProductQueryModel>, IProductService
{
    private readonly IProductRepository _productRepository;

    public ProductService(IMapper mapper, IProductRepository productRepository) : base(mapper, productRepository)
    {
        _productRepository = productRepository;
    }

    private IQueryable<Product> ApplyFindByCondition(IQueryable<Product> query, ProductQueryModel queryParams)
    {
        Guid[]? categoryIds = queryParams.CategoryIds;
        decimal[]? fromValues = queryParams.FromValues;
        decimal[]? toValues = queryParams.ToValues;
        bool? isNew = queryParams.IsNew;
        bool? isBestSelling = queryParams.IsBestSelling;

        if (categoryIds != null && categoryIds.Any())
        {
            query = query.Where(p => categoryIds.Contains(p.CategoryId));
        }

        if (fromValues != null && fromValues.Any() && toValues != null && toValues.Any())
        {
            query = query.Where(p => p.Price >= fromValues.Min() && p.Price <= toValues.Max());
        }

        if (isNew != null && isNew.Value)
        {
            query = query.Where(p => p.CreatedAt >= DateHelper.GetCurrentDateTime().AddMonths(-3));
        }

        if (isBestSelling != null && isBestSelling.Value)
        {
            query = query.OrderByDescending(p => p.OrderDetails.Sum(od => od.Quantity));
        }

        return query;
    }

    public new async Task<IList<ProductResDTO>> FetchEntitiesAsync(ProductQueryModel queryParams)
    {
        if (queryParams == null) 
        {
            throw new BadRequestException("Query parameters cannot be null");
        }

        IQueryable<Product> query = _productRepository.GetContext();

        query = ApplyFindByCondition(query, queryParams);
        query = ApplyFiltering(query, queryParams);

        if (queryParams.IsBestSelling == null || !queryParams.IsBestSelling.Value)
        {
            query = ApplySorting(query, queryParams);
        }

        query = ApplyPaging(query, queryParams);

        IList<Product> productRecords = await _productRepository.GetEntitiesByExcuteQueryAsync(query);

        return _mapper.Map<IList<ProductResDTO>>(productRecords);
    }

    public new async Task<int> CountEntityAsync(ProductQueryModel queryParams)
    {
        if (queryParams == null) 
        {
            throw new BadRequestException("Query parameters cannot be null");
        }

        IQueryable<Product> query = _productRepository.GetContext();

        query = ApplyFindByCondition(query, queryParams);

        if (string.IsNullOrEmpty(queryParams.SearchTerm))
        {
            return await _productRepository.CountEntityByExcuteQueryAsync(query);
        }

        query = ApplyFiltering(query, queryParams);

        return await _productRepository.CountEntityByExcuteQueryAsync(query);
    }
}