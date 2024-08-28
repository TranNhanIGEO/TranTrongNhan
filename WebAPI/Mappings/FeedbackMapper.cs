using AutoMapper;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;

namespace SoftKiwiFlorist.Mappings;

public class FeedbackMapper : Profile
{
    public FeedbackMapper()
    {
        CreateMap<FeedbackReqDTO, Feedback>();
        CreateMap<Feedback, FeedbackResDTO>()
            .ForMember(dest => dest.UserFullName, opt => opt.MapFrom(src => src.User!.UserName))
            .ForMember(dest => dest.UserAvatar, opt => opt.MapFrom(src => src.User!.Avatar))
            .ForMember(dest => dest.ProductName, opt => opt.MapFrom(src => src.Product!.Name));
            
        CreateMap<User, ProfileResDTO>();
        CreateMap<Product, ProductResDTO>();
    }
}