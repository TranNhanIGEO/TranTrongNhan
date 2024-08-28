using SoftKiwiFlorist.Services.Base.Interfaces;
using SoftKiwiFlorist.Models.DTOs;

namespace SoftKiwiFlorist.Areas.Admin.Services.Interfaces;

public interface IAdminFeedbackService : IDeleteEntityService<FeedbackResDTO, FeedbackReqDTO>
{

}