using SoftKiwiFlorist.Areas.Account.Models;
using Microsoft.AspNetCore.Identity;
using SoftKiwiFlorist.Models.Entities;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;
using SoftKiwiFlorist.Services.External.Interfaces;
using SoftKiwiFlorist.Models.Services;
using System.Text.Encodings.Web;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Areas.Account.Services.Interfaces;
using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using SoftKiwiFlorist.Models.Enums;
using SoftKiwiFlorist.Services.External;
using SoftKiwiFlorist.Repositories.Base.Interfaces;
using FluentValidation;
using FluentValidation.Results;
using SoftKiwiFlorist.Models.DTOs;

namespace SoftKiwiFlorist.Areas.Account.Services;

public class UserService : IUserService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly IMailSendingService _mailSendingService;
    private readonly IImageProcessingService _imageProcessingService;
    private readonly IValidator<ProfileReqDTO> _profileValidator;
    private readonly IValidator<SoftKiwiFlorist.Models.DTOs.EmailChangingModel> _emailChangingValidator;
    private readonly IValidator<PasswordChangingModel> _passwordChangingValidator;
    private readonly IConfiguration _configuration;
    private readonly Dictionary<string, Func<User, object>> _normalizedTermProperties;
    private readonly string _clientUrl;

    public UserService(
        IMapper mapper, 
        IUnitOfWork unitOfWork, 
        UserManager<User> userManager, 
        SignInManager<User> signInManager, 
        IMailSendingService mailSendingService, 
        IImageProcessingService imageProcessingService, 
        IValidator<ProfileReqDTO> profileValidator,
        IValidator<SoftKiwiFlorist.Models.DTOs.EmailChangingModel> emailChangingValidator,
        IValidator<PasswordChangingModel> passwordChangingValidator,
        IConfiguration configuration)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
        _userManager = userManager;
        _signInManager = signInManager;
        _mailSendingService = mailSendingService;
        _imageProcessingService = imageProcessingService;
        _profileValidator = profileValidator;
        _emailChangingValidator = emailChangingValidator;
        _passwordChangingValidator = passwordChangingValidator;
        _configuration = configuration;
        _clientUrl = _configuration["AppSettings:ClientURL"]!;
        _normalizedTermProperties = new Dictionary<string, Func<User, object>>()
        {
            { nameof(User.UserName), c => c.UserName! },
            { nameof(User.Email), c => c.Email! },
            { nameof(User.PhoneNumber), c => c.PhoneNumber! },
            { nameof(User.FullName), c => c.FullName! },
            { nameof(User.HomeAddress), c => c.HomeAddress! },
            { nameof(User.CreatedAt), c => c.CreatedAt.ToString("O") },
            { nameof(User.UpdatedAt), c => c.UpdatedAt.ToString("O") },
        };
    }
    
    private async Task<string> ResizeAndSaveImageAsync(IFormFile formFile, string fileName)
    {
        string folderPath = Path.Combine("images", "users");
        string fileKey = string.Concat(fileName, ".", nameof(ImageFormat.Jpeg).ToLower());
        
        ImageProcessingModel processingModel = new ImageProcessingModel()
        {
            FileName = fileKey,
            FolderPath = folderPath,
            FormFile = formFile,
            Width = 250,
            Height = 250,
            Format = ImageFormat.Jpeg,
        };

        string imageUrl = await _imageProcessingService.ResizeAndSaveImageAsync(processingModel);
        return imageUrl;
    }

    public async Task<User> ChangePasswordAsync(string userId, PasswordChangingModel model)
    {
        if (string.IsNullOrEmpty(userId))
        {
            throw new BadRequestException("UserId cannot be null");
        }

        if (model == null)
        {
            throw new BadRequestException("Password changing model cannot be null");
        }

        User? userRecord = await _userManager.FindByIdAsync(userId);

        if (userRecord == null)
        {
            throw new NotFoundException("User not found");
        }

        ValidationResult validationResult = await _passwordChangingValidator.ValidateAsync(model);

        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }

        bool isValidPassword = await _userManager.CheckPasswordAsync(userRecord, model.CurrentPassword);

        if (!isValidPassword)
        {
            throw new BadRequestException("Current password is incorrect");
        }

        IdentityResult result = await _userManager.ChangePasswordAsync(userRecord, model.CurrentPassword, model.NewPassword);

        if (!result.Succeeded)
        {
            throw new BadRequestException("Error change password");
        }

        return userRecord;
    }

    public async Task<User> ChangeEmailAsync(string userId, SoftKiwiFlorist.Models.DTOs.EmailChangingModel model)
    {
        if (string.IsNullOrEmpty(userId))
        {
            throw new BadRequestException("UserId cannot be null");
        }

        if (model == null)
        {
            throw new BadRequestException("Password changing model cannot be null");
        }

        User? userRecord = await _userManager.FindByIdAsync(userId);

        if (userRecord == null)
        {
            throw new NotFoundException("User not found");
        }

        ValidationResult validationResult = await _emailChangingValidator.ValidateAsync(model);

        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }

        if (userRecord.Email == model.Email)
        {
            throw new BadRequestException("Email does not change");
        }

        User? userExisting = await _userManager.FindByEmailAsync(model.Email!);
        
        if (userExisting != null)
        {
            throw new ConflictException("Email has been registered");
        }

        return userRecord;
    }

    public async Task<User> ChangeProfileAsync(string userId, ProfileReqDTO model)
    {
        if (string.IsNullOrEmpty(userId))
        {
            throw new BadRequestException("UserId cannot be null");
        }

        if (model == null)
        {
            throw new BadRequestException("User model cannot be null");
        }

        User? userRecord = await _userManager.FindByIdAsync(userId);

        if (userRecord == null)
        {
            throw new NotFoundException("User not found");
        }

        ValidationResult validationResult = await _profileValidator.ValidateAsync(model);

        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }

        if (model.Avatar != userRecord.Avatar && model.File != null)
        {
            string fileName = userRecord.Id.ToString();
            string imageUrl = await ResizeAndSaveImageAsync(model.File, fileName);
            model.Avatar = imageUrl;
        }
        
        _mapper.Map(model, userRecord);
        EntityHelper.SetDateTimeValue(userRecord, new[] { nameof(Banner.UpdatedAt) });
        EntityHelper.SetNormalizedTermValue(userRecord, _normalizedTermProperties);

        await _userManager.UpdateAsync(userRecord);
        
        return userRecord;
    }
}