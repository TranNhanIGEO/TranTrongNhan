using System.Linq.Expressions;

namespace SoftKiwiFlorist.Repositories.Base.Interfaces;

public interface IEntityReaderRepository<TEntity> : 
    IGetEntitiesByExcuteQueryRepository<TEntity>, 
    IGetEntitiesByConditionRepository<TEntity>,
    IGetEntityByIdRepository<TEntity>, 
    IGetEntityByConditionRepository<TEntity>,
    ICountEntityRepository<TEntity>,
    ICountEntityByExcuteQueryRepository<TEntity>
{

}

public interface IGetEntitiesByExcuteQueryRepository<TEntity>
{
    Task<IList<TEntity>> GetEntitiesByExcuteQueryAsync(IQueryable<TEntity> query);
}

public interface IGetEntitiesByConditionRepository<TEntity>
{
    Task<IList<TEntity>> GetEntitiesByConditionAsync(Expression<Func<TEntity, bool>> condition);
}

public interface IGetEntityByIdRepository<TEntity>
{
    Task<TEntity?> GetEntityByIdAsync(Guid id);
}

public interface IGetEntityByConditionRepository<TEntity>
{
    Task<TEntity?> GetEntityByConditionAsync(Expression<Func<TEntity, bool>> condition);
}

public interface ICountEntityRepository<TEntity>
{
    Task<int> CountEntityAsync();
}

public interface ICountEntityByExcuteQueryRepository<TEntity>
{
    Task<int> CountEntityByExcuteQueryAsync(IQueryable<TEntity> query);
}