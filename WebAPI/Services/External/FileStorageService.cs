using SoftKiwiFlorist.Models.Services;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Services.External.Interfaces;
using SoftKiwiFlorist.Models.Enums;

namespace SoftKiwiFlorist.Services.External;

public class FileStorageService : IFileStorageService
{
    private readonly string _rootPath;

    public FileStorageService()
    {
        _rootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
    }
    
    public async Task<Stream> ResizeImageAsync(ImageResizingModel resizeModel)
    {
        if (resizeModel == null)
        {
            throw new BadRequestException("Resize model cannot be null");
        }

        if (resizeModel.FileStream == null)
        {
            throw new BadRequestException("Invalid file stream");
        }

        if (resizeModel.Width <= 0)
        {
            throw new BadRequestException("Width must be greater than 0");
        }

        if (resizeModel.Height <= 0)
        {
            throw new BadRequestException("Height must be greater than 0");
        }

        resizeModel.FileStream.Position = 0;
        
        using Image image = await Image.LoadAsync(resizeModel.FileStream);
        image.Mutate(img => img.Resize(resizeModel.Width, resizeModel.Height));

        Stream imageFile = new MemoryStream();
        switch (resizeModel.Format)
        {
            case ImageFormat.Png: await image.SaveAsPngAsync(imageFile); break;
            case ImageFormat.Gif: await image.SaveAsGifAsync(imageFile); break;
            case ImageFormat.Tiff: await image.SaveAsTiffAsync(imageFile); break;
            case ImageFormat.Webp: await image.SaveAsWebpAsync(imageFile); break;
            case ImageFormat.Jpeg: default: await image.SaveAsJpegAsync(imageFile); break;
        }
        imageFile.Position = 0;
        return imageFile;
    }
    
    public async Task SaveFileAsync(ImageSavingModel savingModel)
    {
        if (savingModel == null)
        {
            throw new BadRequestException("Resize model cannot be null");
        }
        
        if (savingModel.FileStream == null)
        {
            throw new BadRequestException("Invalid file stream");
        }

        if (string.IsNullOrWhiteSpace(savingModel.FileName))
        {
            throw new BadRequestException("File name cannot be null or whitespace");
        }

        if (string.IsNullOrWhiteSpace(savingModel.FolderPath))
        {
            throw new BadRequestException("Folder path cannot be null or whitespace");
        }

        string folderPath = Path.Combine(_rootPath, savingModel.FolderPath);

        if (!Directory.Exists(folderPath))
        {
            Directory.CreateDirectory(folderPath);
        }
        
        string filePath = Path.Combine(folderPath, savingModel.FileName);

        using (Stream fileStream = new FileStream(filePath, FileMode.Create, FileAccess.Write, FileShare.None))
        {
            await savingModel.FileStream.CopyToAsync(fileStream);
        }
    }

    public async Task DeleteFileAsync(string pathRecord)
    {
        if (string.IsNullOrWhiteSpace(pathRecord))
        {
            throw new BadRequestException("Invalid path record");
        }

        string filePath = Path.Combine(_rootPath, pathRecord);

        if (File.Exists(filePath))
        {
            await Task.Run(() => File.Delete(filePath));
        }
    }
}