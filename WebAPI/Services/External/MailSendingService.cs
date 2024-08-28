using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using SoftKiwiFlorist.Helpers;
using SoftKiwiFlorist.Services.External.Interfaces;
using SoftKiwiFlorist.Models.Services;

namespace SoftKiwiFlorist.Services.External;

public class MailSendingService : IMailSendingService
{
    private MailSettings _mailSetting { get; set; }
    public MailSendingService(IOptions<MailSettings> mailSetting)
    {
        this._mailSetting = mailSetting.Value;
    }
    public async Task SendMailAsync(MailContent mailContent)
    {
        if (mailContent == null)
        {
            throw new BadRequestException("Mail content cannot be null");
        }
        
        MimeMessage mimeMessage = new MimeMessage();
        BodyBuilder bodyBuilder = new BodyBuilder();

        mimeMessage.Sender = new MailboxAddress(_mailSetting.Name, _mailSetting.Mail);
        mimeMessage.From.Add(new MailboxAddress(_mailSetting.Name, _mailSetting.Mail));
        mimeMessage.To.Add(MailboxAddress.Parse(mailContent.ToMail));
        bodyBuilder.HtmlBody = mailContent.Body;
        mimeMessage.Subject = mailContent.Subject;
        mimeMessage.Body = bodyBuilder.ToMessageBody();

        using var smtpClient = new SmtpClient(); 
        await smtpClient.ConnectAsync(_mailSetting.Host, _mailSetting.Port, MailKit.Security.SecureSocketOptions.StartTls);
        await smtpClient.AuthenticateAsync(_mailSetting.Mail, _mailSetting.Password);
        await smtpClient.SendAsync(mimeMessage);
        await smtpClient.DisconnectAsync(true);
    }
}