import { axiosAPI } from 'utilities/axiosAPI';
import configs from 'configs';
import StringHelper from 'helpers/stringHelper';
import { AddCategoryService, RemoveCategoryService, GetCategoriesService, EditCategoryService, GetCategoryByIdService } from './categoryServiceTypes';

class CategoryService {
  static getCategories = async ({ queryData }: GetCategoriesService) => {
    return await axiosAPI.get(configs.apis.public.category + "?" + StringHelper.toParams(queryData));
  };

  static getCategoryById = async ({ id }: GetCategoryByIdService) => {
    return await axiosAPI.get(configs.apis.public.category + '/' + id);
  };

  static createCategory = async ({ formData, axiosJWT }: AddCategoryService) => {
    return await axiosJWT.post(configs.apis.admin.category, formData);
  };

  static updateCategory = async ({ id, formData, axiosJWT }: EditCategoryService) => {
    return await axiosJWT.put(configs.apis.admin.category + '/' + id, formData);
  };

  static deleteCategory = async ({ id, axiosJWT }: RemoveCategoryService) => {
    return await axiosJWT.delete(configs.apis.admin.category + '/' + id);
  };
}

export default CategoryService;
