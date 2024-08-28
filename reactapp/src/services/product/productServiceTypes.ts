import { ProductQueryModel } from "models/Query/productQueryModel";
import { AxiosParam, FormDataParam, IdentifierParam, QueryDataParam } from "../baseServiceTypes";
import { ProductFormModel, ProductViewModel } from "models/DTOs/productModel";

export interface GetProductsService extends QueryDataParam<ProductViewModel>, ProductQueryModel { };
export interface GetProductByIdService extends IdentifierParam { };
export interface AddProductService extends FormDataParam<ProductFormModel>, AxiosParam { };
export interface EditProductService extends FormDataParam<ProductFormModel>, IdentifierParam, AxiosParam { };
export interface RemoveProductService extends IdentifierParam, AxiosParam { };