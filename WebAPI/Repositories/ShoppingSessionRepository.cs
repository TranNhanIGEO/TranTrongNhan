using SoftKiwiFlorist.Repositories.Base;
using SoftKiwiFlorist.Repositories.Interfaces;
using SoftKiwiFlorist.Models.Entities;

namespace SoftKiwiFlorist.Repositories;

public class ShoppingSessionRepository : BaseRepository<ShoppingSession>, IShoppingSessionRepository
{
    private readonly AppDbContext _context;

    public ShoppingSessionRepository(AppDbContext context) : base(context)
    {
        _context = context;
    }
}