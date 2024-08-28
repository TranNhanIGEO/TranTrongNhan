using System.Globalization;

namespace SoftKiwiFlorist.Helpers;

public static class NumberHelper
{
    private static readonly CultureInfo CultureInfo = new CultureInfo("en-US") { NumberFormat = { NumberGroupSeparator = ",", NumberDecimalDigits = 0 } };
    private static readonly NumberStyles NumberStyles = NumberStyles.AllowThousands | NumberStyles.AllowDecimalPoint;

    public static decimal? StringToDecimal(string? numVal)
    {
        if (string.IsNullOrEmpty(numVal)) return (decimal?)null;
        decimal.TryParse(numVal, NumberStyles, CultureInfo, out decimal number);
        return number;
    }

    public static double? StringToDouble(string? numVal)
    {
        if (string.IsNullOrEmpty(numVal)) return (double?)null;
        double.TryParse(numVal, NumberStyles, CultureInfo, out double number);
        return number;
    }

    public static int? StringToInteger(string? numVal)
    {
        if (string.IsNullOrEmpty(numVal)) return (int?)null;
        return int.Parse(numVal);
    }

    public static string DecimalToString(decimal numVal)
    {
        return numVal.ToString("N", CultureInfo);
    }

    public static string? DecimalToString(decimal? numVal)
    {
        return numVal != null ? numVal.ToString() : null;
    }

    public static string DoubleToString(double numVal)
    {
        return numVal.ToString("N", CultureInfo);
    }

    public static string? DoubleToString(double? numVal)
    {
        return numVal != null ? numVal.ToString() : null;
    }

    public static string IntegerToString(int numVal)
    {
        return numVal.ToString();
    }

    public static string? IntegerToString(int? numVal)
    {
        return numVal != null ? numVal.ToString() : null;
    }
}
