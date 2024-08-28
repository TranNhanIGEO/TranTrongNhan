using Microsoft.EntityFrameworkCore.Storage;
using SoftKiwiFlorist.Models.Entities;
using SoftKiwiFlorist.Repositories.Base.Interfaces;

namespace SoftKiwiFlorist.Repositories.Base;

public class UnitOfWork : IUnitOfWork
{
    private readonly AppDbContext _context;

    public UnitOfWork(AppDbContext context)
    {
        _context = context;
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
    

    public Task<IDbContextTransaction> BeginTransactionAsync()
    {
        return _context.Database.BeginTransactionAsync();
    }

    public Task EndTransactionAsync(IDbContextTransaction transaction)
    {
        return transaction.CommitAsync();
    }

    public Task RollbackTransactionAsync(IDbContextTransaction transaction)
    {
        return transaction.RollbackAsync();
    }
}