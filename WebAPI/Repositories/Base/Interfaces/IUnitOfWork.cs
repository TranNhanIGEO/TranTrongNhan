using Microsoft.EntityFrameworkCore.Storage;

namespace SoftKiwiFlorist.Repositories.Base.Interfaces;

public interface IUnitOfWork : 
    ISaveChanges,
    IBeginTransactionRepository,
    IEndTransactionRepository,
    IRollbackTransactionRepository
{

}

public interface ISaveChanges 
{
    Task SaveChangesAsync();
}

public interface IBeginTransactionRepository
{
    Task<IDbContextTransaction> BeginTransactionAsync();
}

public interface IEndTransactionRepository
{
    Task EndTransactionAsync(IDbContextTransaction transaction);
}

public interface IRollbackTransactionRepository
{
    Task RollbackTransactionAsync(IDbContextTransaction transaction);
}