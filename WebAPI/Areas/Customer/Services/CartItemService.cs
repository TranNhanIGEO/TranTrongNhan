using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;
using SoftKiwiFlorist.Areas.Customer.Services.Interfaces;
using SoftKiwiFlorist.Repositories.Interfaces;
using SoftKiwiFlorist.Repositories.Base.Interfaces;

namespace SoftKiwiFlorist.Areas.Customer.Services;

public class CustomerCartItemService : ICustomerCartItemService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICartItemRepository _cartRepository;
    private readonly IValidator<CartItemReqDTO> _validatorReqDTO;

    public CustomerCartItemService(
        IMapper mapper, 
        IUnitOfWork unitOfWork, 
        ICartItemRepository cartRepository, 
        IValidator<CartItemReqDTO> validatorReqDTO)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
        _cartRepository = cartRepository;
        _validatorReqDTO = validatorReqDTO;
    }

    public async Task<CartItemResDTO> CreateEntityAsync(CartItemReqDTO model)
    {
        if (model == null)
        {
            throw new BadRequestException("Cart request DTO cannot be null");
        }

        ValidationResult validationResult = await _validatorReqDTO.ValidateAsync(model);

        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }
        
        CartItem newCart = _mapper.Map<CartItem>(model);

        await _cartRepository.AddEntityAsync(newCart);
        await _unitOfWork.SaveChangesAsync();

        return _mapper.Map<CartItemResDTO>(newCart);
    }

    public async Task<CartItemResDTO> UpdateEntityAsync(Guid id, CartItemReqDTO model)
    {
        if (model == null)
        {
            throw new BadRequestException("Cart request DTO cannot be null");
        }

        if (id == Guid.Empty)
        {
            throw new BadRequestException("ID cannot be empty");
        }

        CartItem? cartRecord = await _cartRepository.GetEntityByIdAsync(id);

        if (cartRecord == null)
        {
            throw new NotFoundException("Cart not found");
        }

        ValidationResult validationResult = await _validatorReqDTO.ValidateAsync(model);

        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }

        _mapper.Map(model, cartRecord);

        await _cartRepository.UpdateEntityAsync(cartRecord);
        await _unitOfWork.SaveChangesAsync();

        return _mapper.Map<CartItemResDTO>(cartRecord);
    }

    public async Task<Guid> DeleteEntityAsync(Guid id)
    {
        if (id == Guid.Empty)
        {
            throw new BadRequestException("ID cannot be empty");
        }
        
        CartItem? cartRecord = await _cartRepository.GetEntityByIdAsync(id);

        if (cartRecord == null)
        {
            throw new NotFoundException("Cart not found");
        }

        await _cartRepository.RemoveEntityAsync(cartRecord);
        await _unitOfWork.SaveChangesAsync();

        return id;
    }

    public async Task<Guid> DeleteEntityListAsync(Guid sessionId)
    {
        if (sessionId == Guid.Empty)
        {
            throw new BadRequestException("ID cannot be empty");
        }
        
        IList<CartItem> cartRecords = await _cartRepository.GetEntitiesByConditionAsync(i => i.SessionId == sessionId);

        if (!cartRecords.Any())
        {
            throw new NotFoundException("Cart not found");
        }

        await _cartRepository.RemoveEntityListAsync(cartRecords);
        await _unitOfWork.SaveChangesAsync();

        return sessionId;
    }
}