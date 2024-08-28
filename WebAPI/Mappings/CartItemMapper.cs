using AutoMapper;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;

namespace SoftKiwiFlorist.Mappings;

public class CartItemMapper : Profile
{
    public CartItemMapper()
    {
        CreateMap<CartItemReqDTO, CartItem>();
        CreateMap<CartItem, CartItemResDTO>()
            .ForMember(dest => dest.ProductName, opt => opt.MapFrom(src => src.Product!.Name))
            .ForMember(dest => dest.ProductImage, opt => opt.MapFrom(src => src.Product!.Image))
            .ForMember(dest => dest.TotalAmount, opt => opt.MapFrom(src => src.Product!.Price * src.Quantity));
            
        CreateMap<ShoppingSession, ShoppingSessionResDTO>();
        CreateMap<Product, ProductResDTO>();
    }
}