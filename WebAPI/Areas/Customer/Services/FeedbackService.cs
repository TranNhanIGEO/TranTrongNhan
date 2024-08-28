using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Repositories.Interfaces;
using SoftKiwiFlorist.Areas.Customer.Services.Interfaces;
using SoftKiwiFlorist.Models.Query;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;
using SoftKiwiFlorist.Models.Services;
using SoftKiwiFlorist.Services.External;
using SoftKiwiFlorist.Services.External.Interfaces;
using SoftKiwiFlorist.Repositories.Base.Interfaces;
using SoftKiwiFlorist.Models.Enums;

namespace SoftKiwiFlorist.Areas.Customer.Services;

public class CustomerFeedbackService : ICustomerFeedbackService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IFeedbackRepository _feedbackRepository;
    private readonly IImageProcessingService _imageProcessingService;
    private readonly IFileStorageService _fileStorageService;
    private readonly IValidator<FeedbackReqDTO> _validatorReqDTO;
    private readonly Dictionary<string, Func<Feedback, object>> _normalizedTermProperties;

    public CustomerFeedbackService(
        IMapper mapper, 
        IUnitOfWork unitOfWork, 
        IFeedbackRepository feedbackRepository, 
        IImageProcessingService imageProcessingService, 
        IFileStorageService fileStorageService, 
        IValidator<FeedbackReqDTO> validatorReqDTO)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
        _feedbackRepository = feedbackRepository;
        _imageProcessingService = imageProcessingService;
        _fileStorageService = fileStorageService;
        _validatorReqDTO = validatorReqDTO;
        _normalizedTermProperties = new Dictionary<string, Func<Feedback, object>>()
        {
            { nameof(Feedback.Vote), c => c.Vote },
            { nameof(Feedback.Comment), c => c.Comment! },
            { nameof(Feedback.User), c => c.User?.FullName! },
            { nameof(Feedback.Product), c => c.Product?.Name! },
            { nameof(Feedback.CreatedAt), c => c.CreatedAt.ToString("O") },
            { nameof(Feedback.UpdatedAt), c => c.UpdatedAt.ToString("O") },
        };
    }

    private async Task<string> ResizeAndSaveImageAsync(IFormFile formFile, string fileName)
    {
        string folderPath = Path.Combine("images", "feedbacks");
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

    public async Task<FeedbackResDTO> CreateEntityAsync(FeedbackReqDTO model)
    {
        if (model == null)
        {
            throw new BadRequestException("Feedback request DTO cannot be null");
        }

        ValidationResult validationResult = await _validatorReqDTO.ValidateAsync(model);

        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }
        
        Feedback newFeedback = _mapper.Map<Feedback>(model);
        EntityHelper.SetIdValue(newFeedback);
        EntityHelper.SetDateTimeValue(newFeedback, new[] { nameof(Feedback.CreatedAt), nameof(Feedback.UpdatedAt) });
        EntityHelper.SetNormalizedTermValue(newFeedback, _normalizedTermProperties);

        if (!string.IsNullOrEmpty(model.Image) && model.File != null)
        {
            string fileName = newFeedback.Id.ToString();
            string imageUrl = await ResizeAndSaveImageAsync(model.File, fileName);
            newFeedback.Image = imageUrl;
        }

        await _feedbackRepository.AddEntityAsync(newFeedback);
        await _unitOfWork.SaveChangesAsync();

        return _mapper.Map<FeedbackResDTO>(newFeedback);
    }

    public async Task<FeedbackResDTO> UpdateEntityAsync(Guid id, FeedbackReqDTO model)
    {
        if (model == null)
        {
            throw new BadRequestException("Feedback request DTO cannot be null");
        }

        if (id == Guid.Empty)
        {
            throw new BadRequestException("ID cannot be empty");
        }

        if (id != model.Id)
        {
            throw new BadRequestException("Invalid feedback Id");
        }

        Feedback? feedbackRecord = await _feedbackRepository.GetEntityByIdAsync(id);

        if (feedbackRecord == null)
        {
            throw new NotFoundException("Feedback not found");
        }

        ValidationResult validationResult = await _validatorReqDTO.ValidateAsync(model);

        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }

        if (model.Image != feedbackRecord.Image && model.File != null)
        {
            string fileName = feedbackRecord.Id.ToString();
            string imageUrl = await ResizeAndSaveImageAsync(model.File, fileName);
            model.Image = imageUrl;
        }
        
        _mapper.Map(model, feedbackRecord);
        EntityHelper.SetDateTimeValue(feedbackRecord, nameof(Feedback.UpdatedAt));
        EntityHelper.SetNormalizedTermValue(feedbackRecord, _normalizedTermProperties);

        await _feedbackRepository.UpdateEntityAsync(feedbackRecord);
        await _unitOfWork.SaveChangesAsync();

        return _mapper.Map<FeedbackResDTO>(feedbackRecord);
    }
}