using SoftKiwiFlorist.Services.Base.Interfaces;
using SoftKiwiFlorist.Models.DTOs;

namespace SoftKiwiFlorist.Areas.Admin.Services.Interfaces;

public interface IAdminProductService : 
    ICreateEntityService<ProductResDTO, ProductReqDTO>,
    IUpdateEntityService<ProductResDTO, ProductReqDTO>,
    IDeleteEntityService<ProductResDTO, ProductReqDTO>
{

}