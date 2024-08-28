using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using SoftKiwiFlorist.Repositories.Base.Interfaces;
using SoftKiwiFlorist.Models.Entities;

namespace SoftKiwiFlorist.Repositories.Base;

public abstract class BaseRepository<TEntity> : IBaseRepository<TEntity> 
    where TEntity : class
{
    private readonly AppDbContext _context;
    private readonly DbSet<TEntity> _dbSet;

    public BaseRepository(AppDbContext context)
    {
        _context = context;
        _dbSet = _context.Set<TEntity>();
    }

    public IQueryable<TEntity> GetContext()
    {
        return _dbSet.AsQueryable();
    }

    public IQueryable<TEntity> GetContextByCondition(Expression<Func<TEntity, bool>> condition)
    {
        return _dbSet.Where(condition).AsQueryable();
    }

    public async Task<IList<TEntity>> GetEntitiesByExcuteQueryAsync(IQueryable<TEntity> query)
    {
        return await query.ToListAsync();
    }

    public async Task<IList<TEntity>> GetEntitiesByConditionAsync(Expression<Func<TEntity, bool>> condition)
    {
        return await _dbSet.Where(condition).ToListAsync();
    }

    public async Task<TEntity?> GetEntityByIdAsync(Guid id)
    {
        return await _dbSet.FindAsync(id);
    }

    public async Task<TEntity?> GetEntityByConditionAsync(Expression<Func<TEntity, bool>> condition)
    {
        return await _dbSet.FirstOrDefaultAsync(condition);
    }

    public async Task<int> CountEntityAsync()
    {
        return await _dbSet.CountAsync();
    }

    public async Task<int> CountEntityByExcuteQueryAsync(IQueryable<TEntity> query)
    {
        return await query.CountAsync();
    }

    public Task AddEntityAsync(TEntity entity)
    {
        _dbSet.Add(entity);
        return Task.CompletedTask;
    }

    public Task AddEntityListAsync(IList<TEntity> entityList)
    {
        _dbSet.AddRange(entityList);
        return Task.CompletedTask;
    }

    public Task UpdateEntityAsync(TEntity entity)
    {
        if (_context.Entry(entity).State == EntityState.Unchanged) return Task.CompletedTask;
        _dbSet.Update(entity);
        return Task.CompletedTask;
    }

    public Task UpdateEntityListAsync(IList<TEntity> entityList)
    {
        if (_context.Entry(entityList).State == EntityState.Unchanged) return Task.CompletedTask;
        _dbSet.UpdateRange(entityList);
        return Task.CompletedTask;
    }

    public Task RemoveEntityAsync(TEntity entity)
    {
        _dbSet.Remove(entity);
        return Task.CompletedTask;
    }

    public Task RemoveEntityListAsync(IList<TEntity> entityList)
    {
        _dbSet.RemoveRange(entityList);
        return Task.CompletedTask;
    }
}
