using AutoMapper;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;

namespace SoftKiwiFlorist.Mappings;

public class PaymentTransactionMapper : Profile
{
    public PaymentTransactionMapper()
    {
        CreateMap<PaymentTransactionReqDTO, PaymentTransaction>();
        CreateMap<PaymentTransaction, PaymentTransactionResDTO>()
            .ForMember(dest => dest.SessionStatus, opt => opt.MapFrom(src => src.ShoppingSession!.SessionStatus!.Status))
            .ForMember(dest => dest.PaymentMethod, opt => opt.MapFrom(src => src.PaymentMethod!.Name))
            .ForMember(dest => dest.PaymentStatus, opt => opt.MapFrom(src => src.PaymentStatus!.Status));
            
        CreateMap<ShoppingSession, ShoppingSessionResDTO>();
    }
}