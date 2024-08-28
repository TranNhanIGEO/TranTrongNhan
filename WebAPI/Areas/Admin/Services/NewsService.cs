using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Repositories.Interfaces;
using SoftKiwiFlorist.Areas.Admin.Services.Interfaces;
using SoftKiwiFlorist.Models;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;
using SoftKiwiFlorist.Models.Services;
using SoftKiwiFlorist.Services.External.Interfaces;
using SoftKiwiFlorist.Repositories.Base.Interfaces;
using SoftKiwiFlorist.Models.Enums;

namespace SoftKiwiFlorist.Areas.Admin.Services;

public class AdminNewsService : IAdminNewsService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private readonly INewsRepository _newsRepository;
    private readonly IImageProcessingService _imageProcessingService;
    private readonly IFileStorageService _fileStorageService;
    private readonly IValidator<NewsReqDTO> _validatorReqDTO;
    private readonly Dictionary<string, Func<News, object>> _normalizedTermProperties;

    public AdminNewsService(
        IMapper mapper, 
        IUnitOfWork unitOfWork, 
        INewsRepository newsRepository, 
        IImageProcessingService imageProcessingService, 
        IFileStorageService fileStorageService, 
        IValidator<NewsReqDTO> validatorReqDTO)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
        _newsRepository = newsRepository;
        _imageProcessingService = imageProcessingService;
        _fileStorageService = fileStorageService;
        _validatorReqDTO = validatorReqDTO;
        _normalizedTermProperties = new Dictionary<string, Func<News, object>>()
        {
            { nameof(News.Title), c => c.Title },
            { nameof(News.Summary), c => c.Summary },
            { nameof(News.Content), c => c.Content },
            { nameof(News.Category), c => c.Category?.Name! },
            { nameof(News.CreatedAt), c => c.CreatedAt.ToString("O") },
            { nameof(News.UpdatedAt), c => c.UpdatedAt.ToString("O") },
        };
    }

    private async Task<string> ResizeAndSaveImageAsync(IFormFile formFile, string fileName)
    {
        string folderPath = Path.Combine("images", "news");
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

    public async Task<NewsResDTO> CreateEntityAsync(NewsReqDTO model)
    {
        if (model == null)
        {
            throw new BadRequestException("News request DTO cannot be null");
        }

        ValidationResult validationResult = await _validatorReqDTO.ValidateAsync(model);

        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }
        
        News newNews = _mapper.Map<News>(model);
        EntityHelper.SetIdValue(newNews);
        EntityHelper.SetDateTimeValue(newNews, new[] { nameof(News.CreatedAt), nameof(News.UpdatedAt) });
        EntityHelper.SetNormalizedTermValue(newNews, _normalizedTermProperties);

        if (!string.IsNullOrEmpty(model.Image) && model.File != null)
        {
            string fileName = newNews.Id.ToString();
            string imageUrl = await ResizeAndSaveImageAsync(model.File, fileName);
            newNews.Image = imageUrl;
        }

        await _newsRepository.AddEntityAsync(newNews);
        await _unitOfWork.SaveChangesAsync();
        
        return _mapper.Map<NewsResDTO>(newNews);
    }

    public async Task<NewsResDTO> UpdateEntityAsync(Guid id, NewsReqDTO model)
    {
        if (model == null)
        {
            throw new BadRequestException("News request DTO cannot be null");
        }

        if (id == Guid.Empty)
        {
            throw new BadRequestException("ID cannot be empty");
        }

        News? newsRecord = await _newsRepository.GetEntityByIdAsync(id);

        if (newsRecord == null)
        {
            throw new NotFoundException("News not found");
        }

        ValidationResult validationResult = await _validatorReqDTO.ValidateAsync(model);

        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }

        if (model.Image != newsRecord.Image && model.File != null)
        {
            string fileName = newsRecord.Id.ToString();
            string imageUrl = await ResizeAndSaveImageAsync(model.File, fileName);
            model.Image = imageUrl;
        }
        
        _mapper.Map(model, newsRecord);
        EntityHelper.SetDateTimeValue(newsRecord, nameof(News.UpdatedAt));
        EntityHelper.SetNormalizedTermValue(newsRecord, _normalizedTermProperties);

        await _newsRepository.UpdateEntityAsync(newsRecord);
        await _unitOfWork.SaveChangesAsync();
        
        return _mapper.Map<NewsResDTO>(newsRecord);
    }

    public async Task<Guid> DeleteEntityAsync(Guid id)
    {
        if (id == Guid.Empty)
        {
            throw new BadRequestException("ID cannot be empty");
        }
        
        News? newsRecord = await _newsRepository.GetEntityByIdAsync(id);

        if (newsRecord == null)
        {
            throw new NotFoundException("News not found");
        }

        if (string.IsNullOrWhiteSpace(newsRecord.Image))
        {
            throw new NotFoundException("News image url not found");
        }

        await _fileStorageService.DeleteFileAsync(newsRecord.Image);
        await _newsRepository.RemoveEntityAsync(newsRecord);
        await _unitOfWork.SaveChangesAsync();
        
        return newsRecord.Id;
    }
}