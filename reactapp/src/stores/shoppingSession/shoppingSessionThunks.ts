import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import ShoppingSessionService from 'services/shoppingSession/shoppingSessionService';
import { 
  AddShoppingSessionService, 
  EditShoppingSessionService, 
  GetShoppingSessionByIdService 
} from 'services/shoppingSession/shoppingSessionServiceTypes';
import {
  AddShoppingSessionSuccess,
  AddShoppingSessionFailed,
  GetShoppingSessionByIdSuccess,
  GetShoppingSessionByIdFailed,
  EditShoppingSessionSuccess,
  EditShoppingSessionFailed,
} from './shoppingSessionStateTypes';

export const getShoppingSessionById = createAsyncThunk<GetShoppingSessionByIdSuccess, GetShoppingSessionByIdService, { rejectValue: GetShoppingSessionByIdFailed }>(
  'shoppingSession/getShoppingSessionById',
  async ({ id }: GetShoppingSessionByIdService, { rejectWithValue }) => {
    try {
      const { data } = await ShoppingSessionService.getShoppingSessionById({ id });
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

export const addShoppingSession = createAsyncThunk<AddShoppingSessionSuccess, AddShoppingSessionService, { rejectValue: AddShoppingSessionFailed }>(
  'shoppingSession/addShoppingSession',
  async ({ formData }: AddShoppingSessionService, { rejectWithValue }) => {
    try {
      const { data } = await ShoppingSessionService.createShoppingSession({ formData });
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

export const editShoppingSession = createAsyncThunk<EditShoppingSessionSuccess, EditShoppingSessionService, { rejectValue: EditShoppingSessionFailed }>(
  'shoppingSession/editShoppingSession',
  async ({ id, formData }: EditShoppingSessionService, { rejectWithValue }) => {
    try {
      const { data } = await ShoppingSessionService.updateShoppingSession({ id, formData });
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
