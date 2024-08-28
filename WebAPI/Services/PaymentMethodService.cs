using AutoMapper;
using SoftKiwiFlorist.Services.Interfaces;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;
using SoftKiwiFlorist.Repositories.Interfaces;
using SoftKiwiFlorist.Services.Base;
using SoftKiwiFlorist.Models.Query;

namespace SoftKiwiFlorist.Services;

public class PaymentMethodService : BaseReaderService<PaymentMethod, PaymentMethodDTO, QueryModel>, IPaymentMethodService
{
    private readonly IPaymentMethodRepository _paymentMethodRepository;

    public PaymentMethodService(IMapper mapper, IPaymentMethodRepository paymentMethodRepository) : base(mapper, paymentMethodRepository)
    {
        _paymentMethodRepository = paymentMethodRepository;
    }
}