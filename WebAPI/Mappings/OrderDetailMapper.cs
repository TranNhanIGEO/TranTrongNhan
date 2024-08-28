using AutoMapper;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;

namespace SoftKiwiFlorist.Mappings;

public class OrderDetailMapper : Profile
{
    public OrderDetailMapper()
    {
        CreateMap<OrderDetailReqDTO, OrderDetail>();
        CreateMap<OrderDetail, OrderDetailResDTO>()
            .ForMember(dest => dest.ProductImage, opt => opt.MapFrom(src => src.Product!.Image))
            .ForMember(dest => dest.ProductName, opt => opt.MapFrom(src => src.Product!.Name))
            .ForMember(dest => dest.OrderReceiverName, opt => opt.MapFrom(src => src.Order!.ReceiverName));
            
        CreateMap<Product, ProductResDTO>();
        CreateMap<Order, OrderResDTO>();
    }
}