using SoftKiwiFlorist.Models.Services;

namespace SoftKiwiFlorist.Services.External.Interfaces;

public interface IFileStorageService
{
    Task<Stream> ResizeImageAsync(ImageResizingModel resizeModel);
    Task SaveFileAsync(ImageSavingModel savingModel);
    Task DeleteFileAsync(string pathRecord);
}