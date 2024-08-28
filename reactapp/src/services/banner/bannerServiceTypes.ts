import { AxiosParam, FormDataParam, IdentifierParam, QueryDataParam } from "../baseServiceTypes";
import { BannerFormModel, BannerViewModel } from "models/DTOs/bannerModel";

export interface GetBannersService extends QueryDataParam<BannerViewModel> { };
export interface GetBannerByIdService extends IdentifierParam { };
export interface AddBannerService extends FormDataParam<BannerFormModel>, AxiosParam { };
export interface EditBannerService extends FormDataParam<BannerFormModel>, IdentifierParam, AxiosParam { };
export interface RemoveBannerService extends IdentifierParam, AxiosParam { };