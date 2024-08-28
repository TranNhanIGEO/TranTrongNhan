import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import BannerService from 'services/banner/bannerService';
import { 
  AddBannerService, 
  RemoveBannerService, 
  GetBannersService, 
  EditBannerService, 
  GetBannerByIdService 
} from 'services/banner/bannerServiceTypes';
import {
  GetBannersSuccess,
  GetBannersFailed,
  AddBannerSuccess,
  AddBannerFailed,
  EditBannerSuccess,
  EditBannerFailed,
  RemoveBannerSuccess,
  RemoveBannerFailed,
  GetBannerByIdSuccess,
  GetBannerByIdFailed,
} from './bannerStateTypes';

export const getBannerById = createAsyncThunk<GetBannerByIdSuccess, GetBannerByIdService, { rejectValue: GetBannerByIdFailed }>(
  'banner/getBannerById',
  async ({ id }: GetBannerByIdService, { rejectWithValue }) => {
    try {
      const { data } = await BannerService.getBannerById({ id });
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

export const getBanners = createAsyncThunk<GetBannersSuccess, GetBannersService, { rejectValue: GetBannersFailed }>(
  'banner/getBanners',
  async ({ queryData }: GetBannersService, { rejectWithValue }) => {
    try {
      const { data } = await BannerService.getBanners({ queryData });
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

export const addBanner = createAsyncThunk<AddBannerSuccess, AddBannerService, { rejectValue: AddBannerFailed }>(
  'banner/addBanner',
  async ({ formData, axiosJWT }: AddBannerService, { rejectWithValue }) => {
    try {
      const { data } = await BannerService.createBanner({ formData, axiosJWT });
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

export const editBanner = createAsyncThunk<EditBannerSuccess, EditBannerService, { rejectValue: EditBannerFailed }>(
  'banner/editBanner',
  async ({ id, formData, axiosJWT }: EditBannerService, { rejectWithValue }) => {
    try {
      const { data } = await BannerService.updateBanner({ id, formData, axiosJWT });
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

export const removeBanner = createAsyncThunk<RemoveBannerSuccess, RemoveBannerService, { rejectValue: RemoveBannerFailed }>(
  'banner/removeBanner',
  async ({ id, axiosJWT }: RemoveBannerService, { rejectWithValue }) => {
    try {
      const { data } = await BannerService.deleteBanner({ id, axiosJWT });
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
