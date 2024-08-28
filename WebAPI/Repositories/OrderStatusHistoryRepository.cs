using SoftKiwiFlorist.Repositories.Base;
using SoftKiwiFlorist.Repositories.Interfaces;
using SoftKiwiFlorist.Models.Entities;

namespace SoftKiwiFlorist.Repositories;

public class OrderStatusHistoryRepository : BaseRepository<OrderStatusHistory>, IOrderStatusHistoryRepository
{
    private readonly AppDbContext _context;

    public OrderStatusHistoryRepository(AppDbContext context) : base(context)
    {
        _context = context;
    }
}