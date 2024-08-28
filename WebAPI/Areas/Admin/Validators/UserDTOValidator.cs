using FluentValidation;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Models.DTOs;

namespace SoftKiwiFlorist.Areas.Admin.Validators;

public class ProfileChangingDTOValidator : AbstractValidator<ProfileReqDTO>
{
    public ProfileChangingDTOValidator()
    {
        RuleLevelCascadeMode = CascadeMode.Stop;
        
        RuleFor(e => e.PhoneNumber)
            .NotEmpty().When(e => e.PhoneNumber != null).WithMessage("PhoneNumber is required")
            .MaximumLength(256).When(e => e.PhoneNumber != null).WithMessage("PhoneNumber can't exceed 256 characters")
            .Must(ValidationHelper.IsValidPhoneNumber).When(e => e.PhoneNumber != null).WithMessage("Invalid phone number");
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

public class PasswordChangingDTOValidator : AbstractValidator<PasswordChangingModel>
{
    public PasswordChangingDTOValidator()
    {
        RuleLevelCascadeMode = CascadeMode.Stop;
        
        RuleFor(e => e.CurrentPassword)
            .NotEmpty().WithMessage("Old password is required");
        RuleFor(e => e.NewPassword)
            .NotEmpty().WithMessage("New password is required")
            .MinimumLength(64).WithMessage("New password can't exceed 64 characters")
            .MaximumLength(256).WithMessage("New password can't exceed 256 characters")
            .Must(ValidationHelper.IsValidPassword).WithMessage("Invalid new password");
    }
}

public class EmailChangingDTOValidator : AbstractValidator<EmailChangingModel>
{
    public EmailChangingDTOValidator()
    {
        RuleLevelCascadeMode = CascadeMode.Stop;
        
        RuleFor(e => e.Email)
            .NotEmpty().When(e => e.Email != null).WithMessage("Email is required")
            .MaximumLength(256).When(e => e.Email != null).WithMessage("Email can't exceed 256 characters")
            .Must(ValidationHelper.IsValidEmailAddress).When(e => e.Email != null).WithMessage("Invalid email address");
    }
}