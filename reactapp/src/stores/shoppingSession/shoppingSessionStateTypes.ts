import { ShoppingSessionFormModel, ShoppingSessionViewModel } from 'models/DTOs/shoppingSessionModel';
import { 
  RecordState, 
  BaseFetchRecordSuccess, 
  BaseFetchRecordFailed, 
  BaseAddSuccess, 
  BaseAddFailed,
  ErrorsState, 
} from '../baseStateTypes';

export interface ShoppingSessionState extends RecordState<ShoppingSessionViewModel>, ErrorsState<ShoppingSessionFormModel> { }

export interface GetShoppingSessionByIdSuccess extends BaseFetchRecordSuccess<ShoppingSessionViewModel> { }

export interface AddShoppingSessionSuccess extends BaseAddSuccess<ShoppingSessionViewModel> { }

export interface EditShoppingSessionSuccess extends BaseAddSuccess<ShoppingSessionViewModel> { }

export interface GetShoppingSessionByIdFailed extends BaseFetchRecordFailed { }

export interface AddShoppingSessionFailed extends BaseAddFailed<ShoppingSessionFormModel> { }

export interface EditShoppingSessionFailed extends BaseAddFailed<ShoppingSessionFormModel> { }

export interface ChangeQuantity { 
  quantity: number;
}
