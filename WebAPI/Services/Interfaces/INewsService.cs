using SoftKiwiFlorist.Services.Base.Interfaces;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Query;

namespace SoftKiwiFlorist.Services.Interfaces;

public interface INewsService : 
    IFetchEntitiesService<QueryModel, NewsResDTO>, 
    ICountEntityService<QueryModel, NewsResDTO>,
    IFetchEntityByIdService<NewsResDTO>
{

}