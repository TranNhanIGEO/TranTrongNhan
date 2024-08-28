using FluentValidation;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Models.DTOs;

namespace SoftKiwiFlorist.Areas.Customer.Validators;

public class CustomerFeedbackDTOValidator : AbstractValidator<FeedbackReqDTO>
{
    public CustomerFeedbackDTOValidator()
    {
        RuleLevelCascadeMode = CascadeMode.Stop;
        
        RuleFor(e => e.UserId)
            .NotEmpty().WithMessage("UserId is required");
        RuleFor(e => e.ProductId)
            .NotEmpty().WithMessage("ProductId is required");
        RuleFor(e => e.Vote)
            .NotEmpty().WithMessage("Vote is required")
            .GreaterThanOrEqualTo(1).WithMessage("Vote must be greater than 1 star")
            .LessThanOrEqualTo(5).WithMessage("Vote must be less than or equal to 5");
        RuleFor(e => e.FullName)
            .NotEmpty().WithMessage("FullName is required")
            .MaximumLength(256).WithMessage("FullName can't exceed 256 characters");
        RuleFor(e => e.Email)
            .NotEmpty().WithMessage("Email is required")
            .MaximumLength(256).WithMessage("Email can't exceed 256 characters")
            .Must(ValidationHelper.IsValidEmailAddress).WithMessage("Invalid email address");
        RuleFor(e => e.Comment)
            .MaximumLength(150).WithMessage("Comment can't exceed 150 characters");
        RuleFor(e => e.Image)
            .MaximumLength(256).When(e => e.Image != null).WithMessage("Image can't exceed 256 characters");
        RuleFor(e => e.File)
            .Must(ValidationHelper.IsSupportedFile).When(e => e.File != null).WithMessage("Unsupported file format")
            .Must(ValidationHelper.IsFileSizeValid).When(e => e.File != null).WithMessage("File size exceeds 10 MB");
    }
}