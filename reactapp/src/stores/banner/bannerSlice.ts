import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { addBanner, editBanner, getBannerById, getBanners, removeBanner } from './bannerThunks';
import { RootState } from '../store';
import { BannerViewModel } from 'models/DTOs/bannerModel';
import {
  BannerState,
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

const initState: BannerState = {
  isLoading: false,
  isSuccess: false,
  records: [],
  record: {} as BannerViewModel,
  totalRecords: 0,
  filteredRecords: 0,
  errors: undefined,
  message: "",
};

const bannerSlice = createSlice({
  name: 'banner',
  initialState: initState,
  reducers: {
    getBanner: (state: BannerState, action: PayloadAction<GetBannerByIdSuccess>) => {
      const { record } = action.payload;
      state.message = "";
      state.record = record;
    },
    clearBanner: (state: BannerState) => {
      state.message = "";
      state.record = {} as BannerViewModel;
    }
  },
  extraReducers: builder => {
    // Get banners
    builder.addCase(getBanners.pending, (state: BannerState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(getBanners.fulfilled, (state: BannerState, action: PayloadAction<GetBannersSuccess>) => {
      const { records, totalRecords, filteredRecords } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.records = records;
      state.totalRecords = totalRecords;
      state.filteredRecords = filteredRecords;
      state.record = {} as BannerViewModel;
    });
    builder.addCase(getBanners.rejected, (state: BannerState, action: PayloadAction<GetBannersFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.payload?.message as string;
    });
    // Get banner by id
    builder.addCase(getBannerById.pending, (state: BannerState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(getBannerById.fulfilled, (state: BannerState, action: PayloadAction<GetBannerByIdSuccess>) => {
      const { record } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.record = record;
    });
    builder.addCase(getBannerById.rejected, (state: BannerState, action: PayloadAction<GetBannerByIdFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.payload?.message as string;
    });
    // Add banner
    builder.addCase(addBanner.pending, (state: BannerState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.errors = undefined;
      state.message = "";
    });
    builder.addCase(addBanner.fulfilled, (state: BannerState, action: PayloadAction<AddBannerSuccess>) => {
      const { record, message } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.records = [record, ...state.records];
      state.totalRecords++;
      state.filteredRecords++;
      state.errors = undefined;
      state.message = message;
    });
    builder.addCase(addBanner.rejected, (state: BannerState, action: PayloadAction<AddBannerFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errors = action.payload?.errors;
      state.message = action.payload?.message as string;
    });
    // Edit banner
    builder.addCase(editBanner.pending, (state: BannerState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.errors = undefined;
      state.message = "";
    });
    builder.addCase(editBanner.fulfilled, (state: BannerState, action: PayloadAction<EditBannerSuccess>) => {
      const { record, message } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      const index = state.records.findIndex(item => item.id === record.id);
      if (index === -1) return;
      state.records[index] = record;
      state.record = {} as BannerViewModel;
      state.errors = undefined;
      state.message = message;
    });
    builder.addCase(editBanner.rejected, (state: BannerState, action: PayloadAction<EditBannerFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errors = action.payload?.errors;
      state.message = action.payload?.message as string;
    });
    // Remove banner
    builder.addCase(removeBanner.pending, (state: BannerState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(removeBanner.fulfilled, (state: BannerState, action: PayloadAction<RemoveBannerSuccess>) => {
      const { recordId, message } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.records = state.records.filter(item => item.id !== recordId);
      state.record = {} as BannerViewModel;
      state.totalRecords--;
      state.filteredRecords--;
      state.message = message;
    });
    builder.addCase(removeBanner.rejected, (state: BannerState, action: PayloadAction<RemoveBannerFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.payload?.message as string;
    });
  },
});

export const bannerStore = (state: RootState) => state.banner;
export const { getBanner, clearBanner } = bannerSlice.actions;
export default bannerSlice.reducer;
