using SoftKiwiFlorist.Models.Entities;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Services;
using SoftKiwiFlorist.Repositories.Interfaces;
using SoftKiwiFlorist.Areas.Admin.Services.Interfaces;
using SoftKiwiFlorist.Helpers;
using FluentValidation;
using FluentValidation.Results;
using AutoMapper;
using SoftKiwiFlorist.Services.External.Interfaces;
using SoftKiwiFlorist.Repositories.Base.Interfaces;
using SoftKiwiFlorist.Models.Enums;

namespace SoftKiwiFlorist.Areas.Admin.Services;

public class AdminCategoryService : IAdminCategoryService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICategoryRepository _categoryRepository;
    private readonly IFileStorageService _fileStorageService;
    private readonly IImageProcessingService _imageProcessingService;
    private readonly IValidator<CategoryReqDTO> _validatorReqDTO;
    private readonly Dictionary<string, Func<Category, object>> _normalizedTermProperties;

    public AdminCategoryService(
        IMapper mapper, 
        IUnitOfWork unitOfWork, 
        ICategoryRepository categoryRepository, 
        IFileStorageService fileStorageService, 
        IImageProcessingService imageProcessingService, 
        IValidator<CategoryReqDTO> validatorReqDTO)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
        _categoryRepository = categoryRepository;
        _fileStorageService = fileStorageService;
        _imageProcessingService = imageProcessingService;
        _validatorReqDTO = validatorReqDTO;
        _normalizedTermProperties = new Dictionary<string, Func<Category, object>>()
        {
            { nameof(Category.Name), c => c.Name },
            { nameof(Category.CreatedAt), c => c.CreatedAt.ToString("O") },
            { nameof(Category.UpdatedAt), c => c.UpdatedAt.ToString("O") },
        };
    }

    private async Task<string> ResizeAndSaveImageAsync(IFormFile formFile, string fileName)
    {
        string folderPath = Path.Combine("images", "categories");
        string fileKey = string.Concat(fileName, ".", nameof(ImageFormat.Jpeg).ToLower());
        
        ImageProcessingModel processingModel = new ImageProcessingModel()
        {
            FileName = fileKey,
            FolderPath = folderPath,
            FormFile = formFile,
            Width = 500,
            Height = 500,
            Format = ImageFormat.Jpeg,
        };

        string imageUrl = await _imageProcessingService.ResizeAndSaveImageAsync(processingModel);
        return imageUrl;
    }

    public async Task<CategoryResDTO> CreateEntityAsync(CategoryReqDTO categoryReqDTOs)
    {
        if (categoryReqDTOs == null)
        {
            throw new BadRequestException("Category request DTO cannot be null");
        }

        ValidationResult validationResult = await _validatorReqDTO.ValidateAsync(categoryReqDTOs);

        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }
        
        Category newCategory = _mapper.Map<Category>(categoryReqDTOs);
        EntityHelper.SetIdValue(newCategory);
        EntityHelper.SetDateTimeValue(newCategory, new[] { nameof(Category.CreatedAt), nameof(Category.UpdatedAt) });
        EntityHelper.SetNormalizedTermValue(newCategory, _normalizedTermProperties);

        if (!string.IsNullOrEmpty(categoryReqDTOs.Image) && categoryReqDTOs.File != null)
        {
            string fileName = newCategory.Id.ToString();
            string imageUrl = await ResizeAndSaveImageAsync(categoryReqDTOs.File, fileName);
            newCategory.Image = imageUrl;
        }

        await _categoryRepository.AddEntityAsync(newCategory);
        await _unitOfWork.SaveChangesAsync();
        
        return _mapper.Map<CategoryResDTO>(newCategory);
    }

    public async Task<CategoryResDTO> UpdateEntityAsync(Guid id, CategoryReqDTO categoryReqDTOs)
    {
        if (categoryReqDTOs == null)
        {
            throw new BadRequestException("Category request DTO cannot be null");
        }

        if (id == Guid.Empty)
        {
            throw new BadRequestException("ID cannot be empty");
        }
        
        Category? categoryRecord = await _categoryRepository.GetEntityByIdAsync(id);

        if (categoryRecord == null)
        {
            throw new NotFoundException("Category not found");
        }

        ValidationResult validationResult = await _validatorReqDTO.ValidateAsync(categoryReqDTOs);

        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }
        
        if (categoryReqDTOs.Image != categoryRecord.Image && categoryReqDTOs.File != null)
        {
            string fileName = categoryRecord.Id.ToString();
            string imageUrl = await ResizeAndSaveImageAsync(categoryReqDTOs.File, fileName);
            categoryReqDTOs.Image = imageUrl;
        }

        _mapper.Map(categoryReqDTOs, categoryRecord);
        EntityHelper.SetDateTimeValue(categoryRecord, nameof(Category.UpdatedAt));
        EntityHelper.SetNormalizedTermValue(categoryRecord, _normalizedTermProperties);

        await _categoryRepository.UpdateEntityAsync(categoryRecord);
        await _unitOfWork.SaveChangesAsync();
        
        return _mapper.Map<CategoryResDTO>(categoryRecord);
    }

    public async Task<Guid> DeleteEntityAsync(Guid id)
    {
        if (id == Guid.Empty)
        {
            throw new BadRequestException("ID cannot be empty");
        }

        Category? categoryRecord = await _categoryRepository.GetEntityByIdAsync(id);

        if (categoryRecord == null)
        {
            throw new NotFoundException("Category not found");
        }

        if (string.IsNullOrWhiteSpace(categoryRecord.Image))
        {
            throw new NotFoundException("Category image url not found");
        }

        await _fileStorageService.DeleteFileAsync(categoryRecord.Image);
        await _categoryRepository.RemoveEntityAsync(categoryRecord);
        await _unitOfWork.SaveChangesAsync();
        
        return categoryRecord.Id;
    }
}
