import { AxiosParam, FormDataParam, IdentifierParam } from "../baseServiceTypes";
import { ShoppingSessionFormModel } from "models/DTOs/shoppingSessionModel";

export interface GetShoppingSessionByIdService extends IdentifierParam { };
export interface AddShoppingSessionService extends FormDataParam<ShoppingSessionFormModel> { };
export interface EditShoppingSessionService extends FormDataParam<ShoppingSessionFormModel>, IdentifierParam { };

