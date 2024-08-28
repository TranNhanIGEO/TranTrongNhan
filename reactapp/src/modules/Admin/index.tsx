import { FC, lazy } from "react";

export const DashboardPage: FC = lazy(() => import("./Dashboard"));

export const BannerManagementPage: FC = lazy(() => import("./Banner/Manager"));
export const AddBannerPage: FC = lazy(() => import("./Banner/Add"));
export const EditBannerPage: FC = lazy(() => import("./Banner/Edit"));
export const BannerDetailManagementPage: FC = lazy(() => import("./Banner/Detail"));

export const CategoryManagementPage: FC = lazy(() => import("./Category/Manager"));
export const AddCategoryPage: FC = lazy(() => import("./Category/Add"));
export const EditCategoryPage: FC = lazy(() => import("./Category/Edit"));
export const CategoryDetailManagementPage: FC = lazy(() => import("./Category/Detail"));

export const NewsManagementPage: FC = lazy(() => import("./News/Manager"));
export const AddNewsPage: FC = lazy(() => import("./News/Add"));
export const EditNewsPage: FC = lazy(() => import("./News/Edit"));
export const NewsDetailManagementPage: FC = lazy(() => import("./News/Detail"));

export const ProductManagementPage: FC = lazy(() => import("./Product/Manager"));
export const AddProductPage: FC = lazy(() => import("./Product/Add"));
export const EditProductPage: FC = lazy(() => import("./Product/Edit"));
export const ProductDetailManagementPage: FC = lazy(() => import("./Product/Detail"));

export const FeedbackManagementPage: FC = lazy(() => import("./Feedback/Manager"));
export const FeedbackDetailManagementPage: FC = lazy(() => import("./Feedback/Detail"));

export const OrderManagementPage: FC = lazy(() => import("./Order/Manager"));
export const OrderDetailManagementPage: FC = lazy(() => import("./Order/Detail"));

export const PromotionManagementPage: FC = lazy(() => import("./Promotion/Manager"));
export const AddPromotionPage: FC = lazy(() => import("./Promotion/Add"));
export const EditPromotionPage: FC = lazy(() => import("./Promotion/Edit"));
export const PromotionDetailManagementPage: FC = lazy(() => import("./Promotion/Detail"));

export const UserManagementPage: FC = lazy(() => import("./User/Manager"));