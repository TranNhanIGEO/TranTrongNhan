import { axiosAPI } from 'utilities/axiosAPI';
import configs from 'configs';
import StringHelper from 'helpers/stringHelper';
import { AddProductService, RemoveProductService, GetProductsService, EditProductService, GetProductByIdService } from './productServiceTypes';

class ProductService {
  static getProducts = async ({ queryData }: GetProductsService) => {
    return await axiosAPI.get(configs.apis.public.product + "?" + StringHelper.toParams(queryData));
  };

  static getProductById = async ({ id }: GetProductByIdService) => {
    return await axiosAPI.get(configs.apis.public.product + '/' + id);
  };

  static createProduct = async ({ formData, axiosJWT }: AddProductService) => {
    return await axiosJWT.post(configs.apis.admin.product, formData);
  };

  static updateProduct = async ({ id, formData, axiosJWT }: EditProductService) => {
    return await axiosJWT.put(configs.apis.admin.product + '/' + id, formData);
  };

  static deleteProduct = async ({ id, axiosJWT }: RemoveProductService) => {
    return await axiosJWT.delete(configs.apis.admin.product + '/' + id);
  };
}

export default ProductService;
