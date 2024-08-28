namespace SoftKiwiFlorist.Models.DTOs;

public abstract class ProfileDTO
{
    public string? PhoneNumber { get; set;}
    public string? FullName { get; set;}
    public string? HomeAddress { get; set;}
    public string? Avatar { get; set;}
}

public class ProfileReqDTO : ProfileDTO
{
    public IFormFile? File { get; set; }
}

public class ProfileResDTO : ProfileDTO
{    
    public string Id { get; set;} = null!;
    public string UserName { get; set;} = null!;
    public string Email { get; set;} = null!;
    public bool? EmailConfirmed { get; set;}
    // public bool? PhoneNumberConfirmed { get; set;}
    // public bool? TwoFactorEnabled { get; set;}
    // public bool LockoutEnabled { get; set; }
    // public int AccessFailedCount { get; set; }
    // public DateTimeOffset? LockoutEnd { get; set; }
    public DateTime? CreatedAt { get; set;}
    public DateTime? UpdatedAt { get; set;}
}

public class EmailChangingModel
{
    public string Email { get; set;} = null!;
}

public class PasswordChangingModel
{
    public string CurrentPassword { get; set; } = null!;
    public string NewPassword { get; set; } = null!;
}
