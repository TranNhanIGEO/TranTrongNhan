import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { addPromotion, editPromotion, getPromotionById, getPromotions, removePromotion } from './promotionThunks';
import { RootState } from '../store';
import { PromotionViewModel } from 'models/DTOs/promotionModel';
import {
  PromotionState,
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

const initState: PromotionState = {
  isLoading: false,
  isSuccess: false,
  records: [],
  record: {} as PromotionViewModel,
  totalRecords: 0,
  filteredRecords: 0,
  errors: undefined,
  message: "",
};

const promotionSlice = createSlice({
  name: 'promotion',
  initialState: initState,
  reducers: {
    getPromotion: (state: PromotionState, action: PayloadAction<GetPromotionByIdSuccess>) => {
      const { record } = action.payload;
      state.message = "";
      state.record = record;
    },
    clearPromotion: (state: PromotionState) => {
      state.message = "";
      state.record = {} as PromotionViewModel;
    }
  },
  extraReducers: builder => {
    // Get Promotions
    builder.addCase(getPromotions.pending, (state: PromotionState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(getPromotions.fulfilled, (state: PromotionState, action: PayloadAction<GetPromotionsSuccess>) => {
      const { records, totalRecords, filteredRecords } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.records = records;
      state.totalRecords = totalRecords;
      state.filteredRecords = filteredRecords;
      state.record = {} as PromotionViewModel;
    });
    builder.addCase(getPromotions.rejected, (state: PromotionState, action: PayloadAction<GetPromotionsFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.payload?.message as string;
    });
    // Get Promotion by id
    builder.addCase(getPromotionById.pending, (state: PromotionState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(getPromotionById.fulfilled, (state: PromotionState, action: PayloadAction<GetPromotionByIdSuccess>) => {
      const { record } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.record = record;
    });
    builder.addCase(getPromotionById.rejected, (state: PromotionState, action: PayloadAction<GetPromotionByIdFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.payload?.message as string;
    });
    // Add Promotion
    builder.addCase(addPromotion.pending, (state: PromotionState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.errors = undefined;
      state.message = "";
    });
    builder.addCase(addPromotion.fulfilled, (state: PromotionState, action: PayloadAction<AddPromotionSuccess>) => {
      const { record, message } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.records = [record, ...state.records];
      state.totalRecords++;
      state.filteredRecords++;
      state.errors = undefined;
      state.message = message;
    });
    builder.addCase(addPromotion.rejected, (state: PromotionState, action: PayloadAction<AddPromotionFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errors = action.payload?.errors;
      state.message = action.payload?.message as string;
    });
    // Edit Promotion
    builder.addCase(editPromotion.pending, (state: PromotionState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.errors = undefined;
      state.message = "";
    });
    builder.addCase(editPromotion.fulfilled, (state: PromotionState, action: PayloadAction<EditPromotionSuccess>) => {
      const { record, message } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      const index = state.records.findIndex(item => item.id === record.id);
      if (index === -1) return;
      state.records[index] = record;
      state.record = {} as PromotionViewModel;
      state.errors = undefined;
      state.message = message;
    });
    builder.addCase(editPromotion.rejected, (state: PromotionState, action: PayloadAction<EditPromotionFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errors = action.payload?.errors;
      state.message = action.payload?.message as string;
    });
    // Remove Promotion
    builder.addCase(removePromotion.pending, (state: PromotionState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(removePromotion.fulfilled, (state: PromotionState, action: PayloadAction<RemovePromotionSuccess>) => {
      const { recordId, message } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.records = state.records.filter(item => item.id !== recordId);
      state.record = {} as PromotionViewModel;
      state.totalRecords--;
      state.filteredRecords--;
      state.message = message;
    });
    builder.addCase(removePromotion.rejected, (state: PromotionState, action: PayloadAction<RemovePromotionFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.payload?.message as string;
    });
  },
});

export const promotionStore = (state: RootState) => state.promotion;
export const { getPromotion, clearPromotion } = promotionSlice.actions;
export default promotionSlice.reducer;
