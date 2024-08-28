using System.Security.Claims;
using System.Security.Cryptography;
using System.Text.Json;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using SoftKiwiFlorist.Areas.Account.Models;
using SoftKiwiFlorist.Models.Entities;

namespace SoftKiwiFlorist.Services.External;

public static class JsonWebTokenService
{
    public static string GenerateAccessToken(User userInfo, IList<string>? roles)
    {
        var rsaEncryption = new RSAEncryptionService();
        var privateKey = rsaEncryption.ReadPrivateKey();
        var rsaSecurity = new RsaSecurityKey(privateKey);

        var claims = new List<Claim>()
        {
            new Claim("id", userInfo.Id.ToString()),
            new Claim("userName", userInfo.UserName ?? string.Empty),
            new Claim("fullName", userInfo.FullName ?? string.Empty),
            new Claim("email", userInfo.Email ?? string.Empty),
            new Claim("phoneNumber", userInfo.PhoneNumber ?? string.Empty),
            new Claim("homeAddress", userInfo.HomeAddress ?? string.Empty),
            new Claim("avatar", userInfo.Avatar ?? string.Empty),
        };
        roles?.ToList().ForEach(role => 
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        });

        var jwtHandler = new JsonWebTokenHandler();
        var tokenDescriptor = new SecurityTokenDescriptor()
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(rsaSecurity, SecurityAlgorithms.RsaSha256Signature)
        };
        
        var accessToken = jwtHandler.CreateToken(tokenDescriptor);
        return accessToken;
    }

    public static string GenerateRefreshToken()
    {
        var randomBytes = new byte[32];
        using var randomNumber = RandomNumberGenerator.Create();
        randomNumber.GetBytes(randomBytes);

        string refreshToken = Convert.ToBase64String(randomBytes);
        return refreshToken;
    }

    public static async Task<TokenValidationResult> VerifyAccessToken(string token)
    {
        var rsaEncryption = new RSAEncryptionService();
        var publicKey = rsaEncryption.ReadPublicKey();
        var rsaSecurity = new RsaSecurityKey(publicKey);

        var jwtHandler = new JsonWebTokenHandler();
        var validationParameters = new TokenValidationParameters()
        {
            // This application generate tokens itself
            ValidateActor = false,
            ValidateIssuer = false,
            ValidateAudience = false,
            // Sign the token
            RequireExpirationTime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = rsaSecurity,
            ClockSkew = TimeSpan.Zero,
            // Turn off validate lifetime
            ValidateLifetime = false
        };

        var result = await jwtHandler.ValidateTokenAsync(token, validationParameters);
        return result;
    }

    public static async Task<FacebookUser?> VerifyFacebookAccessTokenAsync(string accessToken)
    {
        using HttpClient httpClient = new HttpClient();
        HttpResponseMessage? response = await httpClient.GetAsync($"https://graph.facebook.com/me?access_token={accessToken}&fields=id,name,email");

        if (response.IsSuccessStatusCode)
        {
            string? content = await response.Content.ReadAsStringAsync();
            FacebookUser? facebookUser = JsonSerializer.Deserialize<FacebookUser>(content);
            return facebookUser;
        }

        return null;
    }

    public static async Task<GoogleUser?> VerifyGoogleAccessTokenAsync(string accessToken)
    {
        using HttpClient httpClient = new HttpClient();
        HttpResponseMessage? response = await httpClient.GetAsync($"https://www.googleapis.com/oauth2/v3/tokeninfo?access_token={accessToken}");

        if (response.IsSuccessStatusCode)
        {
            string content = await response.Content.ReadAsStringAsync();
            GoogleUser? tokenInfo = JsonSerializer.Deserialize<GoogleUser>(content);

            if (tokenInfo != null &&
                DateTime.UtcNow < DateTimeOffset.FromUnixTimeSeconds(long.Parse(tokenInfo.ExpirationTime)).UtcDateTime)
            {
                return tokenInfo;
            }
        }

        return null;
    }
}