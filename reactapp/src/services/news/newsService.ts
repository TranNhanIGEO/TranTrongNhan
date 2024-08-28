import { axiosAPI } from 'utilities/axiosAPI';
import configs from 'configs';
import StringHelper from 'helpers/stringHelper';
import { AddNewsService, RemoveNewsService, GetNewsService, EditNewsService, GetNewsByIdService } from './newsServiceTypes';

class NewsService {
  static getNews = async ({ queryData }: GetNewsService) => {
    return await axiosAPI.get(configs.apis.public.news + "?" + StringHelper.toParams(queryData));
  };

  static getNewsById = async ({ id }: GetNewsByIdService) => {
    return await axiosAPI.get(configs.apis.public.news + '/' + id);
  };

  static createNews = async ({ formData, axiosJWT }: AddNewsService) => {
    return await axiosJWT.post(configs.apis.admin.news, formData);
  };

  static updateNews = async ({ id, formData, axiosJWT }: EditNewsService) => {
    return await axiosJWT.put(configs.apis.admin.news + '/' + id, formData);
  };

  static deleteNews = async ({ id, axiosJWT }: RemoveNewsService) => {
    return await axiosJWT.delete(configs.apis.admin.news + '/' + id);
  };
}

export default NewsService;
