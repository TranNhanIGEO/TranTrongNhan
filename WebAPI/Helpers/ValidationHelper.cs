using System.Globalization;
using System.Text.RegularExpressions;

namespace SoftKiwiFlorist.Helpers;

public static partial class ValidationHelper
{
    private static readonly CultureInfo CultureInfo = new CultureInfo("en-US") { NumberFormat = { NumberGroupSeparator = ",", NumberDecimalDigits = 0 } };
    private static readonly NumberStyles NumberStyles = NumberStyles.AllowThousands | NumberStyles.AllowDecimalPoint;

    private static bool IsValidNumber<T>(T? numVal, out int number)
    {
        number = 0;
        if (numVal == null) return false;
        string cleanedNumVal = numVal.ToString()!;
        return int.TryParse(cleanedNumVal, out number);
    }

    private static bool IsValidNumber<T>(T? numVal, out double number)
    {
        number = 0;
        if (numVal == null) return false;
        string cleanedNumVal = numVal.ToString()!;
        return double.TryParse(cleanedNumVal, NumberStyles, CultureInfo, out number);
    }

    private static bool IsValidNumber<T>(T? numVal, out decimal number)
    {
        number = 0;
        if (numVal == null) return false;
        string cleanedNumVal = numVal.ToString()!;
        return decimal.TryParse(cleanedNumVal, NumberStyles, CultureInfo, out number);
    }

    private static bool TryParseNumber<T>(T? numVal, out double number)
    {
        return IsValidNumber(numVal, out number);
    }

    public static bool IsValidInteger<T>(T? numVal)
    {
        return IsValidNumber(numVal, out int _);
    }

    public static bool IsValidDouble<T>(T? numVal)
    {
        return IsValidNumber(numVal, out double _);
    }

    public static bool IsValidDecimal<T>(T? numVal)
    {
        return IsValidNumber(numVal, out decimal _);
    }

    public static bool LessThanOrEqualToMaxValue<T>(T? numVal, double maxVal)
    {
        return TryParseNumber(numVal, out double number) && number <= maxVal;
    }

    public static bool GreaterThanOrEqualToMaxValue<T>(T? numVal, double maxVal)
    {
        return TryParseNumber(numVal, out double number) && number >= maxVal;
    }

    public static bool LessThanMaxValue<T>(T? numVal, double maxVal)
    {
        return TryParseNumber(numVal, out double number) && number < maxVal;
    }

    public static bool GreaterThanMaxValue<T>(T? numVal, double maxVal)
    {
        return TryParseNumber(numVal, out double number) && number > maxVal;
    }
}

public static partial class ValidationHelper
{
    public static bool IsSupportedFile(IFormFile? formFile)
    {
        if (formFile == null) return false;
        string[] supportedTypes = new [] { "image/jpeg", "image/jpg", "image/png", "image/gif", "image/tiff", "image/webp" };
        return supportedTypes.Contains(formFile.ContentType);
    }

    public static bool IsFileSizeValid(IFormFile? formFile)
    {
        if (formFile == null) return false;
        int maxBytesSize = 10 * 1024 * 1024;
        return maxBytesSize >= formFile.Length;
    }
}

public static partial class ValidationHelper
{
    private static bool IsValidUserInfo(string value, string pattern)
    {
        if (string.IsNullOrEmpty(value)) return false;
        Regex regex = new Regex(pattern);
        return regex.IsMatch(value);
    }

    public static bool IsValidUserName(string userName)
    {
        string pattern = @"^[a-z0-9]{8,32}$";
        return IsValidUserInfo(userName, pattern);
    }

    public static bool IsValidPassword(string password)
    {
        // string pattern = @"^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$";
        string pattern = @"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,32}$";
        return IsValidUserInfo(password, pattern);
    }

    public static bool IsValidEmailAddress(string emailAddress)
    {
        string pattern = @"^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$";
        return IsValidUserInfo(emailAddress, pattern);
    }

    public static bool IsValidPhoneNumber(string phoneNumber)
    {
        string pattern = @"^(?:\+84|84|0)(3|5|7|8|9)([0-9]{8})$";
        return IsValidUserInfo(phoneNumber, pattern);
    }
}

public static partial class ValidationHelper
{
    public static bool IsValidDateTime(string? dateTime, string format = "yyyy-MM-dd")
    {
        if (string.IsNullOrEmpty(dateTime)) return false;
        return DateTime.TryParseExact(dateTime, format, CultureInfo.InvariantCulture, DateTimeStyles.None, out _);
    }
}
