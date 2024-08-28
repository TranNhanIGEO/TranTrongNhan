import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import CartService from 'services/cart/cartService';
import { 
  AddCartService, 
  RemoveCartService, 
  GetCartsBySessionIdService, 
  EditCartService, 
} from 'services/cart/cartServiceTypes';
import {
  GetCartsBySessionIdSuccess,
  GetCartsBySessionIdFailed,
  AddCartSuccess,
  AddCartFailed,
  EditCartSuccess,
  EditCartFailed,
  RemoveCartSuccess,
  RemoveCartFailed,
} from './cartStateTypes';

export const getCartsBySessionId = createAsyncThunk<GetCartsBySessionIdSuccess, GetCartsBySessionIdService, { rejectValue: GetCartsBySessionIdFailed }>(
  'cart/getCartsBySessionId',
  async ({ queryData }: GetCartsBySessionIdService, { rejectWithValue }) => {
    try {
      const { data } = await CartService.getCartsBySessionId({ queryData });
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

export const addCart = createAsyncThunk<AddCartSuccess, AddCartService, { rejectValue: AddCartFailed }>(
  'cart/addCart',
  async ({ formData, axiosJWT }: AddCartService, { rejectWithValue }) => {
    try {
      const { data } = await CartService.createCart({ formData, axiosJWT });
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

export const editCart = createAsyncThunk<EditCartSuccess, EditCartService, { rejectValue: EditCartFailed }>(
  'cart/editCart',
  async ({ id, formData, axiosJWT }: EditCartService, { rejectWithValue }) => {
    try {
      const { data } = await CartService.updateCart({ id, formData, axiosJWT });
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

export const removeCart = createAsyncThunk<RemoveCartSuccess, RemoveCartService, { rejectValue: RemoveCartFailed }>(
  'cart/removeCart',
  async ({ id, axiosJWT }: RemoveCartService, { rejectWithValue }) => {
    try {
      const { data } = await CartService.deleteCart({ id, axiosJWT });
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

export const removeCartList = createAsyncThunk<RemoveCartSuccess, RemoveCartService, { rejectValue: RemoveCartFailed }>(
  'cart/removeCartList',
  async ({ id, axiosJWT }: RemoveCartService, { rejectWithValue }) => {
    try {
      const { data } = await CartService.deleteCartList({ id, axiosJWT });
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
