using FluentValidation;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Models.DTOs;

namespace SoftKiwiFlorist.Areas.Admin.Validators;

public class AdminBannerDTOValidator : AbstractValidator<BannerReqDTO>
{
    public AdminBannerDTOValidator()
    {
        RuleLevelCascadeMode = CascadeMode.Stop;

        RuleFor(e => e.Image)
            .NotEmpty().WithMessage("Image is required")
            .MaximumLength(256).WithMessage("Image can't exceed 256 characters");
        RuleFor(e => e.File)
            .Must(ValidationHelper.IsSupportedFile).When(e => e.File != null).WithMessage("Unsupported file format")
            .Must(ValidationHelper.IsFileSizeValid).When(e => e.File != null).WithMessage("File size exceeds 10 MB");
    }
}