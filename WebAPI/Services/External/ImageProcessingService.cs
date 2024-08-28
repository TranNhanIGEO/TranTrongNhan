using SoftKiwiFlorist.Models.Services;
using SoftKiwiFlorist.Services.External.Interfaces;

namespace SoftKiwiFlorist.Services.External;

public class ImageProcessingService : IImageProcessingService
{
    private readonly IFileStorageService _fileStorageService;
    
    public ImageProcessingService(IFileStorageService fileStorageService)
    {
        _fileStorageService = fileStorageService;
    }

    public async Task<string> ResizeAndSaveImageAsync(ImageProcessingModel model)
    {
        using Stream fileStream = model.FormFile.OpenReadStream();
        ImageResizingModel resizingModel = new ImageResizingModel()
        {
            FileStream = fileStream,
            Width = model.Width,
            Height = model.Height,
            Format = model.Format,
        };

        using Stream imageStream = await _fileStorageService.ResizeImageAsync(resizingModel);
        ImageSavingModel savingModel = new ImageSavingModel()
        {
            FileName = model.FileName,
            FolderPath = model.FolderPath,
            FileStream = imageStream,
        };

        await _fileStorageService.SaveFileAsync(savingModel);
        return Path.Combine(model.FolderPath, model.FileName).Replace("\\", "/");
    }
}