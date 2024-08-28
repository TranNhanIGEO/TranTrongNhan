import { ProfileFormModel, ProfileViewModel } from 'models/DTOs/userModel';
import { 
  BaseState, 
  BaseFetchRecordsSuccess, 
  BaseFetchRecordsFailed, 
} from '../baseStateTypes';

export interface UserState extends BaseState<ProfileViewModel, ProfileFormModel> { }

export interface GetUsersSuccess extends BaseFetchRecordsSuccess<ProfileViewModel> { }

export interface GetUsersFailed extends BaseFetchRecordsFailed { }
