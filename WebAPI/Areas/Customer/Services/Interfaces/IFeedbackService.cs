using SoftKiwiFlorist.Services.Base.Interfaces;
using SoftKiwiFlorist.Models.DTOs;

namespace SoftKiwiFlorist.Areas.Customer.Services.Interfaces;

public interface ICustomerFeedbackService : 
    ICreateEntityService<FeedbackResDTO, FeedbackReqDTO>, 
    IUpdateEntityService<FeedbackResDTO, FeedbackReqDTO>
{
    
}