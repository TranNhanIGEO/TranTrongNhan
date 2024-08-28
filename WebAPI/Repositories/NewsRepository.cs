using SoftKiwiFlorist.Repositories.Base;
using SoftKiwiFlorist.Repositories.Interfaces;
using SoftKiwiFlorist.Models.Entities;

namespace SoftKiwiFlorist.Repositories;

public class NewsRepository : BaseRepository<News>, INewsRepository
{
    private readonly AppDbContext _context;

    public NewsRepository(AppDbContext context) : base(context)
    {
        _context = context;
    }
}