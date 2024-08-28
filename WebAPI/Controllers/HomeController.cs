using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Services.Interfaces;
using SoftKiwiFlorist.Models.Response;
using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Query;

namespace SoftKiwiFlorist.Controllers;
[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]

public class HomeController : ControllerBase
{
    private readonly IBannerService _bannerService;
    private readonly ICategoryService _categoryService;
    private readonly IProductService _productService;
    private readonly IFeedbackService _feedbackService;
    private readonly INewsService _newsService;
    private readonly ILogger<HomeController> _logger;

    public HomeController(
        IBannerService bannerService, 
        ICategoryService categoryService,
        IProductService productService,
        IFeedbackService feedbackService,
        INewsService newsService,
        ILogger<HomeController> logger)
    {
        _bannerService = bannerService;
        _categoryService = categoryService;
        _productService = productService;
        _feedbackService = feedbackService;
        _newsService = newsService;
        _logger = logger;
    }

    [HttpGet("Banner"), MapToApiVersion("1.0")]
    public async Task<IActionResult> GetBanners([FromQuery]QueryModel queryParams)
    {
        try
        {
            var bannerRecords = await _bannerService.FetchEntitiesAsync(queryParams);
            
            return ResponseHelper.GetListSuccessfullyResponse(new GetListSuccessfullyResponseModel<BannerResDTO>()
            {
                Records = bannerRecords,
                Message = "Retrieved banners successfully"
            });
        }
        catch (BadRequestException err)
        {
            _logger.LogError(err, "BadRequestException: {Message}", err.Message);
            return ResponseHelper.BadRequestErrorResponse(new BadRequestErrorResponseModel()
            {
                Message = err.Message
            });
        }
        catch (Exception err)
        {
            _logger.LogError(err, "Exception: {Message}", err.Message);
            return ResponseHelper.InternalServerErrorResponse(new InternalServerErrorResponseModel()
            {
                Message = err.Message
            });
        }
    }
    
    [HttpGet("Category"), MapToApiVersion("1.0")]
    public async Task<IActionResult> GetCategories([FromQuery]QueryModel queryParams)
    {
        try
        {
            var categoryRecords = await _categoryService.FetchEntitiesAsync(queryParams);
            
            return ResponseHelper.GetListSuccessfullyResponse(new GetListSuccessfullyResponseModel<CategoryResDTO>()
            {
                Records = categoryRecords,
                Message = "Retrieved categories successfully"
            });
        }
        catch (BadRequestException err)
        {
            _logger.LogError(err, "BadRequestException: {Message}", err.Message);
            return ResponseHelper.BadRequestErrorResponse(new BadRequestErrorResponseModel()
            {
                Message = err.Message
            });
        }
        catch (Exception err)
        {
            _logger.LogError(err, "Exception: {Message}", err.Message);
            return ResponseHelper.InternalServerErrorResponse(new InternalServerErrorResponseModel()
            {
                Message = err.Message
            });
        }
    }

    [HttpGet("Product"), MapToApiVersion("1.0")]
    public async Task<IActionResult> GetProducts([FromQuery]ProductQueryModel queryParams)
    {
        try
        {
            var productRecords = await _productService.FetchEntitiesAsync(queryParams);
            
            return ResponseHelper.GetListSuccessfullyResponse(new GetListSuccessfullyResponseModel<ProductResDTO>()
            {
                Records = productRecords,
                Message = "Retrieved products successfully"
            });
        }
        catch (BadRequestException err)
        {
            _logger.LogError(err, "BadRequestException: {Message}", err.Message);
            return ResponseHelper.BadRequestErrorResponse(new BadRequestErrorResponseModel()
            {
                Message = err.Message
            });
        }
        catch (Exception err)
        {
            _logger.LogError(err, "Exception: {Message}", err.Message);
            return ResponseHelper.InternalServerErrorResponse(new InternalServerErrorResponseModel()
            {
                Message = err.Message
            });
        }
    }

    [HttpGet("Feedback"), MapToApiVersion("1.0")]
    public async Task<IActionResult> GetFeedbacks([FromQuery]FeedbackQueryModel queryParams)
    {
        try
        {
            var feedbackRecords = await _feedbackService.FetchEntitiesAsync(queryParams);
            
            return ResponseHelper.GetListSuccessfullyResponse(new GetListSuccessfullyResponseModel<FeedbackResDTO>()
            {
                Records = feedbackRecords,
                Message = "Retrieved feedbacks successfully"
            });
        }
        catch (BadRequestException err)
        {
            _logger.LogError(err, "BadRequestException: {Message}", err.Message);
            return ResponseHelper.BadRequestErrorResponse(new BadRequestErrorResponseModel()
            {
                Message = err.Message
            });
        }
        catch (Exception err)
        {
            _logger.LogError(err, "Exception: {Message}", err.Message);
            return ResponseHelper.InternalServerErrorResponse(new InternalServerErrorResponseModel()
            {
                Message = err.Message
            });
        }
    }

    [HttpGet("News"), MapToApiVersion("1.0")]
    public async Task<IActionResult> GetNews([FromQuery]QueryModel queryParams)
    {
        try
        {
            var newsRecords = await _newsService.FetchEntitiesAsync(queryParams);
            
            return ResponseHelper.GetListSuccessfullyResponse(new GetListSuccessfullyResponseModel<NewsResDTO>()
            {
                Records = newsRecords,
                Message = "Retrieved news successfully"
            });
        }
        catch (BadRequestException err)
        {
            _logger.LogError(err, "BadRequestException: {Message}", err.Message);
            return ResponseHelper.BadRequestErrorResponse(new BadRequestErrorResponseModel()
            {
                Message = err.Message
            });
        }
        catch (Exception err)
        {
            _logger.LogError(err, "Exception: {Message}", err.Message);
            return ResponseHelper.InternalServerErrorResponse(new InternalServerErrorResponseModel()
            {
                Message = err.Message
            });
        }
    }
}