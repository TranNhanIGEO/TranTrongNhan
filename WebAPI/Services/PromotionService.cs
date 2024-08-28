using AutoMapper;
using SoftKiwiFlorist.Repositories.Interfaces;
using SoftKiwiFlorist.Services.Interfaces;
using SoftKiwiFlorist.Models.Query;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;
using SoftKiwiFlorist.Services.Base;

namespace SoftKiwiFlorist.Services;

public class PromotionService : BaseReaderService<Promotion, PromotionResDTO, QueryModel>, IPromotionService
{
    private readonly IPromotionRepository _promotionRepository;

    public PromotionService(IMapper mapper, IPromotionRepository promotionRepository) : base(mapper, promotionRepository)
    {
        _promotionRepository = promotionRepository;
    }
}