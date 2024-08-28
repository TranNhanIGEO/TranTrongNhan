export interface FeedbackModel {
  userId?: string;
  productId: string;
  vote: number;
  fullName: string;
  email: string;
  comment: string;
  image?: string;
}

export interface FeedbackFormModel extends FeedbackModel {
  file?: File;
}

export interface FeedbackViewModel extends FeedbackModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  userFullName?: string;
  userAvatar?: string;
  productName?: string;
}
