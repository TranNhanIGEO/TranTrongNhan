import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import FeedbackService from 'services/feedback/feedbackService';
import { 
  AddFeedbackService, 
  RemoveFeedbackService, 
  GetFeedbacksService, 
  EditFeedbackService, 
  GetFeedbackByIdService 
} from 'services/feedback/feedbackServiceTypes';
import {
  GetFeedbacksSuccess,
  GetFeedbacksFailed,
  AddFeedbackSuccess,
  AddFeedbackFailed,
  EditFeedbackSuccess,
  EditFeedbackFailed,
  RemoveFeedbackSuccess,
  RemoveFeedbackFailed,
  GetFeedbackByIdSuccess,
  GetFeedbackByIdFailed,
} from './feedbackStateTypes';

export const getFeedbackById = createAsyncThunk<GetFeedbackByIdSuccess, GetFeedbackByIdService, { rejectValue: GetFeedbackByIdFailed }>(
  'feedback/getFeedbackById',
  async ({ id }: GetFeedbackByIdService, { rejectWithValue }) => {
    try {
      const { data } = await FeedbackService.getFeedbackById({ id });
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
  'feedback/getFeedbacks',
  async ({ queryData }: GetFeedbacksService, { rejectWithValue }) => {
    try {
      const { data } = await FeedbackService.getFeedbacks({ queryData });
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

export const addFeedback = createAsyncThunk<AddFeedbackSuccess, AddFeedbackService, { rejectValue: AddFeedbackFailed }>(
  'feedback/addFeedback',
  async ({ formData, axiosJWT }: AddFeedbackService, { rejectWithValue }) => {
    try {
      const { data } = await FeedbackService.createFeedback({ formData, axiosJWT });
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

export const editFeedback = createAsyncThunk<EditFeedbackSuccess, EditFeedbackService, { rejectValue: EditFeedbackFailed }>(
  'feedback/editFeedback',
  async ({ id, formData, axiosJWT }: EditFeedbackService, { rejectWithValue }) => {
    try {
      const { data } = await FeedbackService.updateFeedback({ id, formData, axiosJWT });
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

export const removeFeedback = createAsyncThunk<RemoveFeedbackSuccess, RemoveFeedbackService, { rejectValue: RemoveFeedbackFailed }>(
  'feedback/removeFeedback',
  async ({ id, axiosJWT }: RemoveFeedbackService, { rejectWithValue }) => {
    try {
      const { data } = await FeedbackService.deleteFeedback({ id, axiosJWT });
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
