using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using SoftKiwiFlorist.Areas.Account.Services.Interfaces;
using SoftKiwiFlorist.Areas.Account.Models;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Models.Response;
using SoftKiwiFlorist.Models.Entities;
using FluentValidation;

namespace SoftKiwiFlorist.Areas.Account.Controllers;
[ApiController]
[ApiVersion("1.0")]
[Area("Account")]
[Route("api/v{version:apiVersion}/[controller]")]

public class AccountController : ControllerBase
{
    private readonly IAccountService _accountService;
    private readonly ILogger<AccountController> _logger;

    public AccountController(IAccountService accountService, ILogger<AccountController> logger)
    {
        _accountService = accountService;
        _logger = logger;
    }
    
    private void AssignRefreshTokenIntoCookie(string refreshToken)
    {
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None,
            Expires = DateHelper.GetCurrentDateTime().AddDays(30)
        };
        Response.Cookies.Append("refresh_token", refreshToken, cookieOptions);
    }
    
    private void AssignUserIdIntoCookie(string userId, bool isRemember = true)
    {
        var cookieOptions = new CookieOptions
        {
            HttpOnly = false,
            Secure = true,
            SameSite = SameSiteMode.None,
            Expires = DateHelper.GetCurrentDateTime().AddDays(30)
        };
        Response.Cookies.Append("uid", userId, cookieOptions);
    }
    
    private void ClearRefreshTokenIntoCookie()
    {
        Response.Cookies.Delete("refresh_token");
    }
    
    private void ClearUserIdIntoCookie()
    {
        Response.Cookies.Delete("uid");
    }

    [HttpPost("Register"), MapToApiVersion("1.0")]
    public async Task<IActionResult> RegisterAccount([FromForm]RegisterModel registerModel)
    {
        try
        {
            User newUser = await _accountService.RegisterAccountAsync(registerModel);
            await _accountService.SendConfirmationEmailAsync(newUser);
            
            return ResponseHelper.RegisterSuccessfullyResponse(new RegisterSuccessfullyResponseModel()
            {
                Message = "Register successfully!",
            });
        }
        catch (ValidationException err)
        {
            _logger.LogError(err, "ValidationException: {Message}", err.Message);
            return ResponseHelper.BadRequestErrorResponse(new BadRequestErrorResponseModel()
            {
                Message = "Invalid information about account",
                Errors = err.Errors.ToDictionary(e => e.PropertyName, e => e.ErrorMessage),
            });
        }
        catch (BadRequestException err)
        {
            _logger.LogError(err, "BadRequestException: {Message}", err.Message);
            return ResponseHelper.BadRequestErrorResponse(new BadRequestErrorResponseModel()
            {
                Message = err.Message
            });
        }
        catch (ConflictException err)
        {
            _logger.LogError(err, "ConflictException: {Message}", err.Message);
            return ResponseHelper.ConflictErrorResponse(new ConflictErrorResponseModel()
            {
                Message = err.Message
            });
        }
        catch (Exception err)
        {
            _logger.LogError(err, "Exception: {Message}", err.Message);
            return ResponseHelper.InternalServerErrorResponse(new InternalServerErrorResponseModel()
            {
                Message = err.Message
            });
        }
    }

    [HttpPost("Confirm-Email"), MapToApiVersion("1.0")]
    public async Task<IActionResult> ConfirmEmail([FromForm]EmailConfirmationModel confirmEmailModel)
    {
        try
        {
            User user = await _accountService.ConfirmEmailAsync(confirmEmailModel);
            TokenModel token = await _accountService.GenerateTokenAsync(user);
            AssignRefreshTokenIntoCookie(token.RefreshToken!);
            AssignUserIdIntoCookie(user.Id, true);
            
            return ResponseHelper.LoginSuccessfullyResponse(new LoginSuccessfullyResponseModel()
            {
                Token = token.AccessToken,
                Message = "Confirm email successfully!",
            });
        }
        catch (ValidationException err)
        {
            _logger.LogError(err, "ValidationException: {Message}", err.Message);
            return ResponseHelper.BadRequestErrorResponse(new BadRequestErrorResponseModel()
            {
                Message = "Invalid information about account",
                Errors = err.Errors.ToDictionary(e => e.PropertyName, e => e.ErrorMessage),
            });
        }
        catch (NotFoundException err)
        {
            _logger.LogError(err, "NotFoundException: {Message}", err.Message);
            return ResponseHelper.NotFoundErrorResponse(new NotFoundErrorResponseModel()
            {
                Message = err.Message
            });
        }
        catch (BadRequestException err)
        {
            _logger.LogError(err, "BadRequestException: {Message}", err.Message);
            return ResponseHelper.BadRequestErrorResponse(new BadRequestErrorResponseModel()
            {
                Message = err.Message
            });
        }
        catch (Exception err)
        {
            _logger.LogError(err, "Exception: {Message}", err.Message);
            return ResponseHelper.InternalServerErrorResponse(new InternalServerErrorResponseModel()
            {
                Message = err.Message
            });
        }
    }

    [HttpPost("Confirm-Email-Changing"), MapToApiVersion("1.0")]
    public async Task<IActionResult> ConfirmEmailChanging([FromForm]EmailChangingModel emailChangingModel)
    {
        try
        {
            User user = await _accountService.ConfirmEmailChangingAsync(emailChangingModel);
            TokenModel token = await _accountService.GenerateTokenAsync(user);
            AssignRefreshTokenIntoCookie(token.RefreshToken!);
            AssignUserIdIntoCookie(user.Id, true);
            
            return ResponseHelper.LoginSuccessfullyResponse(new LoginSuccessfullyResponseModel()
            {
                Token = token.AccessToken,
                Message = "Confirm email successfully!",
            });
        }
        catch (ValidationException err)
        {
            _logger.LogError(err, "ValidationException: {Message}", err.Message);
            return ResponseHelper.BadRequestErrorResponse(new BadRequestErrorResponseModel()
            {
                Message = "Invalid information about account",
                Errors = err.Errors.ToDictionary(e => e.PropertyName, e => e.ErrorMessage),
            });
        }
        catch (NotFoundException err)
        {
            _logger.LogError(err, "NotFoundException: {Message}", err.Message);
            return ResponseHelper.NotFoundErrorResponse(new NotFoundErrorResponseModel()
            {
                Message = err.Message
            });
        }
        catch (BadRequestException err)
        {
            _logger.LogError(err, "BadRequestException: {Message}", err.Message);
            return ResponseHelper.BadRequestErrorResponse(new BadRequestErrorResponseModel()
            {
                Message = err.Message
            });
        }
        catch (Exception err)
        {
            _logger.LogError(err, "Exception: {Message}", err.Message);
            return ResponseHelper.InternalServerErrorResponse(new InternalServerErrorResponseModel()
            {
                Message = err.Message
            });
        }
    }

    [HttpPost("Login"), MapToApiVersion("1.0")]
    public async Task<IActionResult> LoginAccount([FromForm]LoginModel model)
    {
        try
        {
            User user = await _accountService.LoginAccountAsync(model);
            TokenModel token = await _accountService.GenerateTokenAsync(user);
            AssignRefreshTokenIntoCookie(token.RefreshToken!);
            AssignUserIdIntoCookie(user.Id, model.RememberMe);
            
            return ResponseHelper.LoginSuccessfullyResponse(new LoginSuccessfullyResponseModel()
            {
                Token = token.AccessToken,
                Message = "Login successfully!",
            });
        }
        catch (ValidationException err)
        {
            _logger.LogError(err, "ValidationException: {Message}", err.Message);
            return ResponseHelper.BadRequestErrorResponse(new BadRequestErrorResponseModel()
            {
                Message = "Invalid information about account",
                Errors = err.Errors.ToDictionary(e => e.PropertyName, e => e.ErrorMessage),
            });
        }
        catch (NotFoundException err)
        {
            _logger.LogError(err, "NotFoundException: {Message}", err.Message);
            return ResponseHelper.NotFoundErrorResponse(new NotFoundErrorResponseModel()
            {
                Message = err.Message
            });
        }
        catch (BadRequestException err)
        {
            _logger.LogError(err, "BadRequestException: {Message}", err.Message);
            return ResponseHelper.BadRequestErrorResponse(new BadRequestErrorResponseModel()
            {
                Message = err.Message
            });
        }
        catch (Exception err)
        {
            _logger.LogError(err, "Exception: {Message}", err.Message);
            return ResponseHelper.InternalServerErrorResponse(new InternalServerErrorResponseModel()
            {
                Message = err.Message
            });
        }
    }

    [HttpPost("Facebook-Login"), MapToApiVersion("1.0")]
    public async Task<IActionResult> FacebookLogin([FromForm]ExternalLoginModel model)
    {
        try
        {
            User user = await _accountService.FacebookLoginAsync(model);
            TokenModel token = await _accountService.GenerateTokenAsync(user);
            AssignRefreshTokenIntoCookie(token.RefreshToken!);
            AssignUserIdIntoCookie(user.Id, true);
            
            return ResponseHelper.LoginSuccessfullyResponse(new LoginSuccessfullyResponseModel()
            {
                Token = token.AccessToken,
                Message = "Login successfully!",
            });
        }
        catch (ValidationException err)
        {
            _logger.LogError(err, "ValidationException: {Message}", err.Message);
            return ResponseHelper.BadRequestErrorResponse(new BadRequestErrorResponseModel()
            {
                Message = "Invalid information about account",
                Errors = err.Errors.ToDictionary(e => e.PropertyName, e => e.ErrorMessage),
            });
        }
        catch (NotFoundException err)
        {
            _logger.LogError(err, "NotFoundException: {Message}", err.Message);
            return ResponseHelper.NotFoundErrorResponse(new NotFoundErrorResponseModel()
            {
                Message = err.Message
            });
        }
        catch (BadRequestException err)
        {
            _logger.LogError(err, "BadRequestException: {Message}", err.Message);
            return ResponseHelper.BadRequestErrorResponse(new BadRequestErrorResponseModel()
            {
                Message = err.Message
            });
        }
        catch (Exception err)
        {
            _logger.LogError(err, "Exception: {Message}", err.Message);
            return ResponseHelper.InternalServerErrorResponse(new InternalServerErrorResponseModel()
            {
                Message = err.Message
            });
        }
    }

    [HttpPost("Google-Login"), MapToApiVersion("1.0")]
    public async Task<IActionResult> GoogleLogin([FromForm]ExternalLoginModel model)
    {
        try
        {
            User user = await _accountService.GoogleLoginAsync(model);
            TokenModel token = await _accountService.GenerateTokenAsync(user);
            AssignRefreshTokenIntoCookie(token.RefreshToken!);
            AssignUserIdIntoCookie(user.Id, true);
            
            return ResponseHelper.LoginSuccessfullyResponse(new LoginSuccessfullyResponseModel()
            {
                Token = token.AccessToken,
                Message = "Login successfully!",
            });
        }
        catch (ValidationException err)
        {
            _logger.LogError(err, "ValidationException: {Message}", err.Message);
            return ResponseHelper.BadRequestErrorResponse(new BadRequestErrorResponseModel()
            {
                Message = "Invalid information about account",
                Errors = err.Errors.ToDictionary(e => e.PropertyName, e => e.ErrorMessage),
            });
        }
        catch (NotFoundException err)
        {
            _logger.LogError(err, "NotFoundException: {Message}", err.Message);
            return ResponseHelper.NotFoundErrorResponse(new NotFoundErrorResponseModel()
            {
                Message = err.Message
            });
        }
        catch (BadRequestException err)
        {
            _logger.LogError(err, "BadRequestException: {Message}", err.Message);
            return ResponseHelper.BadRequestErrorResponse(new BadRequestErrorResponseModel()
            {
                Message = err.Message
            });
        }
        catch (Exception err)
        {
            _logger.LogError(err, "Exception: {Message}", err.Message);
            return ResponseHelper.InternalServerErrorResponse(new InternalServerErrorResponseModel()
            {
                Message = err.Message
            });
        }
    }

    [HttpPost("Refresh"), MapToApiVersion("1.0")]
    public async Task<IActionResult> RefreshAccount()
    {
        string? refreshToken = Request.Cookies["refresh_token"];
        string? userId = Request.Cookies["uid"];
        try
        {
            RefreshLoginModel model = new RefreshLoginModel() { RefreshToken = refreshToken!, UserId = userId! };
            User user = await _accountService.RefreshAccountAsync(model);
            TokenModel token = await _accountService.GenerateTokenAsync(user);
            AssignRefreshTokenIntoCookie(token.RefreshToken!);
            AssignUserIdIntoCookie(user.Id, true);
            
            return ResponseHelper.LoginSuccessfullyResponse(new LoginSuccessfullyResponseModel()
            {
                Token = token.AccessToken,
                Message = "Refresh successfully!",
            });
        }
        catch (NotFoundException err)
        {
            _logger.LogError(err, "NotFoundException: {Message}", err.Message);
            return ResponseHelper.NotFoundErrorResponse(new NotFoundErrorResponseModel()
            {
                Message = err.Message
            });
        }
        catch (BadRequestException err)
        {
            _logger.LogError(err, "BadRequestException: {Message}", err.Message);
            return ResponseHelper.BadRequestErrorResponse(new BadRequestErrorResponseModel()
            {
                Message = err.Message
            });
        }
        catch (Exception err)
        {
            _logger.LogError(err, "Exception: {Message}", err.Message);
            return ResponseHelper.InternalServerErrorResponse(new InternalServerErrorResponseModel()
            {
                Message = err.Message
            });
        }
    }

    [HttpPost("Logout"), MapToApiVersion("1.0")]
    public async Task<IActionResult> LogoutAccount([FromForm]string? userId)
    {
        string? refreshToken = Request.Cookies["refresh_token"];
        try
        {
            LogoutModel model = new LogoutModel() { RefreshToken = refreshToken!, UserId = userId! };
            await _accountService.LogoutAccountAsync(model);
            ClearRefreshTokenIntoCookie();
            ClearUserIdIntoCookie();

            return ResponseHelper.LogoutSuccessfullyResponse(new LogoutSuccessfullyResponseModel()
            {
                Message = "Logout successfully!",
            });
        }
        catch (NotFoundException err)
        {
            _logger.LogError(err, "NotFoundException: {Message}", err.Message);
            return ResponseHelper.NotFoundErrorResponse(new NotFoundErrorResponseModel()
            {
                Message = err.Message
            });
        }
        catch (BadRequestException err)
        {
            _logger.LogError(err, "BadRequestException: {Message}", err.Message);
            return ResponseHelper.BadRequestErrorResponse(new BadRequestErrorResponseModel()
            {
                Message = err.Message
            });
        }
        catch (Exception err)
        {
            _logger.LogError(err, "Exception: {Message}", err.Message);
            return ResponseHelper.InternalServerErrorResponse(new InternalServerErrorResponseModel()
            {
                Message = err.Message
            });
        }
    }

    [HttpPost("Forgot-Password"), MapToApiVersion("1.0")]
    public async Task<IActionResult> ForgotPassword([FromForm]ForgotPasswordModel model)
    {
        try
        {
            User user = await _accountService.ForgotPasswordAsync(model);
            await _accountService.SendResetPasswordEmailAsync(user);
            
            return ResponseHelper.LoginSuccessfullyResponse(new LoginSuccessfullyResponseModel()
            {
                Message = "Forgot password successfully!",
            });
        }
        catch (NotFoundException err)
        {
            _logger.LogError(err, "NotFoundException: {Message}", err.Message);
            return ResponseHelper.NotFoundErrorResponse(new NotFoundErrorResponseModel()
            {
                Message = err.Message
            });
        }
        catch (BadRequestException err)
        {
            _logger.LogError(err, "BadRequestException: {Message}", err.Message);
            return ResponseHelper.BadRequestErrorResponse(new BadRequestErrorResponseModel()
            {
                Message = err.Message
            });
        }
        catch (Exception err)
        {
            _logger.LogError(err, "Exception: {Message}", err.Message);
            return ResponseHelper.InternalServerErrorResponse(new InternalServerErrorResponseModel()
            {
                Message = err.Message
            });
        }
    }

    [HttpPost("Reset-Password"), MapToApiVersion("1.0")]
    public async Task<IActionResult> ResetPassword([FromForm]ResetPasswordModel model)
    {
        try
        {
            await _accountService.ResetPasswordAsync(model);
            
            return ResponseHelper.LoginSuccessfullyResponse(new LoginSuccessfullyResponseModel()
            {
                Message = "Reset password successfully!",
            });
        }
        catch (NotFoundException err)
        {
            _logger.LogError(err, "NotFoundException: {Message}", err.Message);
            return ResponseHelper.NotFoundErrorResponse(new NotFoundErrorResponseModel()
            {
                Message = err.Message
            });
        }
        catch (BadRequestException err)
        {
            _logger.LogError(err, "BadRequestException: {Message}", err.Message);
            return ResponseHelper.BadRequestErrorResponse(new BadRequestErrorResponseModel()
            {
                Message = err.Message
            });
        }
        catch (Exception err)
        {
            _logger.LogError(err, "Exception: {Message}", err.Message);
            return ResponseHelper.InternalServerErrorResponse(new InternalServerErrorResponseModel()
            {
                Message = err.Message
            });
        }
    }
}
