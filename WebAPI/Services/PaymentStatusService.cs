using AutoMapper;
using SoftKiwiFlorist.Services.Interfaces;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;
using SoftKiwiFlorist.Repositories.Interfaces;
using SoftKiwiFlorist.Services.Base;
using SoftKiwiFlorist.Models.Query;

namespace SoftKiwiFlorist.Services;

public class PaymentStatusService : BaseReaderService<PaymentStatus, PaymentStatusDTO, QueryModel>, IPaymentStatusService
{
    private readonly IPaymentStatusRepository _paymentStatusRepository;

    public PaymentStatusService(IMapper mapper, IPaymentStatusRepository paymentStatusRepository) : base(mapper, paymentStatusRepository)
    {
        _paymentStatusRepository = paymentStatusRepository;
    }
}