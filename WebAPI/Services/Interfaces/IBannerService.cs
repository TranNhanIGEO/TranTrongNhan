using SoftKiwiFlorist.Services.Base.Interfaces;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Query;

namespace SoftKiwiFlorist.Services.Interfaces;

public interface IBannerService : 
    IFetchEntitiesService<QueryModel, BannerResDTO>, 
    ICountEntityService<QueryModel, BannerResDTO>,
    IFetchEntityByIdService<BannerResDTO>
{

}