using FluentValidation;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Models.DTOs;

namespace SoftKiwiFlorist.Areas.Admin.Validators;

public class AdminNewsDTOValidator : AbstractValidator<NewsReqDTO>
{
    public AdminNewsDTOValidator()
    {
        RuleLevelCascadeMode = CascadeMode.Stop;
        
        RuleFor(e => e.Title)
            .NotEmpty().WithMessage("Title is required")
            .MaximumLength(100).WithMessage("Title can't exceed 100 characters");
        RuleFor(e => e.Summary)
            .NotEmpty().WithMessage("Summary is required")
            .MaximumLength(256).WithMessage("Summary can't exceed 256 characters");
        RuleFor(e => e.Content)
            .NotEmpty().WithMessage("Content is required")
            .MinimumLength(100).WithMessage("Content can't shorter than 100 characters");
        RuleFor(e => e.Image)
            .NotEmpty().WithMessage("Image is required")
            .MaximumLength(256).WithMessage("Image can't exceed 256 characters");
        RuleFor(e => e.File)
            .Must(ValidationHelper.IsSupportedFile).When(e => e.File != null).WithMessage("Unsupported file format")
            .Must(ValidationHelper.IsFileSizeValid).When(e => e.File != null).WithMessage("File size exceeds 10 MB");
    }
}