using SoftKiwiFlorist.Repositories.Base;
using SoftKiwiFlorist.Repositories.Interfaces;
using SoftKiwiFlorist.Models.Entities;

namespace SoftKiwiFlorist.Repositories;

public class PromotionRepository : BaseRepository<Promotion>, IPromotionRepository
{
    private readonly AppDbContext _context;

    public PromotionRepository(AppDbContext context) : base(context)
    {
        _context = context;
    }
}