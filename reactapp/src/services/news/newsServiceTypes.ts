import { AxiosParam, FormDataParam, IdentifierParam, QueryDataParam } from "../baseServiceTypes";
import { NewsFormModel, NewsViewModel } from "models/DTOs/newsModel";

export interface GetNewsService extends QueryDataParam<NewsViewModel> { };
export interface GetNewsByIdService extends IdentifierParam { };
export interface AddNewsService extends FormDataParam<NewsFormModel>, AxiosParam { };
export interface EditNewsService extends FormDataParam<NewsFormModel>, IdentifierParam, AxiosParam { };
export interface RemoveNewsService extends IdentifierParam, AxiosParam { };