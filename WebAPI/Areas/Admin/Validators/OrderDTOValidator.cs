using FluentValidation;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Models.DTOs;

namespace SoftKiwiFlorist.Areas.Admin.Validators;

public class AdminOrderDTOValidator : AbstractValidator<OrderReqDTO>
{
    public AdminOrderDTOValidator()
    {
        RuleLevelCascadeMode = CascadeMode.Stop;
                
        RuleFor(e => e.SessionId)
            .NotEmpty().WithMessage("SessionId is required");
        RuleFor(e => e.ReceiverName)
            .NotEmpty().WithMessage("ReceiverName is required")
            .MaximumLength(50).WithMessage("ReceiverName can't exceed 50 characters");
        RuleFor(e => e.ReceiverAddress)
            .NotEmpty().WithMessage("ReceiverAddress is required")
            .MaximumLength(256).WithMessage("ReceiverAddress can't exceed 256 characters");
        RuleFor(e => e.PhoneNumber)
            .NotEmpty().WithMessage("PhoneNumber is required")
            .MaximumLength(12).WithMessage("PhoneNumber can't exceed 12 characters")
            .Must(ValidationHelper.IsValidPhoneNumber).WithMessage("PhoneNumber is not valid");
        RuleFor(e => e.TotalAmount)
            .NotEmpty().WithMessage("TotalAmount is required")
            .Must(ValidationHelper.IsValidDecimal).WithMessage("TotalAmount must be a valid decimal number in the format 100,000.00")
            .GreaterThan(0).WithMessage("TotalAmount must be greater than 0")
            .LessThanOrEqualTo(100000000).WithMessage("Price must be less than or equal to 100,000,000");
        RuleFor(e => e.Note)
            .MaximumLength(150).When(e => e.Note != null).WithMessage("Note can't exceed 150 characters");
        RuleFor(e => e.OrderDetails)
            .Must(details => details != null && details.Any()).WithMessage("OrderDetails must contain at least one item.");
    }
}