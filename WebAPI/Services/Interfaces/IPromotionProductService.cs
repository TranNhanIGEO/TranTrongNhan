using SoftKiwiFlorist.Services.Base.Interfaces;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Query;
using SoftKiwiFlorist.Models.Entities;

namespace SoftKiwiFlorist.Services.Interfaces;

public interface IPromotionProductService : 
    IFetchEntitiesService<QueryModel, PromotionProductResDTO>, 
    ICountEntityService<QueryModel, PromotionProductResDTO>,
    IFetchEntityByIdService<PromotionProductResDTO>
{
    Task<IList<PromotionProduct>> FetchLastestPromotionForProduct(IList<Guid> productIds);
}