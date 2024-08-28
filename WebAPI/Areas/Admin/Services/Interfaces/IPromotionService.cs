using SoftKiwiFlorist.Services.Base.Interfaces;
using SoftKiwiFlorist.Models.DTOs;

namespace SoftKiwiFlorist.Areas.Admin.Services.Interfaces;

public interface IAdminPromotionService : 
    ICreateEntityService<PromotionResDTO, PromotionReqDTO>,
    IUpdateEntityService<PromotionResDTO, PromotionReqDTO>,
    IDeleteEntityService<PromotionResDTO, PromotionReqDTO>
{

}