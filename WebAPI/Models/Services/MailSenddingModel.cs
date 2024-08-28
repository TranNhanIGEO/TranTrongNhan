namespace SoftKiwiFlorist.Models.Services;

public class MailSettings
{
    public string Mail { get; set;} = null!;
    public string Password { get; set;} = null!;
    public string Name { get; set;} = null!;
    public string Host { get; set;} = null!;
    public int Port { get; set;}
}
public class MailContent
{
    public string ToMail { get; set; } = null!;
    public string Subject { get; set; } = null!;
    public string Body { get; set; } = null!;
}
