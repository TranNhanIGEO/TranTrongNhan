using System.Linq.Expressions;
using AutoMapper;
using SoftKiwiFlorist.Services.Interfaces;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;
using SoftKiwiFlorist.Repositories.Interfaces;
using SoftKiwiFlorist.Services.Base;
using SoftKiwiFlorist.Models.Query;

namespace SoftKiwiFlorist.Services;

public class SessionStatusService : BaseReaderService<SessionStatus, SessionStatusDTO, QueryModel>, ISessionStatusService
{
    private readonly ISessionStatusRepository _sessionStatusRepository;

    public SessionStatusService(IMapper mapper, ISessionStatusRepository sessionStatusRepository) : base(mapper, sessionStatusRepository)
    {
        _sessionStatusRepository = sessionStatusRepository;
    }
}