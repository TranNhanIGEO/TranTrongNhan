import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getBanners, getCategories, getFeedbacks, getNews, getProducts } from './homeThunks';
import { RootState } from '../store';
import {
  HomeState,
  GetBannersSuccess,
  GetBannersFailed,
  GetCategoriesSuccess,
  GetCategoriesFailed,
  GetFeedbacksSuccess,
  GetFeedbacksFailed,
  GetNewsSuccess,
  GetNewsFailed,
  GetProductsSuccess,
  GetProductsFailed,
} from './homeStateTypes';

const initState: HomeState = {
  isLoading: false,
  isSuccess: false,
  banners: [],
  categories: [],
  products: {},
  feedbacks: [],
  news: [],
};

const homeSlice = createSlice({
  name: 'home',
  initialState: initState,
  reducers: {},
  extraReducers: builder => {
    // Get banners
    builder.addCase(getBanners.pending, (state: HomeState) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(getBanners.fulfilled, (state: HomeState, action: PayloadAction<GetBannersSuccess>) => {
      const { records } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.banners = records;
    });
    builder.addCase(getBanners.rejected, (state: HomeState) => {
      state.isLoading = false;
      state.isSuccess = false;
    });
    // Get categories
    builder.addCase(getCategories.pending, (state: HomeState) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(getCategories.fulfilled, (state: HomeState, action: PayloadAction<GetCategoriesSuccess>) => {
      const { records } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.categories = records;
    });
    builder.addCase(getCategories.rejected, (state: HomeState) => {
      state.isLoading = false;
      state.isSuccess = false;
    });
    // Get products
    builder.addCase(getProducts.pending, (state: HomeState) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(getProducts.fulfilled, (state: HomeState, action: PayloadAction<GetProductsSuccess>) => {
      const { records } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      const categoryId = records?.[0]?.categoryId;
      state.products = { ...state.products, [categoryId]: records};
    });
    builder.addCase(getProducts.rejected, (state: HomeState) => {
      state.isLoading = false;
      state.isSuccess = false;
    });
    // Get feedbacks
    builder.addCase(getFeedbacks.pending, (state: HomeState) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(getFeedbacks.fulfilled, (state: HomeState, action: PayloadAction<GetFeedbacksSuccess>) => {
      const { records } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.feedbacks = records;
    });
    builder.addCase(getFeedbacks.rejected, (state: HomeState) => {
      state.isLoading = false;
      state.isSuccess = false;
    });
    // Get news
    builder.addCase(getNews.pending, (state: HomeState) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(getNews.fulfilled, (state: HomeState, action: PayloadAction<GetNewsSuccess>) => {
      const { records } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.news = records;
    });
    builder.addCase(getNews.rejected, (state: HomeState) => {
      state.isLoading = false;
      state.isSuccess = false;
    });
  },
});

export const homeStore = (state: RootState) => state.home;
export default homeSlice.reducer;
