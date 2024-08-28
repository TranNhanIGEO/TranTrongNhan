import { CategoryFormModel, CategoryViewModel } from 'models/DTOs/categoryModel';
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

export interface CategoryState extends BaseState<CategoryViewModel, CategoryFormModel> { }

export interface GetCategoriesSuccess extends BaseFetchRecordsSuccess<CategoryViewModel> { }

export interface GetCategoryByIdSuccess extends BaseFetchRecordSuccess<CategoryViewModel> { }

export interface AddCategorySuccess extends BaseAddSuccess<CategoryViewModel> { }

export interface EditCategorySuccess extends BaseEditSuccess<CategoryViewModel> { }

export interface RemoveCategorySuccess extends BaseRemoveSuccess { }

export interface GetCategoriesFailed extends BaseFetchRecordsFailed { }

export interface GetCategoryByIdFailed extends BaseFetchRecordFailed { }

export interface AddCategoryFailed extends BaseAddFailed<CategoryFormModel> { }

export interface EditCategoryFailed extends BaseEditFailed<CategoryFormModel> { }

export interface RemoveCategoryFailed extends BaseRemoveFailed { }
