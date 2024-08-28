using SoftKiwiFlorist.Repositories.Base;
using SoftKiwiFlorist.Repositories.Interfaces;
using SoftKiwiFlorist.Models.Entities;

namespace SoftKiwiFlorist.Repositories;

public class PromotionProductRepository : BaseRepository<PromotionProduct>, IPromotionProductRepository
{
    private readonly AppDbContext _context;

    public PromotionProductRepository(AppDbContext context) : base(context)
    {
        _context = context;
    }
}