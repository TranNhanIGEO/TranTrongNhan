export interface BannerModel {
  categoryId?: string;
  image: string;
}

export interface BannerFormModel extends BannerModel {
  file?: File;
}

export interface BannerViewModel extends BannerModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  categoryName?: string;
}
