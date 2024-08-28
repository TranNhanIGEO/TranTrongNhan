using AutoMapper;
using SoftKiwiFlorist.Areas.Account.Models;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;

namespace SoftKiwiFlorist.Mappings;

public class UserMapper : Profile
{
    public UserMapper()
    {
        CreateMap<RegisterModel, User>()
            .ForMember(dest => dest.PasswordHash, opt => opt.MapFrom(src => src.Password));
        CreateMap<PasswordChangingModel, User>()
            .ForMember(dest => dest.PasswordHash, opt => opt.MapFrom(src => src.NewPassword));
        CreateMap<ProfileReqDTO, User>();

        CreateMap<User, ProfileResDTO>();
    }
}