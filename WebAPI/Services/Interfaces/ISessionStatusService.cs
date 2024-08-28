using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;
using SoftKiwiFlorist.Services.Base.Interfaces;

namespace SoftKiwiFlorist.Services.Interfaces;

public interface ISessionStatusService :
    IFetchEntityByConditionService<SessionStatus, SessionStatusDTO>
{
    
}