using SoftKiwiFlorist.Services.Base.Interfaces;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Query;

namespace SoftKiwiFlorist.Services.Interfaces;

public interface IProductService : 
    IFetchEntitiesService<ProductQueryModel, ProductResDTO>, 
    ICountEntityService<ProductQueryModel, ProductResDTO>,
    IFetchEntityByIdService<ProductResDTO>
{

}