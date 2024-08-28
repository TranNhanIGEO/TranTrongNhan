using AutoMapper;
using SoftKiwiFlorist.Repositories.Interfaces;
using SoftKiwiFlorist.Services.Interfaces;
using SoftKiwiFlorist.Models.Query;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;
using SoftKiwiFlorist.Services.Base;

namespace SoftKiwiFlorist.Services;

public class NewsService : BaseReaderService<News, NewsResDTO, QueryModel>, INewsService
{
    private readonly INewsRepository _newsRepository;

    public NewsService(IMapper mapper, INewsRepository newsRepository) : base(mapper, newsRepository)
    {
        _newsRepository = newsRepository;
    }
}