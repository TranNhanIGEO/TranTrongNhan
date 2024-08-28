import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { addCategory, editCategory, getCategoryById, getCategories, removeCategory } from './categoryThunks';
import { RootState } from '../store';
import { CategoryViewModel } from 'models/DTOs/categoryModel';
import {
  CategoryState,
  GetCategoriesSuccess,
  GetCategoriesFailed,
  AddCategorySuccess,
  AddCategoryFailed,
  EditCategorySuccess,
  EditCategoryFailed,
  RemoveCategorySuccess,
  RemoveCategoryFailed,
  GetCategoryByIdSuccess,
  GetCategoryByIdFailed,
} from './categoryStateTypes';

const initState: CategoryState = {
  isLoading: false,
  isSuccess: false,
  records: [],
  record: {} as CategoryViewModel,
  totalRecords: 0,
  filteredRecords: 0,
  errors: undefined,
  message: "",
};

const categorySlice = createSlice({
  name: 'category',
  initialState: initState,
  reducers: {
    getCategory: (state: CategoryState, action: PayloadAction<GetCategoryByIdSuccess>) => {
      const { record } = action.payload;
      state.message = "";
      state.record = record;
    },
    clearCategory: (state: CategoryState) => {
      state.message = "";
      state.record = {} as CategoryViewModel;
    }
  },
  extraReducers: builder => {
    // Get categories
    builder.addCase(getCategories.pending, (state: CategoryState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(getCategories.fulfilled, (state: CategoryState, action: PayloadAction<GetCategoriesSuccess>) => {
      const { records, totalRecords, filteredRecords } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.records = records;
      state.totalRecords = totalRecords;
      state.filteredRecords = filteredRecords;
      state.record = {} as CategoryViewModel;
    });
    builder.addCase(getCategories.rejected, (state: CategoryState, action: PayloadAction<GetCategoriesFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.payload?.message as string;
    });
    // Get category by id
    builder.addCase(getCategoryById.pending, (state: CategoryState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(getCategoryById.fulfilled, (state: CategoryState, action: PayloadAction<GetCategoryByIdSuccess>) => {
      const { record } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.record = record;
    });
    builder.addCase(getCategoryById.rejected, (state: CategoryState, action: PayloadAction<GetCategoryByIdFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.payload?.message as string;
    });
    // Add category
    builder.addCase(addCategory.pending, (state: CategoryState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.errors = undefined;
      state.message = "";
    });
    builder.addCase(addCategory.fulfilled, (state: CategoryState, action: PayloadAction<AddCategorySuccess>) => {
      const { record, message } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.records = [record, ...state.records];
      state.totalRecords++;
      state.filteredRecords++;
      state.errors = undefined;
      state.message = message;
    });
    builder.addCase(addCategory.rejected, (state: CategoryState, action: PayloadAction<AddCategoryFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errors = action.payload?.errors;
      state.message = action.payload?.message as string;
    });
    // Edit category
    builder.addCase(editCategory.pending, (state: CategoryState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.errors = undefined;
      state.message = "";
    });
    builder.addCase(editCategory.fulfilled, (state: CategoryState, action: PayloadAction<EditCategorySuccess>) => {
      const { record, message } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      const index = state.records.findIndex(item => item.id === record.id);
      if (index === -1) return;
      state.records[index] = record;
      state.record = {} as CategoryViewModel;
      state.errors = undefined;
      state.message = message;
    });
    builder.addCase(editCategory.rejected, (state: CategoryState, action: PayloadAction<EditCategoryFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errors = action.payload?.errors;
      state.message = action.payload?.message as string;
    });
    // Remove category
    builder.addCase(removeCategory.pending, (state: CategoryState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(removeCategory.fulfilled, (state: CategoryState, action: PayloadAction<RemoveCategorySuccess>) => {
      const { recordId, message } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.records = state.records.filter(item => item.id !== recordId);
      state.record = {} as CategoryViewModel;
      state.totalRecords--;
      state.filteredRecords--;
      state.message = message;
    });
    builder.addCase(removeCategory.rejected, (state: CategoryState, action: PayloadAction<RemoveCategoryFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.payload?.message as string;
    });
  },
});

export const categoryStore = (state: RootState) => state.category;
export const { getCategory, clearCategory } = categorySlice.actions;
export default categorySlice.reducer;
