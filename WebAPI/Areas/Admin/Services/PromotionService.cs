using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Repositories.Interfaces;
using SoftKiwiFlorist.Areas.Admin.Services.Interfaces;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;
using SoftKiwiFlorist.Repositories.Base.Interfaces;

namespace SoftKiwiFlorist.Areas.Admin.Services;

public class AdminPromotionService : IAdminPromotionService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IPromotionRepository _promotionRepository;
    private readonly IValidator<PromotionReqDTO> _validatorReqDTO;
    private readonly Dictionary<string, Func<Promotion, object>> _normalizedTermProperties;

    public AdminPromotionService(
        IMapper mapper, 
        IUnitOfWork unitOfWork, 
        IPromotionRepository promotionRepository, 
        IValidator<PromotionReqDTO> validatorReqDTO)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
        _promotionRepository = promotionRepository;
        _validatorReqDTO = validatorReqDTO;
        _normalizedTermProperties = new Dictionary<string, Func<Promotion, object>>()
        {
            { nameof(Promotion.Name), c => c.Name },
            { nameof(Promotion.Description), c => c.Description },
            { nameof(Promotion.Discount), c => c.Discount! },
            { nameof(Promotion.DiscountPercentage), c => c.DiscountPercentage! },
            { nameof(Promotion.StartAt), c => c.StartAt.ToString("O") },
            { nameof(Promotion.EndAt), c => c.EndAt.ToString("O") },
        };
    }

    public async Task<PromotionResDTO> CreateEntityAsync(PromotionReqDTO model)
    {
        if (model == null)
        {
            throw new BadRequestException("Promotion request DTO cannot be null");
        }

        ValidationResult validationResult = await _validatorReqDTO.ValidateAsync(model);

        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }
        
        Promotion newPromotion = _mapper.Map<Promotion>(model);
        EntityHelper.SetIdValue(newPromotion);
        EntityHelper.SetNormalizedTermValue(newPromotion, _normalizedTermProperties);

        await _promotionRepository.AddEntityAsync(newPromotion);
        await _unitOfWork.SaveChangesAsync();
        
        return _mapper.Map<PromotionResDTO>(newPromotion);
    }

    public async Task<PromotionResDTO> UpdateEntityAsync(Guid id, PromotionReqDTO model)
    {
        if (model == null)
        {
            throw new BadRequestException("Promotion request DTO cannot be null");
        }

        if (id == Guid.Empty)
        {
            throw new BadRequestException("ID cannot be empty");
        }

        Promotion? promotionRecord = await _promotionRepository.GetEntityByIdAsync(id);

        if (promotionRecord == null)
        {
            throw new NotFoundException("Promotion not found");
        }

        ValidationResult validationResult = await _validatorReqDTO.ValidateAsync(model);

        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }

        _mapper.Map(model, promotionRecord);
        EntityHelper.SetNormalizedTermValue(promotionRecord, _normalizedTermProperties);

        await _promotionRepository.UpdateEntityAsync(promotionRecord);
        await _unitOfWork.SaveChangesAsync();
        
        return _mapper.Map<PromotionResDTO>(promotionRecord);
    }

    public async Task<Guid> DeleteEntityAsync(Guid id)
    {
        if (id == Guid.Empty)
        {
            throw new BadRequestException("ID cannot be empty");
        }
        
        Promotion? promotionRecord = await _promotionRepository.GetEntityByIdAsync(id);

        if (promotionRecord == null)
        {
            throw new NotFoundException("Promotion not found");
        }

        await _promotionRepository.RemoveEntityAsync(promotionRecord);
        await _unitOfWork.SaveChangesAsync();
        
        return promotionRecord.Id;
    }
}