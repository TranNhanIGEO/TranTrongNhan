using AutoMapper;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;

namespace SoftKiwiFlorist.Mappings;

public class OrderStatusHistoryMapper : Profile
{
    public OrderStatusHistoryMapper()
    {
        CreateMap<OrderStatusHistoryReqDTO, OrderStatusHistory>();
        CreateMap<OrderStatusHistory, OrderStatusHistoryResDTO>()
            .ForMember(dest => dest.OrderReceiverName, opt => opt.MapFrom(src => src.Order!.ReceiverName))
            .ForMember(dest => dest.OrderStatus, opt => opt.MapFrom(src => src.OrderStatus!.Status));
            
        CreateMap<Order, OrderResDTO>();
        CreateMap<OrderStatus, OrderStatusDTO>();
    }
}