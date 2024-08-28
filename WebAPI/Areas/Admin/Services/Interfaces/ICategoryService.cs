using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Services.Base.Interfaces;

namespace SoftKiwiFlorist.Areas.Admin.Services.Interfaces;

public interface IAdminCategoryService : 
    ICreateEntityService<CategoryResDTO, CategoryReqDTO>,
    IUpdateEntityService<CategoryResDTO, CategoryReqDTO>,
    IDeleteEntityService<CategoryResDTO, CategoryReqDTO>
{

}
