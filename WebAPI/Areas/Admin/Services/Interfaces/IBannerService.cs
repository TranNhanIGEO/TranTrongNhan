using SoftKiwiFlorist.Services.Base.Interfaces;
using SoftKiwiFlorist.Models.DTOs;

namespace SoftKiwiFlorist.Areas.Admin.Services.Interfaces;

public interface IAdminBannerService : 
    ICreateEntityService<BannerResDTO, BannerReqDTO>,
    IUpdateEntityService<BannerResDTO, BannerReqDTO>,
    IDeleteEntityService<BannerResDTO, BannerReqDTO>
{

}