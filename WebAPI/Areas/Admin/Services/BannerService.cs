using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Repositories.Interfaces;
using SoftKiwiFlorist.Areas.Admin.Services.Interfaces;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;
using SoftKiwiFlorist.Models.Services;
using SoftKiwiFlorist.Services.External.Interfaces;
using SoftKiwiFlorist.Repositories.Base.Interfaces;
using SoftKiwiFlorist.Models.Enums;

namespace SoftKiwiFlorist.Areas.Admin.Services;

public class AdminBannerService : IAdminBannerService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IBannerRepository _bannerRepository;
    private readonly IImageProcessingService _imageProcessingService;
    private readonly IFileStorageService _fileStorageService;
    private readonly IValidator<BannerReqDTO> _validatorReqDTO;
    private readonly Dictionary<string, Func<Banner, object>> _normalizedTermProperties;

    public AdminBannerService(
        IMapper mapper, 
        IUnitOfWork unitOfWork, 
        IBannerRepository bannerRepository, 
        IImageProcessingService imageProcessingService, 
        IFileStorageService fileStorageService, 
        IValidator<BannerReqDTO> validatorReqDTO)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
        _bannerRepository = bannerRepository;
        _imageProcessingService = imageProcessingService;
        _fileStorageService = fileStorageService;
        _validatorReqDTO = validatorReqDTO;
        _normalizedTermProperties = new Dictionary<string, Func<Banner, object>>()
        {
            { nameof(Banner.Category), c => c.Category?.Name! },
            { nameof(Banner.CreatedAt), c => c.CreatedAt.ToString("O") },
            { nameof(Banner.UpdatedAt), c => c.UpdatedAt.ToString("O") },
        };
    }

    private async Task<string> ResizeAndSaveImageAsync(IFormFile formFile, string fileName)
    {
        string folderPath = Path.Combine("images", "banners");
        string fileKey = string.Concat(fileName, ".", nameof(ImageFormat.Jpeg).ToLower());
        
        ImageProcessingModel processingModel = new ImageProcessingModel()
        {
            FileName = fileKey,
            FolderPath = folderPath,
            FormFile = formFile,
            Width = 1300,
            Height = 500,
            Format = ImageFormat.Jpeg,
        };

        string imageUrl = await _imageProcessingService.ResizeAndSaveImageAsync(processingModel);
        return imageUrl;
    }

    public async Task<BannerResDTO> CreateEntityAsync(BannerReqDTO model)
    {
        if (model == null)
        {
            throw new BadRequestException("Banner request DTO cannot be null");
        }

        ValidationResult validationResult = await _validatorReqDTO.ValidateAsync(model);

        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }
        
        Banner newBanner = _mapper.Map<Banner>(model);
        EntityHelper.SetIdValue(newBanner);
        EntityHelper.SetDateTimeValue(newBanner, new[] { nameof(Banner.CreatedAt), nameof(Banner.UpdatedAt) });
        EntityHelper.SetNormalizedTermValue(newBanner, _normalizedTermProperties);

        if (!string.IsNullOrEmpty(model.Image) && model.File != null)
        {
            string fileName = newBanner.Id.ToString();
            string imageUrl = await ResizeAndSaveImageAsync(model.File, fileName);
            newBanner.Image = imageUrl;
        }

        await _bannerRepository.AddEntityAsync(newBanner);
        await _unitOfWork.SaveChangesAsync();
        
        return _mapper.Map<BannerResDTO>(newBanner);
    }

    public async Task<BannerResDTO> UpdateEntityAsync(Guid id, BannerReqDTO model)
    {
        if (model == null)
        {
            throw new BadRequestException("Banner request DTO cannot be null");
        }

        if (id == Guid.Empty)
        {
            throw new BadRequestException("ID cannot be empty");
        }

        Banner? bannerRecord = await _bannerRepository.GetEntityByIdAsync(id);

        if (bannerRecord == null)
        {
            throw new NotFoundException("Banner not found");
        }

        ValidationResult validationResult = await _validatorReqDTO.ValidateAsync(model);

        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }

        if (model.Image != bannerRecord.Image && model.File != null)
        {
            string fileName = bannerRecord.Id.ToString();
            string imageUrl = await ResizeAndSaveImageAsync(model.File, fileName);
            model.Image = imageUrl;
        }
        
        _mapper.Map(model, bannerRecord);
        EntityHelper.SetDateTimeValue(bannerRecord, nameof(Banner.UpdatedAt));
        EntityHelper.SetNormalizedTermValue(bannerRecord, _normalizedTermProperties);

        await _bannerRepository.UpdateEntityAsync(bannerRecord);
        await _unitOfWork.SaveChangesAsync();
        
        return _mapper.Map<BannerResDTO>(bannerRecord);
    }

    public async Task<Guid> DeleteEntityAsync(Guid id)
    {
        if (id == Guid.Empty)
        {
            throw new BadRequestException("ID cannot be empty");
        }
        
        Banner? bannerRecord = await _bannerRepository.GetEntityByIdAsync(id);

        if (bannerRecord == null)
        {
            throw new NotFoundException("Banner not found");
        }

        if (string.IsNullOrWhiteSpace(bannerRecord.Image))
        {
            throw new NotFoundException("Banner image url not found");
        }

        await _fileStorageService.DeleteFileAsync(bannerRecord.Image);
        await _bannerRepository.RemoveEntityAsync(bannerRecord);
        await _unitOfWork.SaveChangesAsync();
        
        return bannerRecord.Id;
    }
}