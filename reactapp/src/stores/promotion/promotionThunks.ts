import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import PromotionService from 'services/promotion/promotionService';
import { 
  AddPromotionService, 
  RemovePromotionService, 
  GetPromotionsService, 
  EditPromotionService, 
  GetPromotionByIdService 
} from 'services/promotion/promotionServiceTypes';
import {
  GetPromotionsSuccess,
  GetPromotionsFailed,
  AddPromotionSuccess,
  AddPromotionFailed,
  EditPromotionSuccess,
  EditPromotionFailed,
  RemovePromotionSuccess,
  RemovePromotionFailed,
  GetPromotionByIdSuccess,
  GetPromotionByIdFailed,
} from './promotionStateTypes';

export const getPromotionById = createAsyncThunk<GetPromotionByIdSuccess, GetPromotionByIdService, { rejectValue: GetPromotionByIdFailed }>(
  'promotion/getPromotionById',
  async ({ id }: GetPromotionByIdService, { rejectWithValue }) => {
    try {
      const { data } = await PromotionService.getPromotionById({ id });
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

export const getPromotions = createAsyncThunk<GetPromotionsSuccess, GetPromotionsService, { rejectValue: GetPromotionsFailed }>(
  'promotion/getPromotions',
  async ({ queryData, id }: GetPromotionsService, { rejectWithValue }) => {
    try {
      const { data } = await PromotionService.getPromotions({ queryData, id });
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

export const addPromotion = createAsyncThunk<AddPromotionSuccess, AddPromotionService, { rejectValue: AddPromotionFailed }>(
  'promotion/addPromotion',
  async ({ formData, axiosJWT }: AddPromotionService, { rejectWithValue }) => {
    try {
      const { data } = await PromotionService.createPromotion({ formData, axiosJWT });
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

export const editPromotion = createAsyncThunk<EditPromotionSuccess, EditPromotionService, { rejectValue: EditPromotionFailed }>(
  'promotion/editPromotion',
  async ({ id, formData, axiosJWT }: EditPromotionService, { rejectWithValue }) => {
    try {
      const { data } = await PromotionService.updatePromotion({ id, formData, axiosJWT });
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

export const removePromotion = createAsyncThunk<RemovePromotionSuccess, RemovePromotionService, { rejectValue: RemovePromotionFailed }>(
  'promotion/removePromotion',
  async ({ id, axiosJWT }: RemovePromotionService, { rejectWithValue }) => {
    try {
      const { data } = await PromotionService.deletePromotion({ id, axiosJWT });
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
