export interface CategoryModel {
  name: string;
  image: string;
}

export interface CategoryFormModel extends CategoryModel {
  file?: File;
}

export interface CategoryViewModel extends CategoryModel {
  id: string;
  createdAt: string;
  updatedAt: string;
}
