import { axiosAPI } from 'utilities/axiosAPI';
import configs from 'configs';
import StringHelper from 'helpers/stringHelper';
import { AddFeedbackService, RemoveFeedbackService, GetFeedbacksService, EditFeedbackService, GetFeedbackByIdService } from './feedbackServiceTypes';

class FeedbackService {
  static getFeedbacks = async ({ queryData }: GetFeedbacksService) => {
    return await axiosAPI.get(configs.apis.public.feedback + "?" + StringHelper.toParams(queryData));
  };

  static getFeedbackById = async ({ id }: GetFeedbackByIdService) => {
    return await axiosAPI.get(configs.apis.public.feedback + '/' + id);
  };

  static createFeedback = async ({ formData, axiosJWT }: AddFeedbackService) => {
    return await axiosJWT.post(configs.apis.customer.feedback, formData);
  };

  static updateFeedback = async ({ id, formData, axiosJWT }: EditFeedbackService) => {
    return await axiosJWT.put(configs.apis.customer.feedback + '/' + id, formData);
  };

  static deleteFeedback = async ({ id, axiosJWT }: RemoveFeedbackService) => {
    return await axiosJWT.delete(configs.apis.admin.feedback + '/' + id);
  };
}

export default FeedbackService;
