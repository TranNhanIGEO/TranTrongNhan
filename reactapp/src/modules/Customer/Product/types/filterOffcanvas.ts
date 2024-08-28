import { ProductQueryModel } from "models/Query/productQueryModel";
import { ChangeEvent } from "react";

export interface FilterOffcanvasProps {
  isOpenModal: boolean;
  closeModal: () => void;
  onCategoryChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPriceRangeChange: (e: ChangeEvent<HTMLInputElement>) => void;
  productQuery: ProductQueryModel;
}