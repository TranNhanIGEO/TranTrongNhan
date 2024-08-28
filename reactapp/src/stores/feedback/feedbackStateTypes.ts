import { FeedbackFormModel, FeedbackViewModel } from 'models/DTOs/feedbackModel';
import { 
  BaseState, 
  BaseFetchRecordSuccess, 
  BaseFetchRecordFailed, 
  BaseFetchRecordsSuccess, 
  BaseFetchRecordsFailed, 
  BaseAddSuccess, 
  BaseAddFailed, 
  BaseEditSuccess, 
  BaseEditFailed,
  BaseRemoveSuccess, 
  BaseRemoveFailed
} from '../baseStateTypes';

export interface FeedbackState extends BaseState<FeedbackViewModel, FeedbackFormModel> { }

export interface GetFeedbacksSuccess extends BaseFetchRecordsSuccess<FeedbackViewModel> { }

export interface GetFeedbackByIdSuccess extends BaseFetchRecordSuccess<FeedbackViewModel> { }

export interface AddFeedbackSuccess extends BaseAddSuccess<FeedbackViewModel> { }

export interface EditFeedbackSuccess extends BaseEditSuccess<FeedbackViewModel> { }

export interface RemoveFeedbackSuccess extends BaseRemoveSuccess { }

export interface GetFeedbacksFailed extends BaseFetchRecordsFailed { }

export interface GetFeedbackByIdFailed extends BaseFetchRecordFailed { }

export interface AddFeedbackFailed extends BaseAddFailed<FeedbackFormModel> { }

export interface EditFeedbackFailed extends BaseEditFailed<FeedbackFormModel> { }

export interface RemoveFeedbackFailed extends BaseRemoveFailed { }
