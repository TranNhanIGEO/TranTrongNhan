import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import ProductService from 'services/product/productService';
import { 
  AddProductService, 
  RemoveProductService, 
  GetProductsService, 
  EditProductService, 
  GetProductByIdService 
} from 'services/product/productServiceTypes';
import {
  GetProductsSuccess,
  GetProductsFailed,
  AddProductSuccess,
  AddProductFailed,
  EditProductSuccess,
  EditProductFailed,
  RemoveProductSuccess,
  RemoveProductFailed,
  GetProductByIdSuccess,
  GetProductByIdFailed,
} from './productStateTypes';

export const getProductById = createAsyncThunk<GetProductByIdSuccess, GetProductByIdService, { rejectValue: GetProductByIdFailed }>(
  'product/getProductById',
  async ({ id }: GetProductByIdService, { rejectWithValue }) => {
    try {
      const { data } = await ProductService.getProductById({ id });
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

export const getProducts = createAsyncThunk<GetProductsSuccess, GetProductsService, { rejectValue: GetProductsFailed }>(
  'product/getProducts',
  async ({ queryData }: GetProductsService, { rejectWithValue }) => {
    try {
      const { data } = await ProductService.getProducts({ queryData });
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

export const getMoreProducts = createAsyncThunk<GetProductsSuccess, GetProductsService, { rejectValue: GetProductsFailed }>(
  'product/getMoreProducts',
  async ({ queryData }: GetProductsService, { rejectWithValue }) => {
    try {
      const { data } = await ProductService.getProducts({ queryData });
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

export const addProduct = createAsyncThunk<AddProductSuccess, AddProductService, { rejectValue: AddProductFailed }>(
  'product/addProduct',
  async ({ formData, axiosJWT }: AddProductService, { rejectWithValue }) => {
    try {
      const { data } = await ProductService.createProduct({ formData, axiosJWT });
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

export const editProduct = createAsyncThunk<EditProductSuccess, EditProductService, { rejectValue: EditProductFailed }>(
  'product/editProduct',
  async ({ id, formData, axiosJWT }: EditProductService, { rejectWithValue }) => {
    try {
      const { data } = await ProductService.updateProduct({ id, formData, axiosJWT });
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

export const removeProduct = createAsyncThunk<RemoveProductSuccess, RemoveProductService, { rejectValue: RemoveProductFailed }>(
  'product/removeProduct',
  async ({ id, axiosJWT }: RemoveProductService, { rejectWithValue }) => {
    try {
      const { data } = await ProductService.deleteProduct({ id, axiosJWT });
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
