using AutoMapper;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;

namespace SoftKiwiFlorist.Mappings;

public class NewsMapper : Profile
{
    public NewsMapper()
    {
        CreateMap<NewsReqDTO, News>();
        CreateMap<News, NewsResDTO>()
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category!.Name));
            
        CreateMap<Category, CategoryResDTO>();
    }
}