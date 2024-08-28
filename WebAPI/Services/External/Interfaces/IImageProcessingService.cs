using SoftKiwiFlorist.Models.Services;

namespace SoftKiwiFlorist.Services.External.Interfaces;

public interface IImageProcessingService
{
    Task<string> ResizeAndSaveImageAsync(ImageProcessingModel model);
}