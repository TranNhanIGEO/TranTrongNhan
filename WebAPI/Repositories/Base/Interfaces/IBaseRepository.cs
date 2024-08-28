namespace SoftKiwiFlorist.Repositories.Base.Interfaces;

public interface IBaseRepository<TEntity> : 
    IEntityQueryableContext<TEntity>, 
    IEntityReaderRepository<TEntity>, 
    IEntityWriterRepository<TEntity>
{

}