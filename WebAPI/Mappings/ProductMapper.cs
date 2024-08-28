using AutoMapper;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;

namespace SoftKiwiFlorist.Mappings;

public class ProductMapper : Profile
{
    public ProductMapper()
    {
        CreateMap<ProductReqDTO, Product>();
        CreateMap<Product, ProductResDTO>()
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category!.Name))
            .ForMember(dest => dest.IsNew, opt => opt.MapFrom(src => src.CreatedAt >= DateHelper.GetCurrentDateTime().AddMonths(-3)))
            .ForMember(dest => dest.FinalPrice, opt => opt.MapFrom(src => src.Price))
            .ForMember(dest => dest.Sold, opt => opt.MapFrom(src => src.OrderDetails.Where(od => od.ProductId == src.Id).Sum(od => od.Quantity)))
            .ForMember(dest => dest.Viewed, opt => opt.MapFrom(src => 0));
            
        CreateMap<Category, CategoryResDTO>();
    }
}