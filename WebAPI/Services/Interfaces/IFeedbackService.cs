using SoftKiwiFlorist.Services.Base.Interfaces;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Query;

namespace SoftKiwiFlorist.Services.Interfaces;

public interface IFeedbackService : 
    IFetchEntitiesService<FeedbackQueryModel, FeedbackResDTO>, 
    ICountEntityService<FeedbackQueryModel, FeedbackResDTO>,
    IFetchEntityByIdService<FeedbackResDTO> 
{

}