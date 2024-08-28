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
using SoftKiwiFlorist.Models.Enums;
using SoftKiwiFlorist.Services.External;
using SoftKiwiFlorist.Repositories.Base.Interfaces;
using FluentValidation;
using FluentValidation.Results;

namespace SoftKiwiFlorist.Areas.Account.Services;

public class AccountService : IAccountService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly IMailSendingService _mailSendingService;
    private readonly IValidator<RegisterModel> _registrationValidator;
    private readonly IValidator<LoginModel> _loginValidator;
    private readonly IConfiguration _configuration;
    private readonly Dictionary<string, Func<User, object>> _normalizedTermProperties;
    private readonly string _clientUrl;

    public AccountService(
        IMapper mapper, 
        IUnitOfWork unitOfWork, 
        UserManager<User> userManager, 
        SignInManager<User> signInManager, 
        IMailSendingService mailSendingService, 
        IValidator<RegisterModel> registrationValidator,
        IValidator<LoginModel> loginValidator,
        IConfiguration configuration)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
        _userManager = userManager;
        _signInManager = signInManager;
        _mailSendingService = mailSendingService;
        _registrationValidator = registrationValidator;
        _loginValidator = loginValidator;
        _configuration = configuration;
        _clientUrl = _configuration["AppSettings:ClientURL"]!;
        _normalizedTermProperties = new Dictionary<string, Func<User, object>>()
        {
            { nameof(User.UserName), c => c.UserName! },
            { nameof(User.Email), c => c.Email! },
            { nameof(User.FullName), c => c.FullName! },
            { nameof(User.CreatedAt), c => c.CreatedAt.ToString("O") },
            { nameof(User.UpdatedAt), c => c.UpdatedAt.ToString("O") },
        };
    }
    
    public async Task<TokenModel> GenerateTokenAsync(User user)
    {
        IList<string>? roles = await _userManager.GetRolesAsync(user);
        
        string accessToken = JsonWebTokenService.GenerateAccessToken(user, roles);
        string refreshToken = JsonWebTokenService.GenerateRefreshToken();

        await _userManager.SetAuthenticationTokenAsync(user, "JWT", "refresh_token", refreshToken);

        TokenModel tokenModel = new TokenModel() 
        { 
            AccessToken = accessToken, 
            RefreshToken = refreshToken 
        };

        return tokenModel;
    }

    public async Task<User> RegisterAccountAsync(RegisterModel model)
    {
        if (model == null)
        {
            throw new BadRequestException("Register model cannot be null");
        }
        
        ValidationResult validationResult = await _registrationValidator.ValidateAsync(model);

        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }

        User? userExisting = await _userManager.FindByNameAsync(model.UserName);

        if (userExisting != null)
        {
            throw new ConflictException("UserName has been registered");
        }
        
        userExisting = await _userManager.FindByEmailAsync(model.Email);

        if (userExisting != null)
        {
            throw new ConflictException("Email has been registered");
        }

        User newUser = _mapper.Map<User>(model);
        EntityHelper.SetDateTimeValue(newUser, new[] { nameof(User.CreatedAt), nameof(User.UpdatedAt) });
        EntityHelper.SetNormalizedTermValue(newUser, _normalizedTermProperties);

        IdentityResult result = await _userManager.CreateAsync(newUser, model.Password);

        if (!result.Succeeded)
        {
            throw new BadRequestException("Error registering account");
        }

        await _userManager.AddToRoleAsync(newUser, nameof(RoleTypes.User));
        
        return newUser;
    }

    public async Task SendConfirmationEmailAsync(User newUser)
    {
        if (newUser == null)
        {
            throw new BadRequestException("User model cannot be null");
        }
        
        string code = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);
        code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
        
        UriBuilder urlBuilder = new UriBuilder(_clientUrl)
        {
            Path = "/confirm-email",
            Query = $"userId={newUser.Id}&code={code}"
        };

        string callbackUrl = urlBuilder.ToString();

        MailContent mailContent = new MailContent() 
        {
            ToMail = newUser.Email!,
            Subject = "Verify email address",
            Body = $"You are registered as the Kiwi Florist, Please <a href='{HtmlEncoder.Default.Encode(callbackUrl!)}'>click here</a> to activate account"
        };

        await _mailSendingService.SendMailAsync(mailContent);
    }

    public async Task<User> ConfirmEmailAsync(EmailConfirmationModel model)
    {
        if (model == null)
        {
            throw new BadRequestException("Confirm email model cannot be null");
        }

        if (string.IsNullOrEmpty(model.UserId) || string.IsNullOrEmpty(model.Code))
        {
            throw new BadRequestException("UserId and Code cannot be null");
        }

        User? userRecord = await _userManager.FindByIdAsync(model.UserId);

        if (userRecord == null)
        {
            throw new NotFoundException("User not found");
        }

        if (userRecord.EmailConfirmed)
        {
            throw new BadRequestException("Email is already confirmed");
        }

        string code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(model.Code));
        IdentityResult result = await _userManager.ConfirmEmailAsync(userRecord, code);

        if (!result.Succeeded)
        {
            throw new BadRequestException("Error confirming email");
        }

        return userRecord;
    }

    public async Task SendEmailChangingAsync(User user, string newEmail)
    {
        if (user == null)
        {
            throw new BadRequestException("User model cannot be null");
        }

        if (string.IsNullOrEmpty(newEmail))
        {
            throw new BadRequestException("New email cannot be null");
        }
        
        string code = await _userManager.GenerateChangeEmailTokenAsync(user, newEmail);
        code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
        
        UriBuilder urlBuilder = new UriBuilder(_clientUrl)
        {
            Path = "/confirm-email-changing",
            Query = $"userId={user.Id}&code={code}&newEmail={newEmail}"
        };

        string callbackUrl = urlBuilder.ToString();

        MailContent mailContent = new MailContent() 
        {
            ToMail = user.Email!,
            Subject = "Verify email address changing",
            Body = $"You are changed email address, Please <a href='{HtmlEncoder.Default.Encode(callbackUrl!)}'>click here</a> to confirm your email"
        };

        await _mailSendingService.SendMailAsync(mailContent);
    }

    public async Task<User> ConfirmEmailChangingAsync(EmailChangingModel model)
    {
        if (model == null)
        {
            throw new BadRequestException("Confirm email model cannot be null");
        }

        if (string.IsNullOrEmpty(model.UserId) || string.IsNullOrEmpty(model.Code) || string.IsNullOrEmpty(model.NewEmail))
        {
            throw new BadRequestException("UserId, Code and New Email cannot be null");
        }

        User? userRecord = await _userManager.FindByIdAsync(model.UserId);

        if (userRecord == null)
        {
            throw new NotFoundException("User not found");
        }

        if (userRecord.EmailConfirmed)
        {
            throw new BadRequestException("Email is already confirmed");
        }

        string code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(model.Code));
        IdentityResult result = await _userManager.ChangeEmailAsync(userRecord, model.NewEmail, code);

        if (!result.Succeeded)
        {
            throw new BadRequestException("Error confirming email");
        }

        return userRecord;
    }

    public async Task<User> LoginAccountAsync(LoginModel model)
    {
        if (model == null)
        {
            throw new BadRequestException("Login model cannot be null.");
        }

        ValidationResult validationResult = await _loginValidator.ValidateAsync(model);

        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }

        User? userRecord = await _userManager.FindByNameAsync(model.UserNameOrEmail);

        if (userRecord == null)
        {
            userRecord = await _userManager.FindByEmailAsync(model.UserNameOrEmail);
        }

        if (userRecord == null)
        {
            throw new NotFoundException("User not found");
        }

        var result = await _signInManager.PasswordSignInAsync(userRecord!, model.Password, isPersistent: false, lockoutOnFailure: true);

        if (!userRecord.EmailConfirmed)
        {
            throw new BadRequestException("Email has been registered but not activated");
        }
        
        if (result.IsLockedOut)
        {
            throw new BadRequestException($"Account locked, please try again in {DateHelper.GetRemainingLockoutMinutes(userRecord.LockoutEnd)} minutes");
        }

        if (!result.Succeeded)
        {
            throw new BadRequestException($"Wrong password, account will be locked if you enter it wrong {5 - userRecord.AccessFailedCount} more times");
        } 

        return userRecord;
    }

    public async Task<User> RefreshAccountAsync(RefreshLoginModel model)
    {
        if (string.IsNullOrEmpty(model.UserId) || string.IsNullOrEmpty(model.RefreshToken))
        {
            throw new UnauthorizedException("You are unauthenticated");
        }

        // TokenValidationResult validationResult = await JsonWebTokenService.VerifyAccessToken(model.AccessToken);

        // if (!validationResult.IsValid)
        // {
        //     throw new ForbiddenException("You are unauthorized");
        // }

        // string email = validationResult.ClaimsIdentity.FindFirst(ClaimTypes.Email)?.Value!;

        // if (string.IsNullOrEmpty(email))
        // {
        //     throw new BadRequestException("Email cannot be null");
        // }

        User? userRecord = await _userManager.FindByIdAsync(model.UserId);

        if (userRecord == null)
        {
            throw new NotFoundException("User not found");
        }

        string? refreshTokenRecord = await _userManager.GetAuthenticationTokenAsync(userRecord, "JWT", "refresh_token");

        if (string.IsNullOrEmpty(refreshTokenRecord))
        {
            throw new NotFoundException("Refresh token not found");
        }

        if (refreshTokenRecord != model.RefreshToken)
        {
            throw new BadRequestException("Invalid refresh token");
        }

        return userRecord;
    }

    public async Task LogoutAccountAsync(LogoutModel model)
    {
        if (string.IsNullOrEmpty(model.UserId) || string.IsNullOrEmpty(model.RefreshToken))
        {
            throw new UnauthorizedException("You are unauthenticated");
        }

        User? userRecord = await _userManager.FindByIdAsync(model.UserId);

        if (userRecord == null)
        {
            throw new NotFoundException("User not found");
        }

        string? refreshTokenRecord = await _userManager.GetAuthenticationTokenAsync(userRecord, "JWT", "refresh_token");

        if (string.IsNullOrEmpty(refreshTokenRecord))
        {
            throw new NotFoundException("Refresh token not found");
        }

        if (refreshTokenRecord != model.RefreshToken)
        {
            throw new BadRequestException("Invalid refresh token");
        }

        await _userManager.RemoveAuthenticationTokenAsync(userRecord, "JWT", "refresh_token");
        await _signInManager.SignOutAsync();
    }
    
    public async Task<User> ForgotPasswordAsync(ForgotPasswordModel model)
    {
        if (model == null)
        {
            throw new BadRequestException("Forgot password model cannot be null");
        }
        
        User? userRecord = await _userManager.FindByEmailAsync(model.Email);

        if (userRecord == null)
        {
            throw new NotFoundException("User not found");
        }

        bool isEmailConfirmed = await _userManager.IsEmailConfirmedAsync(userRecord);

        if (!isEmailConfirmed)
        {
            throw new BadRequestException("Email has been registered but not activated");
        }

        return userRecord;
    }

    public async Task SendResetPasswordEmailAsync(User userRecord)
    {
        if (userRecord == null)
        {
            throw new BadRequestException("User model cannot be null");
        }
        
        string code = await _userManager.GeneratePasswordResetTokenAsync(userRecord);
        code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));

        UriBuilder urlBuilder = new UriBuilder(_clientUrl)
        {
            Path = "/reset-password",
            Query = $"email={userRecord.Email}&code={code}",
        };

        string callbackUrl = urlBuilder.ToString();

        MailContent mailContent = new MailContent()
        {
            ToMail = userRecord.Email!,
            Subject = "Reset your password",
            Body = $"Please <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>click here</a> to reset your password"
        };

        await _mailSendingService.SendMailAsync(mailContent);
    }

    public async Task ResetPasswordAsync(ResetPasswordModel model)
    {
        if (model == null)
        {
            throw new BadRequestException("Forgot password model cannot be null");
        }
        
        User? userRecord = await _userManager.FindByEmailAsync(model.Email);

        if (userRecord == null)
        {
            throw new NotFoundException("User not found");
        }

        string code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(model.Code));
        IdentityResult result = await _userManager.ResetPasswordAsync(userRecord, code, model.Password);
        
        if (!result.Succeeded)
        {
            throw new BadRequestException("Error resetting password");
        }
    }

    public async Task<User> FacebookLoginAsync(ExternalLoginModel model)
    {
        if (model == null)
        {
            throw new BadRequestException("Login model cannot be null.");
        }

        if (string.IsNullOrEmpty(model.Token))
        {
            throw new BadRequestException("Token cannot be null.");
        }

        FacebookUser? facebookUser = await JsonWebTokenService.VerifyFacebookAccessTokenAsync(model.Token);

        if (facebookUser == null)
        {
            throw new NotFoundException("Token not found.");
        }
        
        User? userRecord = await _userManager.FindByEmailAsync(facebookUser.Email);
        
        if (userRecord == null)
        {
            User newUser = new User() {
                UserName = facebookUser.Email,
                Email = facebookUser.Email
            };
            EntityHelper.SetDateTimeValue(newUser, new[] { nameof(User.CreatedAt), nameof(User.UpdatedAt) });
            EntityHelper.SetNormalizedTermValue(newUser, _normalizedTermProperties);

            var result = await _userManager.CreateAsync(newUser);

            if (!result.Succeeded)
            {
                throw new BadRequestException("Error creating user");
            }

            await _userManager.AddToRoleAsync(newUser, nameof(RoleTypes.User));
        
            var code = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);
            await _userManager.ConfirmEmailAsync(newUser, code);
            
            userRecord = newUser;
        }

        return userRecord;
    }

    public async Task<User> GoogleLoginAsync(ExternalLoginModel model)
    {
        if (model == null)
        {
            throw new BadRequestException("Login model cannot be null.");
        }

        if (string.IsNullOrEmpty(model.Token))
        {
            throw new BadRequestException("Token cannot be null.");
        }

        GoogleUser? googleTokenInfo = await JsonWebTokenService.VerifyGoogleAccessTokenAsync(model.Token);

        if (googleTokenInfo == null)
        {
            throw new NotFoundException("Token not found.");
        }
        
        User? userRecord = await _userManager.FindByEmailAsync(googleTokenInfo.Email);
        
        if (userRecord == null)
        {
            User newUser = new User() {
                UserName = googleTokenInfo.Email,
                Email = googleTokenInfo.Email
            };

            var result = await _userManager.CreateAsync(newUser);
            EntityHelper.SetDateTimeValue(newUser, new[] { nameof(User.CreatedAt), nameof(User.UpdatedAt) });
            EntityHelper.SetNormalizedTermValue(newUser, _normalizedTermProperties);

            if (!result.Succeeded)
            {
                throw new BadRequestException("Error creating user");
            }

            await _userManager.AddToRoleAsync(newUser, nameof(RoleTypes.User));
        
            var code = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);
            await _userManager.ConfirmEmailAsync(newUser, code);
            
            userRecord = newUser;
        }

        return userRecord;
    }
}