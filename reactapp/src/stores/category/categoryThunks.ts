import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import CategoryService from 'services/category/categoryService';
import { 
  AddCategoryService, 
  RemoveCategoryService, 
  GetCategoriesService, 
  EditCategoryService, 
  GetCategoryByIdService 
} from 'services/category/categoryServiceTypes';
import {
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

export const getCategoryById = createAsyncThunk<GetCategoryByIdSuccess, GetCategoryByIdService, { rejectValue: GetCategoryByIdFailed }>(
  'category/getCategoryById',
  async ({ id }: GetCategoryByIdService, { rejectWithValue }) => {
    try {
      const { data } = await CategoryService.getCategoryById({ id });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { data } = error.response;
        return rejectWithValue(data);
      } else {
        console.log(error);
      }
    }
  },
);

export const getCategories = createAsyncThunk<GetCategoriesSuccess, GetCategoriesService, { rejectValue: GetCategoriesFailed }>(
  'category/getCategories',
  async ({ queryData }: GetCategoriesService, { rejectWithValue }) => {
    try {
      const { data } = await CategoryService.getCategories({ queryData });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { data } = error.response;
        return rejectWithValue(data);
      } else {
        console.log(error);
      }
    }
  },
);

export const addCategory = createAsyncThunk<AddCategorySuccess, AddCategoryService, { rejectValue: AddCategoryFailed }>(
  'category/addCategory',
  async ({ formData, axiosJWT }: AddCategoryService, { rejectWithValue }) => {
    try {
      const { data } = await CategoryService.createCategory({ formData, axiosJWT });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { data } = error.response;
        return rejectWithValue(data);
      } else {
        console.log(error);
      }
    }
  },
);

export const editCategory = createAsyncThunk<EditCategorySuccess, EditCategoryService, { rejectValue: EditCategoryFailed }>(
  'category/editCategory',
  async ({ id, formData, axiosJWT }: EditCategoryService, { rejectWithValue }) => {
    try {
      const { data } = await CategoryService.updateCategory({ id, formData, axiosJWT });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { data } = error.response;
        return rejectWithValue(data);
      } else {
        console.log(error);
      }
    }
  },
);

export const removeCategory = createAsyncThunk<RemoveCategorySuccess, RemoveCategoryService, { rejectValue: RemoveCategoryFailed }>(
  'category/removeCategory',
  async ({ id, axiosJWT }: RemoveCategoryService, { rejectWithValue }) => {
    try {
      const { data } = await CategoryService.deleteCategory({ id, axiosJWT });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { data } = error.response;
        return rejectWithValue(data);
      } else {
        console.log(error);
      }
    }
  },
);
