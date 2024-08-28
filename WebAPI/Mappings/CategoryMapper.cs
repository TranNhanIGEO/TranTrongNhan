using AutoMapper;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;

namespace SoftKiwiFlorist.Mappings;

public class CategoryMapper : Profile
{
    public CategoryMapper()
    {
        CreateMap<CategoryReqDTO, Category>();
        CreateMap<Category, CategoryResDTO>();
    }
}