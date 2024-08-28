using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Repositories.Interfaces;
using SoftKiwiFlorist.Areas.Admin.Services.Interfaces;
using SoftKiwiFlorist.Models;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;
using SoftKiwiFlorist.Models.Services;
using SoftKiwiFlorist.Services.External.Interfaces;
using SoftKiwiFlorist.Repositories.Base.Interfaces;
using SoftKiwiFlorist.Models.Enums;

namespace SoftKiwiFlorist.Areas.Admin.Services;

public class AdminProductService : IAdminProductService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IProductRepository _productRepository;
    private readonly IImageProcessingService _imageProcessingService;
    private readonly IFileStorageService _fileStorageService;
    private readonly IValidator<ProductReqDTO> _validatorReqDTO;
    private readonly Dictionary<string, Func<Product, object>> _normalizedTermProperties;

    public AdminProductService(
        IMapper mapper, 
        IUnitOfWork unitOfWork, 
        IProductRepository productRepository, 
        IImageProcessingService imageProcessingService, 
        IFileStorageService fileStorageService, 
        IValidator<ProductReqDTO> validatorReqDTO)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
        _productRepository = productRepository;
        _imageProcessingService = imageProcessingService;
        _fileStorageService = fileStorageService;
        _validatorReqDTO = validatorReqDTO;
        _normalizedTermProperties = new Dictionary<string, Func<Product, object>>()
        {
            { nameof(Product.Name), c => c.Name },
            { nameof(Product.Description), c => c.Description },
            { nameof(Product.Price), c => c.Price },
            // { nameof(Product.Sale), c => c.Sale! },
            { nameof(Product.Sold), c => c.Sold! },
            { nameof(Product.Viewed), c => c.Viewed! },
            { nameof(Product.Category), c => c.Category?.Name! },
            { nameof(Product.CreatedAt), c => c.CreatedAt.ToString("O") },
            { nameof(Product.UpdatedAt), c => c.UpdatedAt.ToString("O") },
        };
    }

    private async Task<string> ResizeAndSaveImageAsync(IFormFile formFile, string fileName)
    {
        string folderPath = Path.Combine("images", "products");
        string fileKey = string.Concat(fileName, ".", nameof(ImageFormat.Jpeg).ToLower());
        
        ImageProcessingModel processingModel = new ImageProcessingModel()
        {
            FileName = fileKey,
            FolderPath = folderPath,
            FormFile = formFile,
            Width = 500,
            Height = 500,
            Format = ImageFormat.Jpeg,
        };

        string imageUrl = await _imageProcessingService.ResizeAndSaveImageAsync(processingModel);
        return imageUrl;
    }

    public async Task<ProductResDTO> CreateEntityAsync(ProductReqDTO model)
    {
        if (model == null)
        {
            throw new BadRequestException("Product request DTO cannot be null");
        }

        ValidationResult validationResult = await _validatorReqDTO.ValidateAsync(model);

        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }
        
        Product newProduct = _mapper.Map<Product>(model);
        EntityHelper.SetIdValue(newProduct);
        EntityHelper.SetDateTimeValue(newProduct, new[] { nameof(Product.CreatedAt), nameof(Product.UpdatedAt) });
        EntityHelper.SetNormalizedTermValue(newProduct, _normalizedTermProperties);

        if (!string.IsNullOrEmpty(model.Image) && model.File != null)
        {
            string fileName = newProduct.Id.ToString();
            string imageUrl = await ResizeAndSaveImageAsync(model.File, fileName);
            newProduct.Image = imageUrl;
        }

        await _productRepository.AddEntityAsync(newProduct);
        await _unitOfWork.SaveChangesAsync();
        
        return _mapper.Map<ProductResDTO>(newProduct);
    }

    public async Task<ProductResDTO> UpdateEntityAsync(Guid id, ProductReqDTO model)
    {
        if (model == null)
        {
            throw new BadRequestException("Product request DTO cannot be null");
        }

        if (id == Guid.Empty)
        {
            throw new BadRequestException("ID cannot be empty");
        }

        Product? productRecord = await _productRepository.GetEntityByIdAsync(id);

        if (productRecord == null)
        {
            throw new NotFoundException("Product not found");
        }

        ValidationResult validationResult = await _validatorReqDTO.ValidateAsync(model);

        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }

        if (model.Image != productRecord.Image && model.File != null)
        {
            string fileName = productRecord.Id.ToString();
            string imageUrl = await ResizeAndSaveImageAsync(model.File, fileName);
            model.Image = imageUrl;
        }
        
        _mapper.Map(model, productRecord);
        EntityHelper.SetDateTimeValue(productRecord, nameof(Product.UpdatedAt));
        EntityHelper.SetNormalizedTermValue(productRecord, _normalizedTermProperties);

        await _productRepository.UpdateEntityAsync(productRecord);
        await _unitOfWork.SaveChangesAsync();
        
        return _mapper.Map<ProductResDTO>(productRecord);
    }

    public async Task<Guid> DeleteEntityAsync(Guid id)
    {
        if (id == Guid.Empty)
        {
            throw new BadRequestException("ID cannot be empty");
        }
        
        Product? productRecord = await _productRepository.GetEntityByIdAsync(id);

        if (productRecord == null)
        {
            throw new NotFoundException("Product not found");
        }

        if (string.IsNullOrWhiteSpace(productRecord.Image))
        {
            throw new NotFoundException("Product image url not found");
        }

        await _fileStorageService.DeleteFileAsync(productRecord.Image);
        await _productRepository.RemoveEntityAsync(productRecord);
        await _unitOfWork.SaveChangesAsync();
        
        return productRecord.Id;
    }
}