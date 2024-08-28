using SoftKiwiFlorist.Areas.Account.Models;
using SoftKiwiFlorist.Models.Entities;

namespace SoftKiwiFlorist.Areas.Account.Services.Interfaces;

public interface IAccountService
{
    Task<TokenModel> GenerateTokenAsync(User user);

    Task<User> RegisterAccountAsync(RegisterModel model);
    Task SendConfirmationEmailAsync(User newUser);
    Task<User> ConfirmEmailAsync(EmailConfirmationModel model);
    Task SendEmailChangingAsync(User newUser, string newEmail);
    Task<User> ConfirmEmailChangingAsync(EmailChangingModel model);

    Task<User> LoginAccountAsync(LoginModel model);
    Task<User> FacebookLoginAsync(ExternalLoginModel model);
    Task<User> GoogleLoginAsync(ExternalLoginModel model);
    
    Task<User> RefreshAccountAsync(RefreshLoginModel model);
    Task LogoutAccountAsync(LogoutModel model);
    
    Task<User> ForgotPasswordAsync(ForgotPasswordModel model);
    Task SendResetPasswordEmailAsync(User newUser);
    Task ResetPasswordAsync(ResetPasswordModel model);
}