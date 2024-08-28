using SoftKiwiFlorist.Repositories.Base;
using SoftKiwiFlorist.Repositories.Interfaces;
using SoftKiwiFlorist.Models.Entities;

namespace SoftKiwiFlorist.Repositories;

public class CartItemRepository : BaseRepository<CartItem>, ICartItemRepository
{
    private readonly AppDbContext _context;

    public CartItemRepository(AppDbContext context) : base(context)
    {
        _context = context;
    }
}