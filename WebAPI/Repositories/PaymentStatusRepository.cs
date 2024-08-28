using SoftKiwiFlorist.Repositories.Base;
using SoftKiwiFlorist.Repositories.Interfaces;
using SoftKiwiFlorist.Models.Entities;

namespace SoftKiwiFlorist.Repositories;

public class PaymentStatusRepository : BaseRepository<PaymentStatus>, IPaymentStatusRepository
{
    private readonly AppDbContext _context;

    public PaymentStatusRepository(AppDbContext context) : base(context)
    {
        _context = context;
    }
}