import { AxiosParam, FormDataParam, IdentifierParam, QueryDataParam } from "../baseServiceTypes";
import { PromotionFormModel, PromotionViewModel } from "models/DTOs/promotionModel";

export interface GetPromotionsService extends QueryDataParam<PromotionViewModel>, IdentifierParam { };
export interface GetPromotionByIdService extends IdentifierParam { };
export interface AddPromotionService extends FormDataParam<PromotionFormModel>, AxiosParam { };
export interface EditPromotionService extends FormDataParam<PromotionFormModel>, IdentifierParam, AxiosParam { };
export interface RemovePromotionService extends IdentifierParam, AxiosParam { };