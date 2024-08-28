import { OrderFormModel, OrderViewModel } from 'models/DTOs/orderModel';
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
} from '../baseStateTypes';

export interface OrderState extends BaseState<OrderViewModel, OrderFormModel> { }

export interface GetOrdersSuccess extends BaseFetchRecordsSuccess<OrderViewModel> { }

export interface GetOrderByIdSuccess extends BaseFetchRecordSuccess<OrderViewModel> { }

export interface AddOrderSuccess extends BaseAddSuccess<OrderViewModel> { }

export interface EditOrderSuccess extends BaseEditSuccess<OrderViewModel> { }

export interface GetOrdersFailed extends BaseFetchRecordsFailed { }

export interface GetOrderByIdFailed extends BaseFetchRecordFailed { }

export interface AddOrderFailed extends BaseAddFailed<OrderFormModel> { }

export interface EditOrderFailed extends BaseEditFailed<OrderFormModel> { }
