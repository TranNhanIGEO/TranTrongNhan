import { FeedbackQueryModel } from "models/Query/feedbackQueryModel";
import { AxiosParam, FormDataParam, IdentifierParam, QueryDataParam } from "../baseServiceTypes";
import { FeedbackFormModel, FeedbackViewModel } from "models/DTOs/feedbackModel";

export interface GetFeedbacksService extends QueryDataParam<FeedbackViewModel>, FeedbackQueryModel { };
export interface GetFeedbackByIdService extends IdentifierParam { };
export interface AddFeedbackService extends FormDataParam<FeedbackFormModel>, AxiosParam { };
export interface EditFeedbackService extends FormDataParam<FeedbackFormModel>, IdentifierParam, AxiosParam { };
export interface RemoveFeedbackService extends IdentifierParam, AxiosParam { };