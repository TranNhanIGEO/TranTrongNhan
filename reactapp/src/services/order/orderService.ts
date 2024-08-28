import { axiosAPI } from 'utilities/axiosAPI';
import configs from 'configs';
import StringHelper from 'helpers/stringHelper';
import { AddOrderService, GetOrdersService, EditOrderService, GetOrderByIdService } from './orderServiceTypes';

class OrderService {
  static getOrders = async ({ queryData }: GetOrdersService) => {
    return await axiosAPI.get(configs.apis.public.order + "?" + StringHelper.toParams(queryData));
  };

  static getOrderById = async ({ id }: GetOrderByIdService) => {
    return await axiosAPI.get(configs.apis.public.order + '/' + id);
  };

  static createOrder = async ({ formData }: AddOrderService) => {
    return await axiosAPI.post(configs.apis.customer.order, formData);
  };

  static updateOrder = async ({ id, formData }: EditOrderService) => {
    return await axiosAPI.put(configs.apis.customer.order + '/' + id, formData);
  };
}

export default OrderService;
