import { BannerViewModel } from 'models/DTOs/bannerModel';
import { CategoryViewModel } from 'models/DTOs/categoryModel';
import { ProductViewModel } from 'models/DTOs/productModel';
import { FeedbackViewModel } from 'models/DTOs/feedbackModel';
import { NewsViewModel } from 'models/DTOs/newsModel';
import { 
  BaseFetchRecordsSuccess, 
  BaseFetchRecordsFailed,
  BaseResponseState,
  StatusState, 
} from '../baseStateTypes';

export interface HomeState extends StatusState { 
  banners: BannerViewModel[];
  categories: CategoryViewModel[];
  products: { [categoryId: string]: ProductViewModel[] };
  feedbacks: FeedbackViewModel[];
  news: NewsViewModel[];
}

export interface GetBannersSuccess extends BaseResponseState, Pick<BaseFetchRecordsSuccess<BannerViewModel>, "records"> { }

export interface GetBannersFailed extends BaseFetchRecordsFailed { }

export interface GetCategoriesSuccess extends BaseResponseState, Pick<BaseFetchRecordsSuccess<CategoryViewModel>, "records"> { }

export interface GetCategoriesFailed extends BaseFetchRecordsFailed { }

export interface GetProductsSuccess extends BaseResponseState, Pick<BaseFetchRecordsSuccess<ProductViewModel>, "records"> { }

export interface GetProductsFailed extends BaseFetchRecordsFailed { }

export interface GetFeedbacksSuccess extends BaseResponseState, Pick<BaseFetchRecordsSuccess<FeedbackViewModel>, "records"> { }

export interface GetFeedbacksFailed extends BaseFetchRecordsFailed { }

export interface GetNewsSuccess extends BaseResponseState, Pick<BaseFetchRecordsSuccess<NewsViewModel>, "records"> { }

export interface GetNewsFailed extends BaseFetchRecordsFailed { }
