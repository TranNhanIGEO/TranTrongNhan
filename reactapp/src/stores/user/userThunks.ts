import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import UserService from 'services/user/userService';
import { GetUsersService } from 'services/user/userServiceTypes';
import { GetUsersSuccess, GetUsersFailed } from './userStateTypes';

export const getUsers = createAsyncThunk<GetUsersSuccess, GetUsersService, { rejectValue: GetUsersFailed }>(
  'user/getUsers',
  async ({ queryData, axiosJWT }: GetUsersService, { rejectWithValue }) => {
    try {
      const { data } = await UserService.getUsers({ queryData, axiosJWT });
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
