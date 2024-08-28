export interface NewsModel {
  categoryId?: string;
  title: string;
  summary: string;
  content: string;
  image: string;
}

export interface NewsFormModel extends NewsModel {
  file?: File;
}

export interface NewsViewModel extends NewsModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  categoryName?: string;
}
