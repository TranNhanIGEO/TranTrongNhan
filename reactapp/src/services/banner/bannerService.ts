import { axiosAPI } from 'utilities/axiosAPI';
import configs from 'configs';
import StringHelper from 'helpers/stringHelper';
import { AddBannerService, RemoveBannerService, GetBannersService, EditBannerService, GetBannerByIdService } from './bannerServiceTypes';

class BannerService {
  static getBanners = async ({ queryData }: GetBannersService) => {
    return await axiosAPI.get(configs.apis.public.banner + "?" + StringHelper.toParams(queryData));
  };

  static getBannerById = async ({ id }: GetBannerByIdService) => {
    return await axiosAPI.get(configs.apis.public.banner + '/' + id);
  };

  static createBanner = async ({ formData, axiosJWT }: AddBannerService) => {
    return await axiosJWT.post(configs.apis.admin.banner, formData);
  };

  static updateBanner = async ({ id, formData, axiosJWT }: EditBannerService) => {
    return await axiosJWT.put(configs.apis.admin.banner + '/' + id, formData);
  };

  static deleteBanner = async ({ id, axiosJWT }: RemoveBannerService) => {
    return await axiosJWT.delete(configs.apis.admin.banner + '/' + id);
  };
}

export default BannerService;
