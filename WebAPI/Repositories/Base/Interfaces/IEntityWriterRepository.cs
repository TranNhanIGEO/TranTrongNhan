namespace SoftKiwiFlorist.Repositories.Base.Interfaces;

public interface IEntityWriterRepository<TEntity> : 
    IAddEntityListRepository<TEntity>, 
    IAddEntityRepository<TEntity>, 
    IUpdateEntityListRepository<TEntity>, 
    IUpdateEntityRepository<TEntity>, 
    IRemoveEntityListRepository<TEntity>,
    IRemoveEntityRepository<TEntity>
{

}

public interface IAddEntityListRepository<TEntity>
{
    Task AddEntityListAsync(IList<TEntity> entityList);
}

public interface IAddEntityRepository<TEntity>
{
    Task AddEntityAsync(TEntity entity);
}

public interface IUpdateEntityListRepository<TEntity>
{
    Task UpdateEntityListAsync(IList<TEntity> entityList);
}

public interface IUpdateEntityRepository<TEntity>
{
    Task UpdateEntityAsync(TEntity entity);
}

public interface IRemoveEntityListRepository<TEntity>
{
    Task RemoveEntityListAsync(IList<TEntity> entityList);
}

public interface IRemoveEntityRepository<TEntity>
{
    Task RemoveEntityAsync(TEntity entity);
}