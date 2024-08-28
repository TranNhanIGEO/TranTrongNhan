using SoftKiwiFlorist.Services.Base.Interfaces;
using SoftKiwiFlorist.Models.DTOs;

namespace SoftKiwiFlorist.Areas.Customer.Services.Interfaces;

public interface ICustomerShoppingSessionService : 
    ICreateEntityService<ShoppingSessionResDTO, ShoppingSessionReqDTO>, 
    IUpdateEntityService<ShoppingSessionResDTO, ShoppingSessionReqDTO>
{

}