using SoftKiwiFlorist.Services.Base.Interfaces;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Query;

namespace SoftKiwiFlorist.Services.Interfaces;

public interface IOrderService : 
    IFetchEntitiesService<OrderQueryModel, OrderResDTO>, 
    ICountEntityService<OrderQueryModel, OrderResDTO>,
    IFetchEntityByIdService<OrderResDTO>
{

}