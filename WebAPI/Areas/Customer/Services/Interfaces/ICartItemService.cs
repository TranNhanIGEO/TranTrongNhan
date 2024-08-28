using SoftKiwiFlorist.Services.Base.Interfaces;
using SoftKiwiFlorist.Models.DTOs;

namespace SoftKiwiFlorist.Areas.Customer.Services.Interfaces;

public interface ICustomerCartItemService : 
    ICreateEntityService<CartItemResDTO, CartItemReqDTO>, 
    IUpdateEntityService<CartItemResDTO, CartItemReqDTO>, 
    IDeleteEntityService<CartItemResDTO, CartItemReqDTO>,
    IDeleteEntityListService<CartItemResDTO, CartItemReqDTO>
{

}