import { CartItemViewModel } from './../models/DTOs/cartItemModel';
import { INIT_PAGE_INDEX, ITEMS_PER_PAGE } from 'constants/table';
import { BannerViewModel } from 'models/DTOs/bannerModel';
import { CategoryViewModel } from 'models/DTOs/categoryModel';
import { FeedbackViewModel } from 'models/DTOs/feedbackModel';
import { NewsViewModel } from 'models/DTOs/newsModel';
import { OrderViewModel } from 'models/DTOs/orderModel';
import { ProductViewModel } from 'models/DTOs/productModel';
import { PromotionViewModel } from 'models/DTOs/promotionModel';
import { ProfileViewModel } from 'models/DTOs/userModel';
import { PagingModel, QueryModel, SearchingModel } from 'models/Query/queryModel';

const baseQueryModel: PagingModel & SearchingModel = {
  searchTerm: '',
  pageIndex: INIT_PAGE_INDEX,
  pageSize: ITEMS_PER_PAGE,
};

const banners: QueryModel<BannerViewModel> = {
  ...baseQueryModel,
  sortBy: 'createdAt',
  sortDirection: 'asc',
};

const categories: QueryModel<CategoryViewModel> = {
  ...baseQueryModel,
  sortBy: 'createdAt',
  sortDirection: 'asc',
};

const cartItems: QueryModel<CartItemViewModel> = {
  ...baseQueryModel,
  sortBy: 'id',
  sortDirection: 'asc',
};

const feedbacks: QueryModel<FeedbackViewModel> = {
  ...baseQueryModel,
  sortBy: 'createdAt',
  sortDirection: 'asc',
};

const news: QueryModel<NewsViewModel> = {
  ...baseQueryModel,
  sortBy: 'createdAt',
  sortDirection: 'asc',
};

const orders: QueryModel<OrderViewModel> = {
  ...baseQueryModel,
  sortBy: 'orderAt',
  sortDirection: 'asc',
};

const products: QueryModel<ProductViewModel> = {
  ...baseQueryModel,
  sortBy: 'createdAt',
  sortDirection: 'asc',
};

const promotions: QueryModel<PromotionViewModel> = {
  ...baseQueryModel,
  sortBy: 'startAt',
  sortDirection: 'asc',
};

const users: QueryModel<ProfileViewModel> = {
  ...baseQueryModel,
  sortBy: 'createdAt',
  sortDirection: 'asc',
};

const query = {
  banners,
  categories,
  cartItems,
  feedbacks,
  news,
  orders,
  products,
  promotions,
  users
};

export default query;