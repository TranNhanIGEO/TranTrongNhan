using System.Linq.Expressions;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Models.Query;
using SoftKiwiFlorist.Repositories.Base.Interfaces;
using SoftKiwiFlorist.Services.Base.Interfaces;

namespace SoftKiwiFlorist.Services.Base;

public abstract class BaseReaderService<TEntity, TResDTO, TQuery> : IEntityReaderService<TEntity, TResDTO, TQuery>
    where TEntity : class 
    where TQuery : QueryModel
{
    protected readonly IMapper _mapper;
    protected readonly IBaseRepository<TEntity> _repository;

    protected BaseReaderService(IMapper mapper, IBaseRepository<TEntity> repository)
    {
        _mapper = mapper;
        _repository = repository;
    }

    public IQueryable<TEntity> ApplyFiltering(IQueryable<TEntity> query, TQuery queryParams)
    {
        if (!string.IsNullOrEmpty(queryParams.SearchTerm))
        {
            query = query.Where(e => EF.Property<string>(e, "NormalizedTerm").Contains(StringHelper.ToUnsignCase(queryParams.SearchTerm)));
        }
        return query;
    }

    public IQueryable<TEntity> ApplySorting(IQueryable<TEntity> query, TQuery queryParams)
    {
        string? sortBy = queryParams.SortBy != null ? StringHelper.ToPascalCase(queryParams.SortBy) : string.Empty;
        SortDirection? sortDirection = queryParams.SortDirection ?? SortDirection.ASC;

        if (!string.IsNullOrEmpty(sortBy))
        {
            if (sortDirection == SortDirection.ASC)
            {
                query = query.OrderBy(e => EF.Property<object>(e, sortBy));
            }
            else
            {
                query = query.OrderByDescending(e => EF.Property<object>(e, sortBy));
            }
        }

        return query;
    }

    public IQueryable<TEntity> ApplyPaging(IQueryable<TEntity> query, TQuery queryParams)
    {
        int pageIndex = queryParams.PageIndex ?? 1;
        int pageSize = queryParams.PageSize ?? 10;

        return query.Skip((pageIndex - 1) * pageSize).Take(pageSize);
    }

    public async Task<IList<TResDTO>> FetchEntitiesAsync(TQuery queryParams)
    {
        if (queryParams == null) 
        {
            throw new BadRequestException("Query parameters cannot be null");
        }

        IQueryable<TEntity> query = _repository.GetContext();

        query = ApplyFiltering(query, queryParams);
        query = ApplySorting(query, queryParams);
        query = ApplyPaging(query, queryParams);

        IList<TEntity> entityRecords = await _repository.GetEntitiesByExcuteQueryAsync(query);

        return _mapper.Map<IList<TResDTO>>(entityRecords);
    }

    public async Task<IList<TResDTO>> FetchEntitiesByConditionAsync(Expression<Func<TEntity, bool>> condition)
    {
        if (condition == null)
        {
            throw new BadRequestException("Condition cannot be null");
        }
        
        IList<TEntity>? entityRecord = await _repository.GetEntitiesByConditionAsync(condition);

        return _mapper.Map<IList<TResDTO>>(entityRecord);
    }

    public async Task<int> CountEntityAsync(TQuery queryParams)
    {
        if (queryParams == null) 
        {
            throw new BadRequestException("Query parameters cannot be null");
        }

        IQueryable<TEntity> query = _repository.GetContext();

        if (string.IsNullOrEmpty(queryParams.SearchTerm))
        {
            return await _repository.CountEntityAsync();
        }

        query = ApplyFiltering(query, queryParams);

        return await _repository.CountEntityByExcuteQueryAsync(query);
    }

    public async Task<TResDTO> FetchEntityByIdAsync(Guid id)
    {
        if (id == Guid.Empty)
        {
            throw new BadRequestException("ID cannot be empty");
        }

        TEntity? entityRecord = await _repository.GetEntityByIdAsync(id);

        if (entityRecord == null)
        {
            throw new NotFoundException($"{typeof(TEntity).Name} not found");
        }

        return _mapper.Map<TResDTO>(entityRecord);
    }

    public async Task<TResDTO> FecthEntityByConditionAsync(Expression<Func<TEntity, bool>> condition)
    {
        if (condition == null)
        {
            throw new BadRequestException("Condition cannot be null");
        }
        
        TEntity? entityRecord = await _repository.GetEntityByConditionAsync(condition);

        if (entityRecord == null)
        {
            throw new NotFoundException($"{typeof(TEntity).Name} not found");
        }

        return _mapper.Map<TResDTO>(entityRecord);
    }
}