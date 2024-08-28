import { axiosAPI } from 'utilities/axiosAPI';
import configs from 'configs';
import { AddCartService, RemoveCartService, GetCartsBySessionIdService, EditCartService } from './cartServiceTypes';
import StringHelper from 'helpers/stringHelper';

class CartService {
  static getCartsBySessionId = async ({ queryData }: GetCartsBySessionIdService) => {
    return await axiosAPI.get(configs.apis.public.cartItem + "?" + StringHelper.toParams(queryData));
  };

  static createCart = async ({ formData, axiosJWT }: AddCartService) => {
    return await axiosJWT.post(configs.apis.customer.cartItem, formData);
  };

  static updateCart = async ({ id, formData, axiosJWT }: EditCartService) => {
    return await axiosJWT.put(configs.apis.customer.cartItem + '/' + id, formData);
  };

  static deleteCart = async ({ id, axiosJWT }: RemoveCartService) => {
    return await axiosJWT.delete(configs.apis.customer.cartItem + '/' + id);
  };

  static deleteCartList = async ({ id, axiosJWT }: RemoveCartService) => {
    return await axiosJWT.delete(configs.apis.customer.cartItem + '/session/' + id);
  };
}

export default CartService;
