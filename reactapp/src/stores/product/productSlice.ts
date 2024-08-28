import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ProductViewModel } from 'models/DTOs/productModel';
import { 
  addProduct, 
  editProduct, 
  getProductById, 
  getProducts, 
  getMoreProducts, 
  removeProduct 
} from './productThunks';
import {
  ProductState,
  GetProductsSuccess,
  GetProductsFailed,
  AddProductSuccess,
  AddProductFailed,
  EditProductSuccess,
  EditProductFailed,
  RemoveProductSuccess,
  RemoveProductFailed,
  GetProductByIdSuccess,
  GetProductByIdFailed,
} from './productStateTypes';

const initState: ProductState = {
  isLoading: false,
  isSuccess: false,
  records: [],
  record: {} as ProductViewModel,
  totalRecords: 0,
  filteredRecords: 0,
  errors: undefined,
  message: "",
};

const productSlice = createSlice({
  name: 'product',
  initialState: initState,
  reducers: {
    getProduct: (state: ProductState, action: PayloadAction<GetProductByIdSuccess>) => {
      const { record } = action.payload;
      state.message = "";
      state.record = record;
    },
    clearProduct: (state: ProductState) => {
      state.message = "";
      state.record = {} as ProductViewModel;
    }
  },
  extraReducers: builder => {
    // Get Products
    builder.addCase(getProducts.pending, (state: ProductState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(getProducts.fulfilled, (state: ProductState, action: PayloadAction<GetProductsSuccess>) => {
      const { records, totalRecords, filteredRecords } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.records = records;
      state.totalRecords = totalRecords;
      state.filteredRecords = filteredRecords;
      state.record = {} as ProductViewModel;
    });
    builder.addCase(getProducts.rejected, (state: ProductState, action: PayloadAction<GetProductsFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.payload?.message as string;
    });
    // Get More Products
    builder.addCase(getMoreProducts.pending, (state: ProductState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(getMoreProducts.fulfilled, (state: ProductState, action: PayloadAction<GetProductsSuccess>) => {
      const { records, totalRecords, filteredRecords } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.records = !!state.records.length ? [...state.records, ...records] : records;
      state.totalRecords = totalRecords;
      state.filteredRecords = filteredRecords;
    });
    builder.addCase(getMoreProducts.rejected, (state: ProductState, action: PayloadAction<GetProductsFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.payload?.message as string;
    });
    // Get Product by id
    builder.addCase(getProductById.pending, (state: ProductState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(getProductById.fulfilled, (state: ProductState, action: PayloadAction<GetProductByIdSuccess>) => {
      const { record } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.record = record;
    });
    builder.addCase(getProductById.rejected, (state: ProductState, action: PayloadAction<GetProductByIdFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.payload?.message as string;
    });
    // Add Product
    builder.addCase(addProduct.pending, (state: ProductState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.errors = undefined;
      state.message = "";
    });
    builder.addCase(addProduct.fulfilled, (state: ProductState, action: PayloadAction<AddProductSuccess>) => {
      const { record, message } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.records = [record, ...state.records];
      state.totalRecords++;
      state.filteredRecords++;
      state.errors = undefined;
      state.message = message;
    });
    builder.addCase(addProduct.rejected, (state: ProductState, action: PayloadAction<AddProductFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errors = action.payload?.errors;
      state.message = action.payload?.message as string;
    });
    // Edit Product
    builder.addCase(editProduct.pending, (state: ProductState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.errors = undefined;
      state.message = "";
    });
    builder.addCase(editProduct.fulfilled, (state: ProductState, action: PayloadAction<EditProductSuccess>) => {
      const { record, message } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      const index = state.records.findIndex(item => item.id === record.id);
      if (index === -1) return;
      state.records[index] = record;
      state.record = {} as ProductViewModel;
      state.errors = undefined;
      state.message = message;
    });
    builder.addCase(editProduct.rejected, (state: ProductState, action: PayloadAction<EditProductFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errors = action.payload?.errors;
      state.message = action.payload?.message as string;
    });
    // Remove Product
    builder.addCase(removeProduct.pending, (state: ProductState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(removeProduct.fulfilled, (state: ProductState, action: PayloadAction<RemoveProductSuccess>) => {
      const { recordId, message } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.records = state.records.filter(item => item.id !== recordId);
      state.record = {} as ProductViewModel;
      state.totalRecords--;
      state.filteredRecords--;
      state.message = message;
    });
    builder.addCase(removeProduct.rejected, (state: ProductState, action: PayloadAction<RemoveProductFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.payload?.message as string;
    });
  },
});

export const productStore = (state: RootState) => state.product;
export const { getProduct, clearProduct } = productSlice.actions;
export default productSlice.reducer;
