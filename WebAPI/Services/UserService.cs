using AutoMapper;
using SoftKiwiFlorist.Services.Interfaces;
using SoftKiwiFlorist.Models.Query;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;
using Microsoft.AspNetCore.Identity;
using SoftKiwiFlorist.Helpers;
using Microsoft.EntityFrameworkCore;

namespace SoftKiwiFlorist.Services;

public class AdminUserService : IAdminUserService
{
    private readonly IMapper _mapper;
    private readonly UserManager<User> _userManager;

    public AdminUserService(IMapper mapper, UserManager<User> userManager)
    {
        _mapper = mapper;
        _userManager = userManager;
    }

    private IQueryable<User> ApplyFiltering(IQueryable<User> query, QueryModel queryParams)
    {
        if (!string.IsNullOrEmpty(queryParams.SearchTerm))
        {
            query = query.Where(e => EF.Property<string>(e, "NormalizedTerm").Contains(StringHelper.ToUnsignCase(queryParams.SearchTerm)));
        }
        return query;
    }

    private IQueryable<User> ApplySorting(IQueryable<User> query, QueryModel queryParams)
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

    private IQueryable<User> ApplyPaging(IQueryable<User> query, QueryModel queryParams)
    {
        int pageIndex = queryParams.PageIndex ?? 1;
        int pageSize = queryParams.PageSize ?? 10;

        return query.Skip((pageIndex - 1) * pageSize).Take(pageSize);
    }

    public async Task<IList<ProfileResDTO>> FetchEntitiesAsync(QueryModel queryParams)
    {
        if (queryParams == null) 
        {
            throw new BadRequestException("Query parameters cannot be null");
        }

        IQueryable<User> query = _userManager.Users;

        query = ApplyFiltering(query, queryParams);
        query = ApplySorting(query, queryParams);
        query = ApplyPaging(query, queryParams);

        IList<User> entityRecords = await query.ToListAsync();

        return _mapper.Map<IList<ProfileResDTO>>(entityRecords);
    }

    public async Task<int> CountEntityAsync(QueryModel queryParams)
    {
        if (queryParams == null) 
        {
            throw new BadRequestException("Query parameters cannot be null");
        }

        IQueryable<User> query = _userManager.Users;

        if (string.IsNullOrEmpty(queryParams.SearchTerm))
        {
            return await query.CountAsync();
        }

        query = ApplyFiltering(query, queryParams);

        return await query.CountAsync();
    }
}