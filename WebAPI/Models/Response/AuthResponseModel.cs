namespace SoftKiwiFlorist.Models.Response;

public class RegisterSuccessfullyResponseModel : ResponseModel 
{ 
    
}

public class LoginSuccessfullyResponseModel : ResponseModel 
{ 
    public string? Token { get; set; }
}

public class LogoutSuccessfullyResponseModel : ResponseModel 
{ 
    
}