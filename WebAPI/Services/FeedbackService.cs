using AutoMapper;
using FluentValidation;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Repositories.Interfaces;
using SoftKiwiFlorist.Services.Interfaces;
using SoftKiwiFlorist.Models.Query;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;
using SoftKiwiFlorist.Services.Base;

namespace SoftKiwiFlorist.Services;

public class FeedbackService : BaseReaderService<Feedback, FeedbackResDTO, FeedbackQueryModel>, IFeedbackService
{
    private readonly IFeedbackRepository _feedbackRepository;

    public FeedbackService(IMapper mapper, IFeedbackRepository feedbackRepository) : base(mapper, feedbackRepository)
    {
        _feedbackRepository = feedbackRepository;
    }

    private IQueryable<Feedback> ApplyFindByCondition(IQueryable<Feedback> query, FeedbackQueryModel queryParams)
    {
        if (!string.IsNullOrEmpty(queryParams.UserId))
        {
            query = query.Where(o => o.UserId == queryParams.UserId);
        }
        return query;
    }

    public new async Task<IList<FeedbackResDTO>> FetchEntitiesAsync(FeedbackQueryModel queryParams)
    {
        if (queryParams == null) 
        {
            throw new BadRequestException("Query parameters cannot be null");
        }

        IQueryable<Feedback> query = _feedbackRepository.GetContext();

        query = ApplyFindByCondition(query, queryParams);
        query = ApplyFiltering(query, queryParams);
        query = ApplySorting(query, queryParams);
        query = ApplyPaging(query, queryParams);

        IList<Feedback> feedbackRecords = await _feedbackRepository.GetEntitiesByExcuteQueryAsync(query);

        return _mapper.Map<IList<FeedbackResDTO>>(feedbackRecords);
    }

    public new async Task<int> CountEntityAsync(FeedbackQueryModel queryParams)
    {
        if (queryParams == null) 
        {
            throw new BadRequestException("Query parameters cannot be null");
        }

        IQueryable<Feedback> query = _feedbackRepository.GetContext();

        query = ApplyFindByCondition(query, queryParams);
        
        if (string.IsNullOrEmpty(queryParams.SearchTerm))
        {
            return await _feedbackRepository.CountEntityByExcuteQueryAsync(query);
        }

        query = ApplyFiltering(query, queryParams);

        return await _feedbackRepository.CountEntityByExcuteQueryAsync(query);
    }
}