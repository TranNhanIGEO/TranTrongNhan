using SoftKiwiFlorist.Models.Enums;

namespace SoftKiwiFlorist.Models.Services;

public abstract class ImageBaseModel
{
    public Stream FileStream { get; set; } = null!;
}

public class ImageResizingModel : ImageBaseModel
{
    public int Width { get; set; }
    public int Height { get; set; }
    public ImageFormat Format { get; set; }
}

public class ImageSavingModel : ImageBaseModel
{
    public string FileName { get; set; } = null!;
    public string FolderPath { get; set; } = null!;
}

public class ImageProcessingModel
{
    public string FileName { get; set; } = null!;
    public string FolderPath { get; set; } = null!;
    public IFormFile FormFile { get; set; } = null!;
    public int Width { get; set; }
    public int Height { get; set; }
    public ImageFormat Format { get; set; }
}
