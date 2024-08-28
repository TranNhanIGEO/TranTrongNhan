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

public class PromotionProductService : BaseReaderService<PromotionProduct, PromotionProductResDTO, QueryModel>, IPromotionProductService
{
    private readonly IPromotionProductRepository _promotionProductRepository;

    public PromotionProductService(IMapper mapper, IPromotionProductRepository promotionProductRepository) : base(mapper, promotionProductRepository)
    {
        _promotionProductRepository = promotionProductRepository;
    }
    public async Task<IList<PromotionProduct>> FetchLastestPromotionForProduct(IList<Guid> productIds)
    {
        if (productIds == null)
        {
            throw new BadRequestException("Product Ids cannot be null");
        }

        IQueryable<PromotionProduct> query = _promotionProductRepository.GetContext();
        
        DateTime currentDateTime = DateHelper.GetCurrentDateTime();

        query = query
            .Where(pp => productIds.Contains(pp!.ProductId) && pp!.Promotion!.EndAt >= currentDateTime)
            .GroupBy(pp => pp!.PromotionId)
            .Select(g => g.OrderByDescending(pp => pp!.Promotion!.EndAt).FirstOrDefault())!;

        IList<PromotionProduct> records = await _promotionProductRepository.GetEntitiesByExcuteQueryAsync(query);

        return _mapper.Map<IList<PromotionProduct>>(records);
    }
}