using SoftKiwiFlorist.Repositories.Base;
using SoftKiwiFlorist.Repositories.Interfaces;
using SoftKiwiFlorist.Models.Entities;

namespace SoftKiwiFlorist.Repositories;

public class OrderStatusRepository : BaseRepository<OrderStatus>, IOrderStatusRepository
{
    private readonly AppDbContext _context;

    public OrderStatusRepository(AppDbContext context) : base(context)
    {
        _context = context;
    }
}