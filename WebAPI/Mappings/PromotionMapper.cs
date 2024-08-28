using AutoMapper;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;

namespace SoftKiwiFlorist.Mappings;

public class PromotionMapper : Profile
{
    public PromotionMapper()
    {
        CreateMap<PromotionReqDTO, Promotion>();
        CreateMap<Promotion, PromotionResDTO>();
    }
}