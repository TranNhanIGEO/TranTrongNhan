using SoftKiwiFlorist.Services.Base.Interfaces;
using SoftKiwiFlorist.Models.DTOs;

namespace SoftKiwiFlorist.Areas.Customer.Services.Interfaces;

public interface ICustomerOrderDetailService : 
    ICreateEntityListService<OrderDetailResDTO, OrderDetailReqDTO>
{

}