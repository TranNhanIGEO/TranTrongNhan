using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Query;
using SoftKiwiFlorist.Services.Base.Interfaces;

namespace SoftKiwiFlorist.Services.Interfaces;

public interface ICategoryService : 
    IFetchEntitiesService<QueryModel, CategoryResDTO>, 
    ICountEntityService<QueryModel, CategoryResDTO>,
    IFetchEntityByIdService<CategoryResDTO>
{

}
