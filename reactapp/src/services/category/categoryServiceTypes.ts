import { AxiosParam, FormDataParam, IdentifierParam, QueryDataParam } from "../baseServiceTypes";
import { CategoryFormModel, CategoryViewModel } from "models/DTOs/categoryModel";

export interface GetCategoriesService extends QueryDataParam<CategoryViewModel> { };
export interface GetCategoryByIdService extends IdentifierParam { };
export interface AddCategoryService extends FormDataParam<CategoryFormModel>, AxiosParam { };
export interface EditCategoryService extends FormDataParam<CategoryFormModel>, IdentifierParam, AxiosParam { };
export interface RemoveCategoryService extends IdentifierParam, AxiosParam { };