import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import HomeService from 'services/home/homeService';
import { GetBannersService } from 'services/banner/bannerServiceTypes';
import { GetCategoriesService } from 'services/category/categoryServiceTypes';
import { 
  GetBannersSuccess, 
  GetBannersFailed,
  GetCategoriesSuccess,
  GetCategoriesFailed,
  GetProductsSuccess,
  GetProductsFailed,
  GetFeedbacksSuccess,
  GetFeedbacksFailed,
  GetNewsSuccess,
  GetNewsFailed, 
} from './homeStateTypes';
import { GetProductsService } from 'services/product/productServiceTypes';
import { GetFeedbacksService } from 'services/feedback/feedbackServiceTypes';
import { GetNewsService } from 'services/news/newsServiceTypes';

export const getBanners = createAsyncThunk<GetBannersSuccess, GetBannersService, { rejectValue: GetBannersFailed }>(
  'home/getBanners',
  async ({ queryData }: GetBannersService, { rejectWithValue }) => {
    try {
      const { data } = await HomeService.getBanners({ queryData });
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
  'home/getCategories',
  async ({ queryData }: GetCategoriesService, { rejectWithValue }) => {
    try {
      const { data } = await HomeService.getCategories({ queryData });
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
  'home/getProducts',
  async ({ queryData }: GetProductsService, { rejectWithValue }) => {
    try {
      const { data } = await HomeService.getProducts({ queryData });
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

export const getFeedbacks = createAsyncThunk<GetFeedbacksSuccess, GetFeedbacksService, { rejectValue: GetFeedbacksFailed }>(
  'home/getFeedbacks',
  async ({ queryData }: GetFeedbacksService, { rejectWithValue }) => {
    try {
      const { data } = await HomeService.getFeedbacks({ queryData });
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
  'home/getNews',
  async ({ queryData }: GetNewsService, { rejectWithValue }) => {
    try {
      const { data } = await HomeService.getNews({ queryData });
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
