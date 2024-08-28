using System.Reflection;

namespace SoftKiwiFlorist.Helpers;

public static class EntityHelper
{
    public static void SetIdValue<T>(T entity) where T : class
    {
        PropertyInfo? idProperty = typeof(T).GetProperty("Id");
        if (idProperty != null && idProperty.PropertyType == typeof(Guid))
        {
            Guid guid = Guid.NewGuid();
            idProperty.SetValue(entity, guid);
        }
    }

    public static void SetDateTimeValue<T>(T entity, string property) where T : class
    {
        DateTime dateTime = DateHelper.GetCurrentDateTime();
        PropertyInfo? dateTimeProperty = typeof(T).GetProperty(property);
        if (dateTimeProperty != null && dateTimeProperty.PropertyType == typeof(DateTime))
        {
            dateTimeProperty.SetValue(entity, dateTime);
        }
    }

    public static void SetDateTimeValue<T>(T entity, string[] properties) where T : class
    {
        DateTime dateTime = DateHelper.GetCurrentDateTime();
        properties.ToList().ForEach(property => {
            SetDateTimeValue(entity, property);
        });
    }

    public static void SetNormalizedTermValue<T>(T entity, Dictionary<string, Func<T, object>> properties)
    {
        PropertyInfo? normalizedTermProperty = typeof(T).GetProperty("NormalizedTerm");
        if (normalizedTermProperty != null && normalizedTermProperty.PropertyType == typeof(string))
        {
            string[] stringArray = properties.Select(pair => $"{pair.Value(entity)?.ToString()}").ToArray();
            string stringValue = StringHelper.ToUnsignCase(string.Join("---", stringArray).Trim());
            normalizedTermProperty.SetValue(entity, stringValue);
        }
    }
}