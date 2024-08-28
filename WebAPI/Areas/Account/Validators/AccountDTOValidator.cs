using FluentValidation;
using SoftKiwiFlorist.Areas.Account.Models;
using SoftKiwiFlorist.Helpers;

namespace SoftKiwiFlorist.Areas.Account.Validators;

public class RegistraterModelValidator : AbstractValidator<RegisterModel>
{
    public RegistraterModelValidator()
    {
        RuleLevelCascadeMode = CascadeMode.Stop;
        
        RuleFor(e => e.UserName)
            .NotEmpty().WithMessage("UserName is required")
            .MaximumLength(256).WithMessage("UserName can't exceed 256 characters")
            .Must(ValidationHelper.IsValidUserName).WithMessage("Invalid user name");
        RuleFor(e => e.Email)
            .NotEmpty().WithMessage("Email is required")
            .MaximumLength(256).WithMessage("Email can't exceed 256 characters")
            .Must(ValidationHelper.IsValidEmailAddress).WithMessage("Invalid email address");
        RuleFor(e => e.Password)
            .NotEmpty().WithMessage("Password is required")
            .MinimumLength(8).WithMessage("Password can't be shorter than 8 characters")
            .MaximumLength(256).WithMessage("Password can't exceed 256 characters")
            .Must(ValidationHelper.IsValidPassword).WithMessage("Invalid password");
    }
}

public class LoginModelValidator : AbstractValidator<LoginModel>
{
    public LoginModelValidator()
    {
        RuleLevelCascadeMode = CascadeMode.Stop;
        
        RuleFor(e => e.UserNameOrEmail)
            .NotEmpty().WithMessage("UserNameOrEmail is required");
        RuleFor(e => e.Password)
            .NotEmpty().WithMessage("Password is required");
    }
}

public class ForgotPasswordModelValidator : AbstractValidator<ForgotPasswordModel>
{
    public ForgotPasswordModelValidator()
    {
        RuleLevelCascadeMode = CascadeMode.Stop;
        
        RuleFor(e => e.Email)
            .NotEmpty().WithMessage("Email is required");
    }
}

public class ResetPasswordModelValidator : AbstractValidator<ResetPasswordModel>
{
    public ResetPasswordModelValidator()
    {
        RuleLevelCascadeMode = CascadeMode.Stop;
        
        RuleFor(e => e.Email)
            .NotEmpty().WithMessage("Email is required");
        RuleFor(e => e.Code)
            .NotEmpty().WithMessage("Code is required");
        RuleFor(e => e.Password)
            .NotEmpty().WithMessage("Password is required")
            .MinimumLength(8).WithMessage("Password can't be shorter than 8 characters")
            .MaximumLength(256).WithMessage("Password can't exceed 256 characters")
            .Must(ValidationHelper.IsValidPassword).WithMessage("Invalid password");
    }
}