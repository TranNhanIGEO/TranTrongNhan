import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { addCart, editCart, getCartsBySessionId, removeCart, removeCartList } from './cartThunks';
import { RootState } from '../store';
import { CartItemViewModel } from 'models/DTOs/cartItemModel';
import {
  CartState,
  GetCartsBySessionIdSuccess,
  GetCartsBySessionIdFailed,
  AddCartSuccess,
  AddCartFailed,
  EditCartSuccess,
  EditCartFailed,
  RemoveCartSuccess,
  RemoveCartFailed,
} from './cartStateTypes';

const initState: CartState = {
  isLoading: false,
  isSuccess: false,
  records: [],
  record: {} as CartItemViewModel,
  totalRecords: 0,
  filteredRecords: 0,
  errors: undefined,
  message: "",
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initState,
  reducers: {
    addCartIntoStorage: (state: CartState, action: PayloadAction<AddCartSuccess>) => {
      const { record } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.records = [record, ...state.records];
      state.totalRecords++;
      state.filteredRecords++;
    },
    editCartIntoStorage: (state: CartState, action: PayloadAction<EditCartSuccess>) => {
      const { record } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      const index = state.records.findIndex(item => item.id === record.id);
      if (index === -1) return;
      state.records[index] = record;
    },
    removeCartIntoStorage: (state: CartState, action: PayloadAction<RemoveCartSuccess>) => {
      const { recordId } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.records = state.records.filter(item => item.id !== recordId);
      state.totalRecords--;
      state.filteredRecords--;
    },
  },
  extraReducers: builder => {
    // Get Carts
    builder.addCase(getCartsBySessionId.pending, (state: CartState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(getCartsBySessionId.fulfilled, (state: CartState, action: PayloadAction<GetCartsBySessionIdSuccess>) => {
      const { records, totalRecords, filteredRecords } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.records = records;
      state.totalRecords = totalRecords;
      state.filteredRecords = filteredRecords;
      state.record = {} as CartItemViewModel;
    });
    builder.addCase(getCartsBySessionId.rejected, (state: CartState, action: PayloadAction<GetCartsBySessionIdFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.payload?.message as string;
    });
    // Add Cart
    builder.addCase(addCart.pending, (state: CartState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.errors = undefined;
      state.message = "";
    });
    builder.addCase(addCart.fulfilled, (state: CartState, action: PayloadAction<AddCartSuccess>) => {
      const { record, message } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.records = [record, ...state.records];
      state.totalRecords++;
      state.filteredRecords++;
      state.errors = undefined;
      state.message = message;
    });
    builder.addCase(addCart.rejected, (state: CartState, action: PayloadAction<AddCartFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errors = action.payload?.errors;
      state.message = action.payload?.message as string;
    });
    // Edit Cart
    builder.addCase(editCart.pending, (state: CartState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.errors = undefined;
      state.message = "";
    });
    builder.addCase(editCart.fulfilled, (state: CartState, action: PayloadAction<EditCartSuccess>) => {
      const { record, message } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      const index = state.records.findIndex(item => item.id === record.id);
      if (index === -1) return;
      state.records[index] = record;
      state.record = {} as CartItemViewModel;
      state.errors = undefined;
      state.message = message;
    });
    builder.addCase(editCart.rejected, (state: CartState, action: PayloadAction<EditCartFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errors = action.payload?.errors;
      state.message = action.payload?.message as string;
    });
    // Remove Cart
    builder.addCase(removeCart.pending, (state: CartState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(removeCart.fulfilled, (state: CartState, action: PayloadAction<RemoveCartSuccess>) => {
      const { recordId, message } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.records = state.records.filter(item => item.id !== recordId);
      state.record = {} as CartItemViewModel;
      state.totalRecords--;
      state.filteredRecords--;
      state.message = message;
    });
    builder.addCase(removeCart.rejected, (state: CartState, action: PayloadAction<RemoveCartFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.payload?.message as string;
    });
    // Remove Cart List
    builder.addCase(removeCartList.pending, (state: CartState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(removeCartList.fulfilled, (state: CartState, action: PayloadAction<RemoveCartSuccess>) => {
      const { message } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.records = [];
      state.record = {} as CartItemViewModel;
      state.totalRecords--;
      state.filteredRecords--;
      state.message = message;
    });
    builder.addCase(removeCartList.rejected, (state: CartState, action: PayloadAction<RemoveCartFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.payload?.message as string;
    });
  },
});

export const cartStore = (state: RootState) => state.cart;
export const { addCartIntoStorage, editCartIntoStorage, removeCartIntoStorage } = cartSlice.actions;
export default cartSlice.reducer;
