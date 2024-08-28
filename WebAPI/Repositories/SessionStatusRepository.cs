using SoftKiwiFlorist.Repositories.Base;
using SoftKiwiFlorist.Repositories.Interfaces;
using SoftKiwiFlorist.Models.Entities;

namespace SoftKiwiFlorist.Repositories;

public class SessionStatusRepository : BaseRepository<SessionStatus>, ISessionStatusRepository
{
    private readonly AppDbContext _context;

    public SessionStatusRepository(AppDbContext context) : base(context)
    {
        _context = context;
    }
}