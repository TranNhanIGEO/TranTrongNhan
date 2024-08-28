using FluentValidation;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Models.DTOs;

namespace SoftKiwiFlorist.Areas.Admin.Validators;

public class AdminProductDTOValidator : AbstractValidator<ProductReqDTO>
{
    public AdminProductDTOValidator()
    {
        RuleLevelCascadeMode = CascadeMode.Stop;
        
        RuleFor(e => e.Name)
            .NotEmpty().WithMessage("Name is required")
            .MaximumLength(25).WithMessage("Name can't exceed 25 characters");
        RuleFor(e => e.Description)
            .NotEmpty().WithMessage("Description is required")
            .MaximumLength(256).WithMessage("Description can't exceed 256 characters");
        RuleFor(e => e.Image)
            .NotEmpty().WithMessage("Image is required")
            .MaximumLength(256).WithMessage("Image can't exceed 256 characters");
        RuleFor(e => e.Price)
            .NotEmpty().WithMessage("Price is required")
            .Must(ValidationHelper.IsValidDecimal).WithMessage("Price must be a valid decimal number in the format 100,000.00")
            .GreaterThan(0).WithMessage("Price must be greater than 0")
            .LessThanOrEqualTo(10000000).WithMessage("Price must be less than or equal to 10,000,000");
        RuleFor(e => e.File)
            .Must(ValidationHelper.IsSupportedFile).When(e => e.File != null).WithMessage("Unsupported file format")
            .Must(ValidationHelper.IsFileSizeValid).When(e => e.File != null).WithMessage("File size exceeds 10 MB");
    }
}