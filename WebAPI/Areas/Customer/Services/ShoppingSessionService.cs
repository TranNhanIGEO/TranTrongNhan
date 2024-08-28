using AutoMapper;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;
using SoftKiwiFlorist.Areas.Customer.Services.Interfaces;
using SoftKiwiFlorist.Repositories.Interfaces;
using SoftKiwiFlorist.Repositories.Base.Interfaces;
using SoftKiwiFlorist.Models.Enums;
using SoftKiwiFlorist.Services.Interfaces;

namespace SoftKiwiFlorist.Areas.Customer.Services;

public class CustomerShoppingSessionService : ICustomerShoppingSessionService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IShoppingSessionRepository _shoppingSessionRepository;
    private readonly ISessionStatusService _sessionService;

    public CustomerShoppingSessionService(
        IMapper mapper, 
        IUnitOfWork unitOfWork, 
        IShoppingSessionRepository shoppingSessionRepository, 
        ISessionStatusService sessionService)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
        _shoppingSessionRepository = shoppingSessionRepository;
        _sessionService = sessionService;
    }

    public async Task<ShoppingSessionResDTO> CreateEntityAsync(ShoppingSessionReqDTO model)
    {
        if (model == null)
        {
            throw new BadRequestException("ShoppingSession DTO cannot be null");
        }

        ShoppingSession newShoppingSession = _mapper.Map<ShoppingSession>(model);
        EntityHelper.SetIdValue(newShoppingSession);
        EntityHelper.SetDateTimeValue(newShoppingSession, new[] { nameof(ShoppingSession.CreatedAt), nameof(ShoppingSession.UpdatedAt) });

        SessionStatusDTO sessionStatus = await _sessionService.FecthEntityByConditionAsync(ss => ss.Status == nameof(SessionStatusTypes.Active));
        newShoppingSession.SessionStatusId = sessionStatus.Id;

        await _shoppingSessionRepository.AddEntityAsync(newShoppingSession);
        await _unitOfWork.SaveChangesAsync();

        return _mapper.Map<ShoppingSessionResDTO>(newShoppingSession);
    }

    public async Task<ShoppingSessionResDTO> UpdateEntityAsync(Guid id, ShoppingSessionReqDTO model)
    {
        if (model == null)
        {
            throw new BadRequestException("ShoppingSession DTO cannot be null");
        }

        if (id == Guid.Empty)
        {
            throw new BadRequestException("ID cannot be empty");
        }

        ShoppingSession? sessionRecord = await _shoppingSessionRepository.GetEntityByIdAsync(id);

        if (sessionRecord == null)
        {
            throw new NotFoundException("ShoppingSession not found");
        }

        _mapper.Map(model, sessionRecord);
        EntityHelper.SetDateTimeValue(sessionRecord, nameof(ShoppingSession.UpdatedAt));

        await _shoppingSessionRepository.UpdateEntityAsync(sessionRecord);
        await _unitOfWork.SaveChangesAsync();

        return _mapper.Map<ShoppingSessionResDTO>(sessionRecord);
    }
}