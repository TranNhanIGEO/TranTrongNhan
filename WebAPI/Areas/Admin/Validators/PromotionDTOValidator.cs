using FluentValidation;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Models.DTOs;

namespace SoftKiwiFlorist.Areas.Admin.Validators;

public class AdminPromotionDTOValidator : AbstractValidator<PromotionReqDTO>
{
    public AdminPromotionDTOValidator()
    {
        RuleLevelCascadeMode = CascadeMode.Stop;
        
        RuleFor(e => e.Name)
            .NotEmpty().WithMessage("Name is required")
            .MaximumLength(25).WithMessage("Name can't exceed 25 characters");
        RuleFor(e => e.Description)
            .NotEmpty().WithMessage("Description is required")
            .MaximumLength(150).WithMessage("Description can't exceed 150 characters");
        RuleFor(e => e.Discount)
            .Must(ValidationHelper.IsValidDecimal).When(e => e.Discount != null).WithMessage("Discount must be a valid decimal number in the format 100,000.00")
            .GreaterThanOrEqualTo(0).When(e => e.Discount != null).WithMessage("Discount must be greater than or equal to 0")
            .LessThanOrEqualTo(1000000).When(e => e.Discount != null).WithMessage("Discount must be less than or equal to 1,000,000");
        RuleFor(e => e.DiscountPercentage)
            .Must(ValidationHelper.IsValidDecimal).When(e => e.DiscountPercentage != null).WithMessage("DiscountPercentage must be an integer")
            .GreaterThanOrEqualTo(0).When(e => e.DiscountPercentage != null).WithMessage("DiscountPercentage can't less than 0%")
            .LessThanOrEqualTo(50).When(e => e.DiscountPercentage != null).WithMessage("DiscountPercentage can't exceed 50%");
        RuleFor(e => e.StartAt)
            .NotEmpty().WithMessage("StartAt is required")
            .GreaterThanOrEqualTo(DateHelper.GetCurrentDateTime()).WithMessage("StartAt must be in the future or present.")
            .LessThanOrEqualTo(x => x.EndAt).WithMessage("StartAt must be before or the same as EndAt.");
        RuleFor(e => e.EndAt)
            .NotEmpty().WithMessage("EndAt is required")
            .GreaterThan(DateHelper.GetCurrentDateTime()).WithMessage("EndAt must be in the future.");
    }
}