import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { addOrder, editOrder, getOrderById, getOrders } from './orderThunks';
import { RootState } from '../store';
import { OrderViewModel } from 'models/DTOs/orderModel';
import {
  OrderState,
  GetOrdersSuccess,
  GetOrdersFailed,
  AddOrderSuccess,
  AddOrderFailed,
  EditOrderSuccess,
  EditOrderFailed,
  GetOrderByIdSuccess,
  GetOrderByIdFailed,
} from './orderStateTypes';

const initState: OrderState = {
  isLoading: false,
  isSuccess: false,
  records: [],
  record: {} as OrderViewModel,
  totalRecords: 0,
  filteredRecords: 0,
  errors: undefined,
  message: "",
};

const orderSlice = createSlice({
  name: 'order',
  initialState: initState,
  reducers: {},
  extraReducers: builder => {
    // Get Orders
    builder.addCase(getOrders.pending, (state: OrderState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(getOrders.fulfilled, (state: OrderState, action: PayloadAction<GetOrdersSuccess>) => {
      const { records, totalRecords, filteredRecords } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.records = records;
      state.totalRecords = totalRecords;
      state.filteredRecords = filteredRecords;
      state.record = {} as OrderViewModel;
    });
    builder.addCase(getOrders.rejected, (state: OrderState, action: PayloadAction<GetOrdersFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.payload?.message as string;
    });
    // Get Order by id
    builder.addCase(getOrderById.pending, (state: OrderState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(getOrderById.fulfilled, (state: OrderState, action: PayloadAction<GetOrderByIdSuccess>) => {
      const { record } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.record = record;
    });
    builder.addCase(getOrderById.rejected, (state: OrderState, action: PayloadAction<GetOrderByIdFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.payload?.message as string;
    });
    // Add Order
    builder.addCase(addOrder.pending, (state: OrderState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.errors = undefined;
      state.message = "";
    });
    builder.addCase(addOrder.fulfilled, (state: OrderState, action: PayloadAction<AddOrderSuccess>) => {
      const { message } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.errors = undefined;
      state.message = message;
    });
    builder.addCase(addOrder.rejected, (state: OrderState, action: PayloadAction<AddOrderFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errors = action.payload?.errors;
      state.message = action.payload?.message as string;
    });
    // Edit Order
    builder.addCase(editOrder.pending, (state: OrderState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.errors = undefined;
      state.message = "";
    });
    builder.addCase(editOrder.fulfilled, (state: OrderState, action: PayloadAction<EditOrderSuccess>) => {
      const { message } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.record = {} as OrderViewModel;
      state.errors = undefined;
      state.message = message;
    });
    builder.addCase(editOrder.rejected, (state: OrderState, action: PayloadAction<EditOrderFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errors = action.payload?.errors;
      state.message = action.payload?.message as string;
    });
  },
});

export const orderStore = (state: RootState) => state.order;
export default orderSlice.reducer;
