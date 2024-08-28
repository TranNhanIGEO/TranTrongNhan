namespace SoftKiwiFlorist.Services.Base.Interfaces;

public interface ICreateEntityService<TResDTO, TReqDTO>
{
    Task<TResDTO> CreateEntityAsync(TReqDTO entityReqDTO);
}

public interface ICreateEntityListService<TResDTO, TReqDTO>
{
    Task<IList<TResDTO>> CreateEntityListAsync(IList<TReqDTO> entityReqDTOs);
}

public interface IUpdateEntityService<TResDTO, TReqDTO>
{
    Task<TResDTO> UpdateEntityAsync(Guid id, TReqDTO entityReqDTO);
}

public interface IUpdateEntityListService<TResDTO, TReqDTO>
{
    Task<IList<TResDTO>> UpdateEntityListAsync(Guid id, IList<TReqDTO> entityReqDTOs);
}

public interface IDeleteEntityService<TResDTO, TReqDTO>
{
    Task<Guid> DeleteEntityAsync(Guid id);
}

public interface IDeleteEntityListService<TResDTO, TReqDTO>
{
    Task<Guid> DeleteEntityListAsync(Guid id);
}
