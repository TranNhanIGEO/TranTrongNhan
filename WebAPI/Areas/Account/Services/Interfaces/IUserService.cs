using SoftKiwiFlorist.Models.DTOs;
using SoftKiwiFlorist.Models.Entities;

namespace SoftKiwiFlorist.Areas.Account.Services.Interfaces;

public interface IUserService
{
    Task<User> ChangeEmailAsync(string userId, EmailChangingModel model);
    Task<User> ChangePasswordAsync(string userId, PasswordChangingModel model);
    Task<User> ChangeProfileAsync(string userId, ProfileReqDTO model);
}