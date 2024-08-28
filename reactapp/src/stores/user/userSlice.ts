import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getUsers } from './userThunks';
import { RootState } from '../store';
import { ProfileViewModel } from 'models/DTOs/userModel';
import { GetUsersFailed, GetUsersSuccess, UserState } from './userStateTypes';

const initState: UserState = {
  isLoading: false,
  isSuccess: false,
  records: [],
  record: {} as ProfileViewModel,
  totalRecords: 0,
  filteredRecords: 0,
  errors: undefined,
  message: "",
};

const userSlice = createSlice({
  name: 'user',
  initialState: initState,
  reducers: {},
  extraReducers: builder => {
    // Get users
    builder.addCase(getUsers.pending, (state: UserState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(getUsers.fulfilled, (state: UserState, action: PayloadAction<GetUsersSuccess>) => {
      const { records, totalRecords, filteredRecords } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.records = records;
      state.totalRecords = totalRecords;
      state.filteredRecords = filteredRecords;
      state.record = {} as ProfileViewModel;
    });
    builder.addCase(getUsers.rejected, (state: UserState, action: PayloadAction<GetUsersFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.payload?.message as string;
    });
  },
});

export const userStore = (state: RootState) => state.user;
export default userSlice.reducer;
