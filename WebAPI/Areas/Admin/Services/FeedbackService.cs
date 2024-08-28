using AutoMapper;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Repositories.Interfaces;
using SoftKiwiFlorist.Areas.Admin.Services.Interfaces;
using SoftKiwiFlorist.Models;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;
using SoftKiwiFlorist.Services.External.Interfaces;
using SoftKiwiFlorist.Repositories.Base.Interfaces;

namespace SoftKiwiFlorist.Areas.Admin.Services;

public class AdminFeedbackService : IAdminFeedbackService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IFeedbackRepository _feedbackRepository;
    private readonly IFileStorageService _fileStorageService;

    public AdminFeedbackService(
        IMapper mapper, 
        IUnitOfWork unitOfWork, 
        IFeedbackRepository feedbackRepository, 
        IFileStorageService fileStorageService)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
        _feedbackRepository = feedbackRepository;
        _fileStorageService = fileStorageService;
    }

    public async Task<Guid> DeleteEntityAsync(Guid id)
    {
        if (id == Guid.Empty)
        {
            throw new BadRequestException("ID cannot be empty");
        }
        
        Feedback? feedbackRecord = await _feedbackRepository.GetEntityByIdAsync(id);

        if (feedbackRecord == null)
        {
            throw new NotFoundException("Feedback not found");
        }

        if (!string.IsNullOrWhiteSpace(feedbackRecord.Image))
        {
            await _fileStorageService.DeleteFileAsync(feedbackRecord.Image);
        }

        await _feedbackRepository.RemoveEntityAsync(feedbackRecord);
        await _unitOfWork.SaveChangesAsync();
        
        return feedbackRecord.Id;
    }
}