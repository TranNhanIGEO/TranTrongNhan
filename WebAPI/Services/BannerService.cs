using AutoMapper;
using SoftKiwiFlorist.Repositories.Interfaces;
using SoftKiwiFlorist.Services.Interfaces;
using SoftKiwiFlorist.Models.Query;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;
using SoftKiwiFlorist.Services.Base;

namespace SoftKiwiFlorist.Services;

public class BannerService : BaseReaderService<Banner, BannerResDTO, QueryModel>, IBannerService
{
    private readonly IBannerRepository _bannerRepository;

    public BannerService(IMapper mapper, IBannerRepository bannerRepository) : base(mapper, bannerRepository)
    {
        _bannerRepository = bannerRepository;
    }
}