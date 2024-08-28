using AutoMapper;
using SoftKiwiFlorist.Services.Interfaces;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;
using SoftKiwiFlorist.Repositories.Interfaces;
using SoftKiwiFlorist.Services.Base;
using SoftKiwiFlorist.Models.Query;
using SoftKiwiFlorist.Helpers;

namespace SoftKiwiFlorist.Services;

public class ShoppingSessionService : BaseReaderService<ShoppingSession, ShoppingSessionResDTO, QueryModel>, IShoppingSessionService
{
    private readonly IShoppingSessionRepository _shoppingSessionRepository;

    public ShoppingSessionService(IMapper mapper, IShoppingSessionRepository shoppingSessionRepository) : base(mapper, shoppingSessionRepository)
    {
        _shoppingSessionRepository = shoppingSessionRepository;
    }
    
    public new async Task<ShoppingSessionResDTO> FetchEntityByIdAsync(Guid id)
    {
        if (id == Guid.Empty)
        {
            throw new BadRequestException("ID cannot be empty");
        }

        ShoppingSession? entityRecord = await _repository.GetEntityByIdAsync(id);

        if (entityRecord == null)
        {
            throw new NotFoundException("Session not found");
        }

        ShoppingSessionResDTO record = _mapper.Map<ShoppingSessionResDTO>(entityRecord);

        return record;
    }
}