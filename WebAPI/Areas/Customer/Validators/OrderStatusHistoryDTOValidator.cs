using FluentValidation;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Models.DTOs;

namespace SoftKiwiFlorist.Areas.Customer.Validators;

public class CustomerOrderStatusHistoryDTOValidator : AbstractValidator<OrderStatusHistoryReqDTO>
{
    public CustomerOrderStatusHistoryDTOValidator()
    {
        RuleLevelCascadeMode = CascadeMode.Stop;
        
        RuleFor(e => e.OrderId)
            .NotEmpty().WithMessage("OrderId is required");
        RuleFor(e => e.OrderStatusId)
            .NotEmpty().WithMessage("ProductId is required");
    }
}