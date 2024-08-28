using FluentValidation;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Models.DTOs;

namespace SoftKiwiFlorist.Areas.Account.Validators;

public class ProfileDTOValidator : AbstractValidator<ProfileReqDTO>
{
    public ProfileDTOValidator()
    {
        RuleLevelCascadeMode = CascadeMode.Stop;
        
        RuleFor(e => e.PhoneNumber)
            .MaximumLength(12).When(e => e.PhoneNumber != null).WithMessage("PhoneNumber can't exceed 12 characters")
            .Must(ValidationHelper.IsValidPhoneNumber).When(e => e.PhoneNumber != null).WithMessage("PhoneNumber is not valid");
        RuleFor(e => e.FullName)
            .MaximumLength(256).When(e => e.FullName != null).WithMessage("FullName can't exceed 256 characters");
        RuleFor(e => e.HomeAddress)
            .MaximumLength(256).When(e => e.HomeAddress != null).WithMessage("HomeAddress can't exceed 256 characters");
        RuleFor(e => e.Avatar)
            .MaximumLength(256).When(e => e.Avatar != null).WithMessage("Avatar can't exceed 256 characters");
        RuleFor(e => e.File)
            .Must(ValidationHelper.IsSupportedFile).When(e => e.File != null).WithMessage("Unsupported file format")
            .Must(ValidationHelper.IsFileSizeValid).When(e => e.File != null).WithMessage("File size exceeds 10 MB");
    }
}

public class EmailChangingModelValidator : AbstractValidator<EmailChangingModel>
{
    public EmailChangingModelValidator()
    {
        RuleLevelCascadeMode = CascadeMode.Stop;
        
        RuleFor(e => e.Email)
            .NotEmpty().WithMessage("Email is required")
            .MaximumLength(256).WithMessage("Email can't exceed 256 characters")
            .Must(ValidationHelper.IsValidEmailAddress).WithMessage("Invalid email address");
    }
}

public class PasswordChangingModelValidator : AbstractValidator<PasswordChangingModel>
{
    public PasswordChangingModelValidator()
    {
        RuleLevelCascadeMode = CascadeMode.Stop;
        
        RuleFor(e => e.CurrentPassword)
            .NotEmpty().WithMessage("Current password is required");
        RuleFor(e => e.NewPassword)
            .NotEmpty().WithMessage("New password is required")
            .MinimumLength(8).WithMessage("New password can't be shorter than 8 characters")
            .MaximumLength(256).WithMessage("New password can't exceed 256 characters")
            .Must(ValidationHelper.IsValidPassword).WithMessage("Invalid new password");
    }
}