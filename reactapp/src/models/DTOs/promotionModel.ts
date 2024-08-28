export interface PromotionModel {
  name: string;
  description: string;
  discount?: string;
  discountPercentage?: string;
  startAt: string;
  endAt: string;
}

export interface PromotionFormModel extends PromotionModel {
  
}

export interface PromotionViewModel extends PromotionModel {
  id: string;
}
