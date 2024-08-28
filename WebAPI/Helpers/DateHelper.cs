namespace SoftKiwiFlorist.Helpers;

public static class DateHelper
{
    public static DateTime GetCurrentDateTime()
    {
        return DateTime.Now;
    }

    public static string FormatDate(DateTime dateTime, string format = "yyyy-MM-dd")
    {
        return dateTime.ToString(format);
    }

    public static int? GetRemainingLockoutMinutes(DateTimeOffset? lockoutEnd)
    {
        if (lockoutEnd == null) return null;
        DateTime currentDateTime = GetCurrentDateTime();
        double remainTime = (lockoutEnd - currentDateTime).Value.TotalMinutes;
        return (int)Math.Ceiling(remainTime);
    }
}