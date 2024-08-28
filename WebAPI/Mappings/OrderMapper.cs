using AutoMapper;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;

namespace SoftKiwiFlorist.Mappings;

public class OrderMapper : Profile
{
    public OrderMapper()
    {
        CreateMap<OrderReqDTO, Order>();
        CreateMap<Order, OrderResDTO>()
            .ForMember(dest => dest.UserFullName, opt => opt.MapFrom(src => src.User!.FullName))
            .ForMember(dest => dest.OrderDetails, opt => opt.MapFrom(src => src.OrderDetails))
            .ForMember(dest => dest.OrderStatus, opt => opt.MapFrom(src => src.OrderStatus!.Status));
            
        CreateMap<User, ProfileResDTO>();
        CreateMap<ShoppingSession, ShoppingSessionResDTO>();
        CreateMap<OrderDetail, OrderDetailReqDTO>();
        CreateMap<OrderStatus, OrderStatusDTO>();
    }
}