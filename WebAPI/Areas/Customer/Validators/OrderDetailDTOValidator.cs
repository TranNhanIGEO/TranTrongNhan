using FluentValidation;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Models.DTOs;

namespace SoftKiwiFlorist.Areas.Customer.Validators;

public class CustomerOrderDetailDTOValidator : AbstractValidator<OrderDetailReqDTO>
{
    public CustomerOrderDetailDTOValidator()
    {
        RuleLevelCascadeMode = CascadeMode.Stop;
        
        RuleFor(e => e.ProductId)
            .NotEmpty().WithMessage("ProductId is required");
        RuleFor(e => e.Quantity)
            .NotEmpty().WithMessage("Quantity is required");
        RuleFor(e => e.Discount)
            .Must(ValidationHelper.IsValidDecimal).When(e => e.Discount != null).WithMessage("Discount must be a valid decimal number in the format 100,000.00")
            .GreaterThanOrEqualTo(0).When(e => e.Discount != null).WithMessage("Discount must be greater than or equal to 0")
            .LessThanOrEqualTo(1000000).When(e => e.Discount != null).WithMessage("Discount must be less than or equal to 1,000,000");
        RuleFor(e => e.DiscountPercentage)
            .Must(ValidationHelper.IsValidDecimal).When(e => e.DiscountPercentage != null).WithMessage("DiscountPercentage must be a valid decimal number in the format 10.00")
            .GreaterThanOrEqualTo(0).When(e => e.DiscountPercentage != null).WithMessage("DiscountPercentage can't less than 0%")
            .LessThanOrEqualTo(50).When(e => e.DiscountPercentage != null).WithMessage("DiscountPercentage can't exceed 50%");
        RuleFor(e => e.UnitPrice)
            .NotEmpty().WithMessage("UnitPrice is required")
            .Must(ValidationHelper.IsValidDecimal).WithMessage("UnitPrice must be a valid decimal number in the format 100,000.00")
            .GreaterThan(0).WithMessage("UnitPrice must be greater than 0");
        RuleFor(e => e.TotalPrice)
            .NotEmpty().WithMessage("TotalPrice is required")
            .Must(ValidationHelper.IsValidDecimal).WithMessage("TotalPrice must be a valid decimal number in the format 100,000.00")
            .GreaterThan(0).WithMessage("TotalPrice must be greater than 0");
    }
}