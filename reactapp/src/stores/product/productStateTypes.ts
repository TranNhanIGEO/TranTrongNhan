import { ProductFormModel, ProductViewModel } from 'models/DTOs/productModel';
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

export interface ProductState extends BaseState<ProductViewModel, ProductFormModel> { }

export interface GetProductsSuccess extends BaseFetchRecordsSuccess<ProductViewModel> { }

export interface GetProductByIdSuccess extends BaseFetchRecordSuccess<ProductViewModel> { }

export interface AddProductSuccess extends BaseAddSuccess<ProductViewModel> { }

export interface EditProductSuccess extends BaseEditSuccess<ProductViewModel> { }

export interface RemoveProductSuccess extends BaseRemoveSuccess { }

export interface GetProductsFailed extends BaseFetchRecordsFailed { }

export interface GetProductByIdFailed extends BaseFetchRecordFailed { }

export interface AddProductFailed extends BaseAddFailed<ProductFormModel> { }

export interface EditProductFailed extends BaseEditFailed<ProductFormModel> { }

export interface RemoveProductFailed extends BaseRemoveFailed { }
