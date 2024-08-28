using Microsoft.AspNetCore.Mvc;
using SoftKiwiFlorist.Models.Response;

namespace SoftKiwiFlorist.Helpers;

public static class ResponseHelper
{
    private static IActionResult SuccessResponse<T>(T responseModel, int statusCode)
    {
        if (responseModel is ResponseModel model)
        {
            model.IsSuccess = true;
        }
        return new ObjectResult(responseModel) { 
            StatusCode = statusCode 
        };
    }

    private static IActionResult ErrorResponse<T>(T responseModel, int statusCode) where T : ResponseModel
    {
        if (responseModel is ResponseModel model)
        {
            model.IsSuccess = false;
        }
        return new ObjectResult(responseModel) { 
            StatusCode = statusCode 
        };
    }
    
    #region AuthResponse
    public static IActionResult RegisterSuccessfullyResponse(RegisterSuccessfullyResponseModel responseModel) => SuccessResponse(responseModel, 200);
    public static IActionResult LoginSuccessfullyResponse(LoginSuccessfullyResponseModel responseModel) => SuccessResponse(responseModel, 200);
    public static IActionResult LogoutSuccessfullyResponse(LogoutSuccessfullyResponseModel responseModel) => SuccessResponse(responseModel, 200);
    #endregion

    #region SuccessResponse
    public static IActionResult GetListSuccessfullyResponse<T>(GetListSuccessfullyResponseModel<T> responseModel) => SuccessResponse(responseModel, 200);
    public static IActionResult GetOnlySuccessfullyResponse<T>(GetOnlySuccessfullyResponseModel<T> responseModel) => SuccessResponse(responseModel, 200);
    public static IActionResult CreatedSuccessfullyResponse<T>(CreatedSuccessfullyResponseModel<T> responseModel) => SuccessResponse(responseModel, 201);
    public static IActionResult UpdatedSuccessfullyResponse<T>(UpdatedSuccessfullyResponseModel<T> responseModel) => SuccessResponse(responseModel, 200);
    public static IActionResult DeletedSuccessfullyResponse(DeletedSuccessfullyResponseModel responseModel) => SuccessResponse(responseModel, 200);
    #endregion

    #region ErrorResponse
    public static IActionResult BadRequestErrorResponse(BadRequestErrorResponseModel responseModel) => ErrorResponse(responseModel, 400);
    public static IActionResult UnauthorizedErrorResponse(UnauthorizedErrorResponseModel responseModel) => ErrorResponse(responseModel, 401);
    public static IActionResult ForbiddenErrorResponse(ForbiddenErrorResponseModel responseModel) => ErrorResponse(responseModel, 403);
    public static IActionResult NotFoundErrorResponse(NotFoundErrorResponseModel responseModel) => ErrorResponse(responseModel, 404);
    public static IActionResult ConflictErrorResponse(ConflictErrorResponseModel responseModel) => ErrorResponse(responseModel, 409);
    public static IActionResult InternalServerErrorResponse(InternalServerErrorResponseModel responseModel) => ErrorResponse(responseModel, 500);
    #endregion
}