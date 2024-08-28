import { axiosAPI } from 'utilities/axiosAPI';
import configs from 'configs';
import StringHelper from 'helpers/stringHelper';
import { AddPromotionService, RemovePromotionService, GetPromotionsService, EditPromotionService, GetPromotionByIdService } from './promotionServiceTypes';

class PromotionService {
  static getPromotions = async ({ queryData, id }: GetPromotionsService) => {
    const queryModel = { ...queryData, categoryId: id };
    return await axiosAPI.get(configs.apis.public.promotion + "?" + StringHelper.toParams(queryModel));
  };

  static getPromotionById = async ({ id }: GetPromotionByIdService) => {
    return await axiosAPI.get(configs.apis.public.promotion + '/' + id);
  };

  static createPromotion = async ({ formData, axiosJWT }: AddPromotionService) => {
    return await axiosJWT.post(configs.apis.admin.promotion, formData);
  };

  static updatePromotion = async ({ id, formData, axiosJWT }: EditPromotionService) => {
    return await axiosJWT.put(configs.apis.admin.promotion + '/' + id, formData);
  };

  static deletePromotion = async ({ id, axiosJWT }: RemovePromotionService) => {
    return await axiosJWT.delete(configs.apis.admin.promotion + '/' + id);
  };
}

export default PromotionService;
