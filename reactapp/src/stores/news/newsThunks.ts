import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import NewsService from 'services/news/newsService';
import { 
  AddNewsService, 
  RemoveNewsService, 
  GetNewsService, 
  EditNewsService, 
  GetNewsByIdService 
} from 'services/news/newsServiceTypes';
import {
  GetNewsSuccess,
  GetNewsFailed,
  AddNewsSuccess,
  AddNewsFailed,
  EditNewsSuccess,
  EditNewsFailed,
  RemoveNewsSuccess,
  RemoveNewsFailed,
  GetNewsByIdSuccess,
  GetNewsByIdFailed,
} from './newsStateTypes';

export const getNewsById = createAsyncThunk<GetNewsByIdSuccess, GetNewsByIdService, { rejectValue: GetNewsByIdFailed }>(
  'news/getNewsById',
  async ({ id }: GetNewsByIdService, { rejectWithValue }) => {
    try {
      const { data } = await NewsService.getNewsById({ id });
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

export const getNews = createAsyncThunk<GetNewsSuccess, GetNewsService, { rejectValue: GetNewsFailed }>(
  'news/getNews',
  async ({ queryData }: GetNewsService, { rejectWithValue }) => {
    try {
      const { data } = await NewsService.getNews({ queryData });
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

export const addNews = createAsyncThunk<AddNewsSuccess, AddNewsService, { rejectValue: AddNewsFailed }>(
  'news/addNews',
  async ({ formData, axiosJWT }: AddNewsService, { rejectWithValue }) => {
    try {
      const { data } = await NewsService.createNews({ formData, axiosJWT });
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

export const editNews = createAsyncThunk<EditNewsSuccess, EditNewsService, { rejectValue: EditNewsFailed }>(
  'news/editNews',
  async ({ id, formData, axiosJWT }: EditNewsService, { rejectWithValue }) => {
    try {
      const { data } = await NewsService.updateNews({ id, formData, axiosJWT });
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

export const removeNews = createAsyncThunk<RemoveNewsSuccess, RemoveNewsService, { rejectValue: RemoveNewsFailed }>(
  'news/removeNews',
  async ({ id, axiosJWT }: RemoveNewsService, { rejectWithValue }) => {
    try {
      const { data } = await NewsService.deleteNews({ id, axiosJWT });
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
