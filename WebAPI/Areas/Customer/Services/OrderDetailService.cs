using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;
using SoftKiwiFlorist.Areas.Customer.Services.Interfaces;
using SoftKiwiFlorist.Repositories.Interfaces;

namespace SoftKiwiFlorist.Areas.Customer.Services;

public class CustomerOrderDetailService : ICustomerOrderDetailService
{
    private readonly IMapper _mapper;
    private readonly IOrderDetailRepository _orderDetailRepository;
    private readonly IValidator<OrderDetailReqDTO> _validatorReqDTO;

    public CustomerOrderDetailService(
        IMapper mapper, 
        IOrderDetailRepository orderDetailRepository, 
        IValidator<OrderDetailReqDTO> validatorReqDTO)
    {
        _mapper = mapper;
        _orderDetailRepository = orderDetailRepository;
        _validatorReqDTO = validatorReqDTO;
    }

    public async Task<IList<OrderDetailResDTO>> CreateEntityListAsync(IList<OrderDetailReqDTO> model)
    {
        if (model == null || !model.Any())
        {
            throw new BadRequestException("OrderDetail request DTO cannot be null");
        }

        foreach (var orderDetailReqDTO in model)
        {
            ValidationResult validationResult = await _validatorReqDTO.ValidateAsync(orderDetailReqDTO);
            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors);
            }
        }
        
        IList<OrderDetail> newOrderDetails = _mapper.Map<IList<OrderDetail>>(model);

        await _orderDetailRepository.AddEntityListAsync(newOrderDetails);

        return _mapper.Map<IList<OrderDetailResDTO>>(newOrderDetails);
    }
}