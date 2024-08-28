import { PromotionFormModel, PromotionViewModel } from 'models/DTOs/promotionModel';
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

export interface PromotionState extends BaseState<PromotionViewModel, PromotionFormModel> { }

export interface GetPromotionsSuccess extends BaseFetchRecordsSuccess<PromotionViewModel> { }

export interface GetPromotionByIdSuccess extends BaseFetchRecordSuccess<PromotionViewModel> { }

export interface AddPromotionSuccess extends BaseAddSuccess<PromotionViewModel> { }

export interface EditPromotionSuccess extends BaseEditSuccess<PromotionViewModel> { }

export interface RemovePromotionSuccess extends BaseRemoveSuccess { }

export interface GetPromotionsFailed extends BaseFetchRecordsFailed { }

export interface GetPromotionByIdFailed extends BaseFetchRecordFailed { }

export interface AddPromotionFailed extends BaseAddFailed<PromotionFormModel> { }

export interface EditPromotionFailed extends BaseEditFailed<PromotionFormModel> { }

export interface RemovePromotionFailed extends BaseRemoveFailed { }
