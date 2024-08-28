import { CartItemFormModel, CartItemViewModel } from 'models/DTOs/cartItemModel';
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

export interface CartState extends BaseState<CartItemViewModel, CartItemFormModel> { }

export interface GetCartsBySessionIdSuccess extends BaseFetchRecordsSuccess<CartItemViewModel> { }

export interface AddCartSuccess extends BaseAddSuccess<CartItemViewModel> { }

export interface EditCartSuccess extends BaseEditSuccess<CartItemViewModel> { }

export interface RemoveCartSuccess extends BaseRemoveSuccess { }

export interface GetCartsBySessionIdFailed extends BaseFetchRecordsFailed { }

export interface AddCartFailed extends BaseAddFailed<CartItemFormModel> { }

export interface EditCartFailed extends BaseEditFailed<CartItemFormModel> { }

export interface RemoveCartFailed extends BaseRemoveFailed { }
