using System.Linq.Expressions;

namespace SoftKiwiFlorist.Repositories.Base.Interfaces;

public interface IEntityQueryableContext<TEntity> : 
    IGetContext<TEntity>,
    IGetContextByCondition<TEntity>
{

}

public interface IGetContext<T>
{
    IQueryable<T> GetContext();
}

public interface IGetContextByCondition<T>
{
    IQueryable<T> GetContextByCondition(Expression<Func<T, bool>> condition);
}