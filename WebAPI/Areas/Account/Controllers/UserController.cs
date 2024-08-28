using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using SoftKiwiFlorist.Areas.Account.Services.Interfaces;
using SoftKiwiFlorist.Areas.Account.Models;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Models.Response;
using SoftKiwiFlorist.Models.Entities;
using FluentValidation;
using SoftKiwiFlorist.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using SoftKiwiFlorist.Models.Enums;

namespace SoftKiwiFlorist.Areas.Account.Controllers;
[ApiController]
[ApiVersion("1.0")]
[Area("Account")]
[Authorize(Roles = nameof(RoleTypes.Admin) + "," + nameof(RoleTypes.User))]
[Route("api/v{version:apiVersion}/[controller]")]

public class UserController : ControllerBase
{
    private readonly IAccountService _accountService;
    private readonly IUserService _userService;
    private readonly ILogger<UserController> _logger;

    public UserController(IAccountService accountService, IUserService userService, ILogger<UserController> logger)
    {
        _accountService = accountService;
        _userService = userService;
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
    
    [HttpPost("Change-Password/{userId}"), MapToApiVersion("1.0")]
    public async Task<IActionResult> ChangePassword([FromRoute]string userId, [FromForm]PasswordChangingModel model)
    {
        try
        {
            User newUser = await _userService.ChangePasswordAsync(userId, model);
            TokenModel token = await _accountService.GenerateTokenAsync(newUser);
            AssignRefreshTokenIntoCookie(token.RefreshToken!);
            AssignUserIdIntoCookie(newUser.Id, true);
            
            return ResponseHelper.LoginSuccessfullyResponse(new LoginSuccessfullyResponseModel()
            {
                Token = token.AccessToken,
                Message = "Change password successfully!",
            });
        }
        catch (ValidationException err)
        {
            _logger.LogError(err, "ValidationException: {Message}", err.Message);
            return ResponseHelper.BadRequestErrorResponse(new BadRequestErrorResponseModel()
            {
                Message = "Invalid information about user",
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
    
    [HttpPost("Change-Email/{userId}"), MapToApiVersion("1.0")]
    public async Task<IActionResult> ChangeEmail([FromRoute]string userId, [FromForm] SoftKiwiFlorist.Models.DTOs.EmailChangingModel model)
    {
        try
        {
            User user = await _userService.ChangeEmailAsync(userId, model);
            await _accountService.SendEmailChangingAsync(user, model.Email);
            TokenModel token = await _accountService.GenerateTokenAsync(user);
            AssignRefreshTokenIntoCookie(token.RefreshToken!);
            AssignUserIdIntoCookie(user.Id, true);
            
            return ResponseHelper.LoginSuccessfullyResponse(new LoginSuccessfullyResponseModel()
            {
                Token = token.AccessToken,
                Message = "Change email successfully!",
            });
        }
        catch (ValidationException err)
        {
            _logger.LogError(err, "ValidationException: {Message}", err.Message);
            return ResponseHelper.BadRequestErrorResponse(new BadRequestErrorResponseModel()
            {
                Message = "Invalid information about user",
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
    
    [HttpPost("Change-Profile/{userId}"), MapToApiVersion("1.0")]
    public async Task<IActionResult> ChangeProfile([FromRoute]string userId, [FromForm]ProfileReqDTO model)
    {
        try
        {
            User newUser = await _userService.ChangeProfileAsync(userId, model);
            TokenModel token = await _accountService.GenerateTokenAsync(newUser);
            AssignRefreshTokenIntoCookie(token.RefreshToken!);
            AssignUserIdIntoCookie(newUser.Id, true);
            
            return ResponseHelper.LoginSuccessfullyResponse(new LoginSuccessfullyResponseModel()
            {
                Token = token.AccessToken,
                Message = "Change profile successfully!",
            });
        }
        catch (ValidationException err)
        {
            _logger.LogError(err, "ValidationException: {Message}", err.Message);
            return ResponseHelper.BadRequestErrorResponse(new BadRequestErrorResponseModel()
            {
                Message = "Invalid information about user",
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
}
