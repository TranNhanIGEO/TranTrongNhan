import { axiosAPI } from 'utilities/axiosAPI';
import configs from 'configs';
import StringHelper from 'helpers/stringHelper';
import { GetBannersService } from 'services/banner/bannerServiceTypes';
import { GetCategoriesService } from 'services/category/categoryServiceTypes';
import { GetProductsService } from 'services/product/productServiceTypes';
import { GetFeedbacksService } from 'services/feedback/feedbackServiceTypes';
import { GetNewsService } from 'services/news/newsServiceTypes';

class HomeService {
  static getBanners = async ({ queryData }: GetBannersService) => {
    return await axiosAPI.get(configs.apis.public.home + "/banner?" + StringHelper.toParams(queryData));
  };

  static getCategories = async ({ queryData }: GetCategoriesService) => {
    return await axiosAPI.get(configs.apis.public.home + "/category?" + StringHelper.toParams(queryData));
  };
  
  static getProducts = async ({ queryData }: GetProductsService) => {
    return await axiosAPI.get(configs.apis.public.home + "/product?" + StringHelper.toParams(queryData));
  };
  
  static getFeedbacks = async ({ queryData }: GetFeedbacksService) => {
    return await axiosAPI.get(configs.apis.public.home + "/feedback?" + StringHelper.toParams(queryData));
  };
  
  static getNews = async ({ queryData }: GetNewsService) => {
    return await axiosAPI.get(configs.apis.public.home + "/news?" + StringHelper.toParams(queryData));
  };
}

export default HomeService;
