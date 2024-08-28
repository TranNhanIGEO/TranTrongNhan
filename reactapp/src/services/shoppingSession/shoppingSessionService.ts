import { axiosAPI } from 'utilities/axiosAPI';
import configs from 'configs';
import { AddShoppingSessionService, EditShoppingSessionService, GetShoppingSessionByIdService } from './shoppingSessionServiceTypes';

class ShoppingSessionService {
  static getShoppingSessionById = async ({ id }: GetShoppingSessionByIdService) => {
    return await axiosAPI.get(configs.apis.public.shoppingSession + '/' + id);
  };

  static createShoppingSession = async ({ formData }: AddShoppingSessionService) => {
    return await axiosAPI.post(configs.apis.customer.shoppingSession, formData);
  };

  static updateShoppingSession = async ({ id, formData }: EditShoppingSessionService) => {
    return await axiosAPI.post(configs.apis.customer.shoppingSession + '/' + id, formData);
  };
}

export default ShoppingSessionService;
