using AutoMapper;
using SoftKiwiFlorist.Repositories.Interfaces;
using SoftKiwiFlorist.Services.Interfaces;
using SoftKiwiFlorist.Models.Query;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;
using SoftKiwiFlorist.Services.Base;

namespace SoftKiwiFlorist.Services;

public class PaymentTransactionService : BaseReaderService<PaymentTransaction, PaymentTransactionResDTO, QueryModel>, IPaymentTransactionService
{
    private readonly IPaymentTransactionRepository _paymentTransactionRepository;

    public PaymentTransactionService(IMapper mapper, IPaymentTransactionRepository paymentTransactionRepository) : base(mapper, paymentTransactionRepository)
    {
        _paymentTransactionRepository = paymentTransactionRepository;
    }
}