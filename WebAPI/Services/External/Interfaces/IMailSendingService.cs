using SoftKiwiFlorist.Models.Services;

namespace SoftKiwiFlorist.Services.External.Interfaces;

public interface IMailSendingService
{
    public Task SendMailAsync(MailContent mailContent);
}