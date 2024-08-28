import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import OrderService from 'services/order/orderService';
import { 
  AddOrderService, 
  GetOrdersService, 
  EditOrderService, 
  GetOrderByIdService 
} from 'services/order/orderServiceTypes';
import {
  GetOrdersSuccess,
  GetOrdersFailed,
  AddOrderSuccess,
  AddOrderFailed,
  EditOrderSuccess,
  EditOrderFailed,
  GetOrderByIdSuccess,
  GetOrderByIdFailed,
} from './orderStateTypes';

export const getOrderById = createAsyncThunk<GetOrderByIdSuccess, GetOrderByIdService, { rejectValue: GetOrderByIdFailed }>(
  'order/getOrderById',
  async ({ id }: GetOrderByIdService, { rejectWithValue }) => {
    try {
      const { data } = await OrderService.getOrderById({ id });
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

export const getOrders = createAsyncThunk<GetOrdersSuccess, GetOrdersService, { rejectValue: GetOrdersFailed }>(
  'order/getOrders',
  async ({ queryData }: GetOrdersService, { rejectWithValue }) => {
    try {
      const { data } = await OrderService.getOrders({ queryData });
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

export const addOrder = createAsyncThunk<AddOrderSuccess, AddOrderService, { rejectValue: AddOrderFailed }>(
  'order/addOrder',
  async ({ formData }: AddOrderService, { rejectWithValue }) => {
    try {
      const { data } = await OrderService.createOrder({ formData });
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

export const editOrder = createAsyncThunk<EditOrderSuccess, EditOrderService, { rejectValue: EditOrderFailed }>(
  'order/editOrder',
  async ({ id, formData }: EditOrderService, { rejectWithValue }) => {
    try {
      const { data } = await OrderService.updateOrder({ id, formData });
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
