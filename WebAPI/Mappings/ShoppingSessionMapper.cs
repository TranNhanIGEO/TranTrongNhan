using AutoMapper;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;

namespace SoftKiwiFlorist.Mappings;

public class ShoppingSessionMapper : Profile
{
    public ShoppingSessionMapper()
    {
        CreateMap<ShoppingSessionReqDTO, ShoppingSession>();
        CreateMap<ShoppingSession, ShoppingSessionResDTO>()
            .ForMember(dest => dest.SessionStatus, opt => opt.MapFrom(src => src.SessionStatus!.Status))
            .ForMember(dest => dest.Quantity, opt => opt.MapFrom(src => src.CartItems.Sum(i => i.Quantity)))
            .ForMember(dest => dest.TotalUnitPrice, opt => opt.MapFrom(src => src.CartItems.Sum(i => i.Product!.Price * i.Quantity)))
            .ForMember(dest => dest.TotalDiscount, opt => opt.MapFrom(src => 0))
            .ForMember(dest => dest.TotalPrice, opt => opt.MapFrom((src, dest) => dest.TotalUnitPrice - dest.TotalDiscount));

        CreateMap<SessionStatus, SessionStatusDTO>();
    }
}