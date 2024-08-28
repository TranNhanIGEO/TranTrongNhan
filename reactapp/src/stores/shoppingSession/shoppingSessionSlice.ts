import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { addShoppingSession, getShoppingSessionById } from './shoppingSessionThunks';
import { RootState } from '../store';
import { ShoppingSessionViewModel } from 'models/DTOs/shoppingSessionModel';
import {
  ShoppingSessionState,
  AddShoppingSessionSuccess,
  AddShoppingSessionFailed,
  GetShoppingSessionByIdSuccess,
  GetShoppingSessionByIdFailed,
  ChangeQuantity,
} from './shoppingSessionStateTypes';

const initState: ShoppingSessionState = {
  record: {} as ShoppingSessionViewModel,
  message: "",
};

const shoppingSessionSlice = createSlice({
  name: 'shoppingSession',
  initialState: initState,
  reducers: {
    increaseQuantity: (state: ShoppingSessionState, action: PayloadAction<ChangeQuantity>) => {
      const { quantity: newQuantity } = action.payload;
      const { quantity: preQuantity } = state.record;
      state.record = { ...state.record, quantity: preQuantity + newQuantity };
    },
    changeQuantity: (state: ShoppingSessionState, action: PayloadAction<ChangeQuantity>) => {
      const { quantity: newQuantity } = action.payload;
      const { quantity: preQuantity } = state.record;
      const deltaQuantity = newQuantity - preQuantity;
      switch (deltaQuantity) {
        case 1: state.record = { ...state.record, quantity: preQuantity + 1 }; break;
        case -1: state.record = { ...state.record, quantity: preQuantity - 1 }; break;
        default: state.record = { ...state.record, quantity: preQuantity + deltaQuantity }; break;
      }
    },
  },
  extraReducers: builder => {
    // Get ShoppingSession by id
    builder.addCase(getShoppingSessionById.pending, (state: ShoppingSessionState) => {
      state.message = "";
    });
    builder.addCase(getShoppingSessionById.fulfilled, (state: ShoppingSessionState, action: PayloadAction<GetShoppingSessionByIdSuccess>) => {
      const { record } = action.payload;
      state.record = record;
    });
    builder.addCase(getShoppingSessionById.rejected, (state: ShoppingSessionState, action: PayloadAction<GetShoppingSessionByIdFailed | undefined>) => {
      state.message = action.payload?.message as string;
    });
    // Add ShoppingSession
    builder.addCase(addShoppingSession.pending, (state: ShoppingSessionState) => {
      state.message = "";
    });
    builder.addCase(addShoppingSession.fulfilled, (state: ShoppingSessionState, action: PayloadAction<AddShoppingSessionSuccess>) => {
      const { record, message } = action.payload;
      state.message = message;
      state.record = record;
    });
    builder.addCase(addShoppingSession.rejected, (state: ShoppingSessionState, action: PayloadAction<AddShoppingSessionFailed | undefined>) => {
      state.message = action.payload?.message as string;
    });
  },
});

export const shoppingSessionStore = (state: RootState) => state.shoppingSession;
export const { increaseQuantity, changeQuantity } = shoppingSessionSlice.actions;
export default shoppingSessionSlice.reducer;
