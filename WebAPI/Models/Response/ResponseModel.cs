namespace SoftKiwiFlorist.Models.Response;

public abstract class ResponseModel
{
    public bool? IsSuccess { get; set; }
    public string? Message { get; set; }
}

#region SuccessResponseModel
public class GetListSuccessfullyResponseModel<T> : ResponseModel
{
    public IList<T>? Records { get; set; }
    public int? TotalRecords { get; set; }
    public int? FilteredRecords { get; set; }
}

public class GetOnlySuccessfullyResponseModel<T> : ResponseModel
{
    public T? Record { get; set; }
}

public class CreatedSuccessfullyResponseModel<T> : ResponseModel 
{ 
    public T? Record { get; set; }
}

public class UpdatedSuccessfullyResponseModel<T> : ResponseModel 
{ 
    public T? Record { get; set; }
}

public class DeletedSuccessfullyResponseModel : ResponseModel
{
    public string? RecordId { get; set; }
}
#endregion

#region ErrorResponseModel
public class BadRequestErrorResponseModel : ResponseModel 
{ 
    public Dictionary<string, string>? Errors { get; set; }
}

public class UnauthorizedErrorResponseModel : ResponseModel { }

public class ForbiddenErrorResponseModel : ResponseModel { }

public class NotFoundErrorResponseModel : ResponseModel { }

public class ConflictErrorResponseModel : ResponseModel { }

public class InternalServerErrorResponseModel : ResponseModel { }
#endregion