using FluentValidation;
using SoftKiwiFlorist.Models.DTOs;

namespace SoftKiwiFlorist.Areas.Customer.Validators;

public class CustomerCartItemDTOValidator : AbstractValidator<CartItemReqDTO>
{
    public CustomerCartItemDTOValidator()
    {
        RuleLevelCascadeMode = CascadeMode.Stop;

        RuleFor(e => e.SessionId)
            .NotEmpty().WithMessage("SessionId is required");
        RuleFor(e => e.ProductId)
            .NotEmpty().WithMessage("ProductId is required");
        RuleFor(e => e.Quantity)
            .NotEmpty().WithMessage("Quantity is required");
    }
}