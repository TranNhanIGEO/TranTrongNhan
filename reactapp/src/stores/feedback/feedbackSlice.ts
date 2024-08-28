import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { addFeedback, editFeedback, getFeedbackById, getFeedbacks, removeFeedback } from './feedbackThunks';
import { RootState } from '../store';
import { FeedbackViewModel } from 'models/DTOs/feedbackModel';
import {
  FeedbackState,
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

const initState: FeedbackState = {
  isLoading: false,
  isSuccess: false,
  records: [],
  record: {} as FeedbackViewModel,
  totalRecords: 0,
  filteredRecords: 0,
  errors: undefined,
  message: "",
};

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: initState,
  reducers: {
    getFeedback: (state: FeedbackState, action: PayloadAction<GetFeedbackByIdSuccess>) => {
      const { record } = action.payload;
      state.message = "";
      state.record = record;
    },
    clearFeedback: (state: FeedbackState) => {
      state.message = "";
      state.record = {} as FeedbackViewModel;
    }
  },
  extraReducers: builder => {
    // Get Feedbacks
    builder.addCase(getFeedbacks.pending, (state: FeedbackState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(getFeedbacks.fulfilled, (state: FeedbackState, action: PayloadAction<GetFeedbacksSuccess>) => {
      const { records, totalRecords, filteredRecords } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.records = records;
      state.totalRecords = totalRecords;
      state.filteredRecords = filteredRecords;
      state.record = {} as FeedbackViewModel;
    });
    builder.addCase(getFeedbacks.rejected, (state: FeedbackState, action: PayloadAction<GetFeedbacksFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.payload?.message as string;
    });
    // Get Feedback by id
    builder.addCase(getFeedbackById.pending, (state: FeedbackState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(getFeedbackById.fulfilled, (state: FeedbackState, action: PayloadAction<GetFeedbackByIdSuccess>) => {
      const { record } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.record = record;
    });
    builder.addCase(getFeedbackById.rejected, (state: FeedbackState, action: PayloadAction<GetFeedbackByIdFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.payload?.message as string;
    });
    // Add Feedback
    builder.addCase(addFeedback.pending, (state: FeedbackState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.errors = undefined;
      state.message = "";
    });
    builder.addCase(addFeedback.fulfilled, (state: FeedbackState, action: PayloadAction<AddFeedbackSuccess>) => {
      const { record, message } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.records = [record, ...state.records];
      state.totalRecords++;
      state.filteredRecords++;
      state.errors = undefined;
      state.message = message;
    });
    builder.addCase(addFeedback.rejected, (state: FeedbackState, action: PayloadAction<AddFeedbackFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errors = action.payload?.errors;
      state.message = action.payload?.message as string;
    });
    // Edit Feedback
    builder.addCase(editFeedback.pending, (state: FeedbackState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.errors = undefined;
      state.message = "";
    });
    builder.addCase(editFeedback.fulfilled, (state: FeedbackState, action: PayloadAction<EditFeedbackSuccess>) => {
      const { record, message } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      const index = state.records.findIndex(item => item.id === record.id);
      if (index === -1) return;
      state.records[index] = record;
      state.record = {} as FeedbackViewModel;
      state.errors = undefined;
      state.message = message;
    });
    builder.addCase(editFeedback.rejected, (state: FeedbackState, action: PayloadAction<EditFeedbackFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errors = action.payload?.errors;
      state.message = action.payload?.message as string;
    });
    // Remove Feedback
    builder.addCase(removeFeedback.pending, (state: FeedbackState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(removeFeedback.fulfilled, (state: FeedbackState, action: PayloadAction<RemoveFeedbackSuccess>) => {
      const { recordId, message } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.records = state.records.filter(item => item.id !== recordId);
      state.record = {} as FeedbackViewModel;
      state.totalRecords--;
      state.filteredRecords--;
      state.message = message;
    });
    builder.addCase(removeFeedback.rejected, (state: FeedbackState, action: PayloadAction<RemoveFeedbackFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.payload?.message as string;
    });
  },
});

export const feedbackStore = (state: RootState) => state.feedback;
export const { getFeedback, clearFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer;
