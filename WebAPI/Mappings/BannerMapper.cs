using AutoMapper;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;

namespace SoftKiwiFlorist.Mappings;

public class BannerMapper : Profile
{
    public BannerMapper()
    {
        CreateMap<BannerReqDTO, Banner>();
        CreateMap<Banner, BannerResDTO>()
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category!.Name));
            
        CreateMap<Category, CategoryResDTO>();
    }
}