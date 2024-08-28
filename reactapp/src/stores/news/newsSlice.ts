import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { addNews, editNews, getNewsById, getNews, removeNews } from './newsThunks';
import { RootState } from '../store';
import { NewsViewModel } from 'models/DTOs/newsModel';
import {
  NewsState,
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

const initState: NewsState = {
  isLoading: false,
  isSuccess: false,
  records: [],
  record: {} as NewsViewModel,
  totalRecords: 0,
  filteredRecords: 0,
  errors: undefined,
  message: "",
};

const newsSlice = createSlice({
  name: 'news',
  initialState: initState,
  reducers: {
    getNewsByRow: (state: NewsState, action: PayloadAction<GetNewsByIdSuccess>) => {
      const { record } = action.payload;
      state.message = "";
      state.record = record;
    },
    clearNewsByRow: (state: NewsState) => {
      state.message = "";
      state.record = {} as NewsViewModel;
    }
  },
  extraReducers: builder => {
    // Get News
    builder.addCase(getNews.pending, (state: NewsState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(getNews.fulfilled, (state: NewsState, action: PayloadAction<GetNewsSuccess>) => {
      const { records, totalRecords, filteredRecords } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.records = records;
      state.totalRecords = totalRecords;
      state.filteredRecords = filteredRecords;
      state.record = {} as NewsViewModel;
    });
    builder.addCase(getNews.rejected, (state: NewsState, action: PayloadAction<GetNewsFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.payload?.message as string;
    });
    // Get News by id
    builder.addCase(getNewsById.pending, (state: NewsState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(getNewsById.fulfilled, (state: NewsState, action: PayloadAction<GetNewsByIdSuccess>) => {
      const { record } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.record = record;
    });
    builder.addCase(getNewsById.rejected, (state: NewsState, action: PayloadAction<GetNewsByIdFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.payload?.message as string;
    });
    // Add News
    builder.addCase(addNews.pending, (state: NewsState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.errors = undefined;
      state.message = "";
    });
    builder.addCase(addNews.fulfilled, (state: NewsState, action: PayloadAction<AddNewsSuccess>) => {
      const { record, message } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.records = [record, ...state.records];
      state.totalRecords++;
      state.filteredRecords++;
      state.errors = undefined;
      state.message = message;
    });
    builder.addCase(addNews.rejected, (state: NewsState, action: PayloadAction<AddNewsFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errors = action.payload?.errors;
      state.message = action.payload?.message as string;
    });
    // Edit News
    builder.addCase(editNews.pending, (state: NewsState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.errors = undefined;
      state.message = "";
    });
    builder.addCase(editNews.fulfilled, (state: NewsState, action: PayloadAction<EditNewsSuccess>) => {
      const { record, message } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      const index = state.records.findIndex(item => item.id === record.id);
      if (index === -1) return;
      state.records[index] = record;
      state.record = {} as NewsViewModel;
      state.errors = undefined;
      state.message = message;
    });
    builder.addCase(editNews.rejected, (state: NewsState, action: PayloadAction<EditNewsFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errors = action.payload?.errors;
      state.message = action.payload?.message as string;
    });
    // Remove News
    builder.addCase(removeNews.pending, (state: NewsState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(removeNews.fulfilled, (state: NewsState, action: PayloadAction<RemoveNewsSuccess>) => {
      const { recordId, message } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.records = state.records.filter(item => item.id !== recordId);
      state.record = {} as NewsViewModel;
      state.totalRecords--;
      state.filteredRecords--;
      state.message = message;
    });
    builder.addCase(removeNews.rejected, (state: NewsState, action: PayloadAction<RemoveNewsFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.payload?.message as string;
    });
  },
});

export const newsStore = (state: RootState) => state.news;
export const { getNewsByRow, clearNewsByRow } = newsSlice.actions;
export default newsSlice.reducer;
