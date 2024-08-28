using SoftKiwiFlorist.Services.Base.Interfaces;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Query;

namespace SoftKiwiFlorist.Services.Interfaces;

public interface IAdminUserService : 
    IFetchEntitiesService<QueryModel, ProfileResDTO>, 
    ICountEntityService<QueryModel, ProfileResDTO>
{

}