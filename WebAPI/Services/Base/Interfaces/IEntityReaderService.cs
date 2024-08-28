using System.Linq.Expressions;

namespace SoftKiwiFlorist.Services.Base.Interfaces;

public interface IEntityReaderService<TEntity, TResDTO, TQuery> : 
    IFetchEntitiesService<TQuery, TResDTO>,
    IFetchEntitiesByConditionService<TEntity, TResDTO>,
    IFetchEntityByIdService<TResDTO>,
    IFetchEntityByConditionService<TEntity, TResDTO>,
    ICountEntityService<TQuery, TResDTO>
{

}

public interface IFetchEntitiesService<TQuery, TResDTO>
{
    Task<IList<TResDTO>> FetchEntitiesAsync(TQuery queryParams);
}

public interface IFetchEntitiesByConditionService<TEntity, TResDTO>
{
    Task<IList<TResDTO>> FetchEntitiesByConditionAsync(Expression<Func<TEntity, bool>> condition);
}

public interface IFetchEntityByIdService<TResDTO>
{
    Task<TResDTO> FetchEntityByIdAsync(Guid id);
}

public interface IFetchEntityByConditionService<TEntity, TResDTO>
{
    Task<TResDTO> FecthEntityByConditionAsync(Expression<Func<TEntity, bool>> condition);
}

public interface ICountEntityService<TQuery, TResDTO>
{
    Task<int> CountEntityAsync(TQuery queryParams);
}