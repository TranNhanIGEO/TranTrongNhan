import configs from 'configs';
import { GetRevenuesService, GetStatisticalSummaryService } from './dashboardServiceTypes';

class DashboardService {
  static getTotalUser = async ({ axiosJWT }: GetStatisticalSummaryService) => {
    return await axiosJWT.get(configs.apis.admin.dashboard + "/total-user");
  };
  
  static getTotalShoppingSession = async ({ axiosJWT }: GetStatisticalSummaryService) => {
    return await axiosJWT.get(configs.apis.admin.dashboard + "/total-shoppingsession");
  };
  
  static getTotalOrder = async ({ axiosJWT }: GetStatisticalSummaryService) => {
    return await axiosJWT.get(configs.apis.admin.dashboard + "/total-order");
  };
  
  static getTotalRevenue = async ({ axiosJWT }: GetStatisticalSummaryService) => {
    return await axiosJWT.get(configs.apis.admin.dashboard + "/total-revenue");
  };

  static getDailyRevenue = async ({ axiosJWT }: GetRevenuesService) => {
    return await axiosJWT.get(configs.apis.admin.dashboard + "/daily-revenue");
  };
  
  static getMonthlyRevenue = async ({ axiosJWT }: GetRevenuesService) => {
    return await axiosJWT.get(configs.apis.admin.dashboard + "/monthly-revenue");
  };
  
  static getYearlyRevenue = async ({ axiosJWT }: GetRevenuesService) => {
    return await axiosJWT.get(configs.apis.admin.dashboard + "/yearly-revenue");
  };
}

export default DashboardService;
