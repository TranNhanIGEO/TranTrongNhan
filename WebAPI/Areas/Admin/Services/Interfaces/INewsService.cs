using SoftKiwiFlorist.Services.Base.Interfaces;
using SoftKiwiFlorist.Models.DTOs;

namespace SoftKiwiFlorist.Areas.Admin.Services.Interfaces;

public interface IAdminNewsService : 
    ICreateEntityService<NewsResDTO, NewsReqDTO>,
    IUpdateEntityService<NewsResDTO, NewsReqDTO>,
    IDeleteEntityService<NewsResDTO, NewsReqDTO>
{

}