import { NewsFormModel, NewsViewModel } from 'models/DTOs/newsModel';
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

export interface NewsState extends BaseState<NewsViewModel, NewsFormModel> { }

export interface GetNewsSuccess extends BaseFetchRecordsSuccess<NewsViewModel> { }

export interface GetNewsByIdSuccess extends BaseFetchRecordSuccess<NewsViewModel> { }

export interface AddNewsSuccess extends BaseAddSuccess<NewsViewModel> { }

export interface EditNewsSuccess extends BaseEditSuccess<NewsViewModel> { }

export interface RemoveNewsSuccess extends BaseRemoveSuccess { }

export interface GetNewsFailed extends BaseFetchRecordsFailed { }

export interface GetNewsByIdFailed extends BaseFetchRecordFailed { }

export interface AddNewsFailed extends BaseAddFailed<NewsFormModel> { }

export interface EditNewsFailed extends BaseEditFailed<NewsFormModel> { }

export interface RemoveNewsFailed extends BaseRemoveFailed { }
