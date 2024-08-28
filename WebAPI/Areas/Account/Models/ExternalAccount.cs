using System.Text.Json.Serialization;

namespace SoftKiwiFlorist.Areas.Account.Models;

public class FacebookLoginSettings
{
    public string AppId { get; set; } = null!;
    public string AppSecret { get; set; } = null!;
}

public class GoogleLoginSettings
{
    public string ClientId { get; set; } = null!;
    public string ClientSecret { get; set; } = null!;
}

public class FacebookUser
{
    [JsonPropertyName("id")]
    public string Id { get; set; } = null!;

    [JsonPropertyName("name")]
    public string Name { get; set; } = null!;

    [JsonPropertyName("email")]
    public string Email { get; set; } = null!;
}

public class GoogleUser
{
    [JsonPropertyName("email")]
    public string Email { get; set; } = null!;

    [JsonPropertyName("exp")]
    public string ExpirationTime { get; set; } = null!;
}
