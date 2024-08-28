using SoftKiwiFlorist.Models.Entities;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Query;
using SoftKiwiFlorist.Repositories.Interfaces;
using SoftKiwiFlorist.Services.Interfaces;
using AutoMapper;
using SoftKiwiFlorist.Services.Base;

namespace SoftKiwiFlorist.Services;

public class CategoryService : BaseReaderService<Category, CategoryResDTO, QueryModel>, ICategoryService
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoryService(IMapper mapper, ICategoryRepository categoryRepository) : base(mapper, categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }
}
