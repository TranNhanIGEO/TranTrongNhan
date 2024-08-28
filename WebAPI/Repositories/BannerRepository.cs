using SoftKiwiFlorist.Repositories.Base;
using SoftKiwiFlorist.Repositories.Interfaces;
using SoftKiwiFlorist.Models.Entities;

namespace SoftKiwiFlorist.Repositories;

public class BannerRepository : BaseRepository<Banner>, IBannerRepository
{
    private readonly AppDbContext _context;

    public BannerRepository(AppDbContext context) : base(context)
    {
        _context = context;
    }
}