using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Services.Base.Interfaces;

namespace SoftKiwiFlorist.Services.Interfaces;

public interface IPaymentMethodService :
    IFetchEntityByIdService<PaymentMethodDTO>
{
    
}