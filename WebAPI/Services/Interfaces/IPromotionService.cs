using SoftKiwiFlorist.Services.Base.Interfaces;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Query;

namespace SoftKiwiFlorist.Services.Interfaces;

public interface IPromotionService : 
    IFetchEntitiesService<QueryModel, PromotionResDTO>, 
    ICountEntityService<QueryModel, PromotionResDTO>,
    IFetchEntityByIdService<PromotionResDTO>
{

}