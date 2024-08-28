import { CartQueryModel } from 'models/Query/cartQueryModel';
import { AxiosParam, FormDataParam, IdentifierParam, QueryDataParam } from "../baseServiceTypes";
import { CartItemFormModel, CartItemViewModel } from "models/DTOs/cartItemModel";

export interface GetCartsBySessionIdService extends QueryDataParam<CartItemViewModel>, CartQueryModel { };
export interface AddCartService extends FormDataParam<CartItemFormModel>, AxiosParam { };
export interface EditCartService extends FormDataParam<CartItemFormModel>, IdentifierParam, AxiosParam { };
export interface RemoveCartService extends IdentifierParam, AxiosParam { };