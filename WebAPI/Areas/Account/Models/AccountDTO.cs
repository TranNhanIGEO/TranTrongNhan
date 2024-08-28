namespace SoftKiwiFlorist.Areas.Account.Models;

public class RegisterModel
{
    public string UserName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
}

public class EmailConfirmationModel
{
    public string UserId { get; set; } = null!;
    public string Code { get; set; } = null!;
}

public class EmailChangingModel
{
    public string UserId { get; set; } = null!;
    public string NewEmail { get; set; } = null!;
    public string Code { get; set; } = null!;
}

public class LoginModel
{
    public string UserNameOrEmail { get; set; } = null!;
    public string Password { get; set; } = null!;
    public bool RememberMe { get; set; }
}

public class TokenModel
{
    public string? AccessToken { get; set; }
    public string? RefreshToken { get; set; }
}

public class RefreshLoginModel
{
    public string UserId { get; set; } = null!;
    public string RefreshToken { get; set; } = null!;
}

public class LogoutModel
{
    public string UserId { get; set; } = null!;
    public string RefreshToken { get; set; } = null!;
}

public class ForgotPasswordModel
{
    public string Email { get; set; } = null!;
}

public class ResetPasswordModel
{
    public string Email { get; set; } = null!;
    public string Code { get; set; } = null!;
    public string Password { get; set; } = null!;
}

public class ExternalLoginModel
{
    public string Token { get; set; } = null!;
}
