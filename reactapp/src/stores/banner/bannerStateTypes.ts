import { BannerFormModel, BannerViewModel } from 'models/DTOs/bannerModel';
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

export interface BannerState extends BaseState<BannerViewModel, BannerFormModel> { }

export interface GetBannersSuccess extends BaseFetchRecordsSuccess<BannerViewModel> { }

export interface GetBannerByIdSuccess extends BaseFetchRecordSuccess<BannerViewModel> { }

export interface AddBannerSuccess extends BaseAddSuccess<BannerViewModel> { }

export interface EditBannerSuccess extends BaseEditSuccess<BannerViewModel> { }

export interface RemoveBannerSuccess extends BaseRemoveSuccess { }

export interface GetBannersFailed extends BaseFetchRecordsFailed { }

export interface GetBannerByIdFailed extends BaseFetchRecordFailed { }

export interface AddBannerFailed extends BaseAddFailed<BannerFormModel> { }

export interface EditBannerFailed extends BaseEditFailed<BannerFormModel> { }

export interface RemoveBannerFailed extends BaseRemoveFailed { }
