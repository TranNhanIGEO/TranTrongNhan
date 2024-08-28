using SoftKiwiFlorist.Services.Base.Interfaces;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;

namespace SoftKiwiFlorist.Areas.Customer.Services.Interfaces;

public interface ICustomerOrderService : 
    IUpdateEntityService<OrderResDTO, OrderReqDTO>
{
    Task PlaceOrder(OrderReqDTO model);
    Task<Order> CreateOrderAsync(OrderReqDTO model);
}