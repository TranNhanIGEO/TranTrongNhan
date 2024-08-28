using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;
using SoftKiwiFlorist.Areas.Customer.Services.Interfaces;
using SoftKiwiFlorist.Repositories.Interfaces;
using SoftKiwiFlorist.Repositories.Base.Interfaces;
using SoftKiwiFlorist.Services.Interfaces;
using SoftKiwiFlorist.Models.Enums;

namespace SoftKiwiFlorist.Areas.Customer.Services;

public class CustomerPaymentTransactionService : ICustomerPaymentTransactionService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IPaymentTransactionRepository _paymentTransactionRepository;
    private readonly IPaymentStatusService _paymentStatusService;
    private readonly IValidator<PaymentTransactionReqDTO> _validatorReqDTO;

    public CustomerPaymentTransactionService(
        IMapper mapper, 
        IUnitOfWork unitOfWork, 
        IPaymentTransactionRepository paymentTransactionRepository, 
        IPaymentStatusService paymentStatusService,
        IValidator<PaymentTransactionReqDTO> validatorReqDTO)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
        _paymentTransactionRepository = paymentTransactionRepository;
        _paymentStatusService = paymentStatusService;
        _validatorReqDTO = validatorReqDTO;
    }

    public async Task<PaymentTransactionResDTO> CreateEntityAsync(PaymentTransactionReqDTO model)
    {
        if (model == null)
        {
            throw new BadRequestException("Payment transaction DTO cannot be null");
        }

        ValidationResult validationResult = await _validatorReqDTO.ValidateAsync(model);

        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }
        
        PaymentTransaction newTransaction = _mapper.Map<PaymentTransaction>(model);
        
        PaymentStatusDTO paymentStatusDTO = await _paymentStatusService.FecthEntityByConditionAsync(x => x.Status == nameof(PaymentStatusTypes.Pending));
        model.PaymentStatusId = paymentStatusDTO.Id;

        await _paymentTransactionRepository.AddEntityAsync(newTransaction);
        await _unitOfWork.SaveChangesAsync();

        return _mapper.Map<PaymentTransactionResDTO>(newTransaction);
    }

    public async Task<PaymentTransactionResDTO> UpdateEntityAsync(Guid id, PaymentTransactionReqDTO model)
    {
        if (model == null)
        {
            throw new BadRequestException("Payment transaction DTO cannot be null");
        }

        if (id == Guid.Empty)
        {
            throw new BadRequestException("ID cannot be empty");
        }

        PaymentTransaction? transactionRecord = await _paymentTransactionRepository.GetEntityByIdAsync(id);

        if (transactionRecord == null)
        {
            throw new NotFoundException("Payment transaction not found");
        }

        ValidationResult validationResult = await _validatorReqDTO.ValidateAsync(model);

        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }

        _mapper.Map(model, transactionRecord);

        await _paymentTransactionRepository.UpdateEntityAsync(transactionRecord);
        await _unitOfWork.SaveChangesAsync();

        return _mapper.Map<PaymentTransactionResDTO>(transactionRecord);
    }
}