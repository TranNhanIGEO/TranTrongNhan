using FluentValidation;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Models.DTOs;

namespace SoftKiwiFlorist.Areas.Admin.Validators;

public class AdminOrderStatusHistoryDTOValidator : AbstractValidator<OrderStatusHistoryReqDTO>
{
    public AdminOrderStatusHistoryDTOValidator()
    {
        RuleLevelCascadeMode = CascadeMode.Stop;
        
        RuleFor(e => e.OrderId)
            .NotEmpty().WithMessage("OrderId is required");
        RuleFor(e => e.OrderStatusId)
            .NotEmpty().WithMessage("ProductId is required");
    }
}