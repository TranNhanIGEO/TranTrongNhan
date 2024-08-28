using SoftKiwiFlorist.Services.Base.Interfaces;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Query;

namespace SoftKiwiFlorist.Services.Interfaces;

public interface IPaymentTransactionService : 
    IFetchEntitiesService<QueryModel, PaymentTransactionResDTO>, 
    ICountEntityService<QueryModel, PaymentTransactionResDTO>,
    IFetchEntityByIdService<PaymentTransactionResDTO>
{

}