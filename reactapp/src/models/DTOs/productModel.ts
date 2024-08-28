export interface ProductModel {
  categoryId: string;
  name: string;
  description: string;
  price: string;
  image: string;
}

export interface ProductFormModel extends ProductModel {
  file?: File;
}

export interface ProductViewModel extends ProductModel {
  id: string;
  isNew: boolean;
  discount: string;
  discountPercentage: string;
  finalPrice: string;
  sold?: number;
  viewed?: number;
  createdAt: string;
  updatedAt: string;
  categoryName?: string;
}
