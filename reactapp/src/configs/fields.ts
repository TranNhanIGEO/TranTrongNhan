import { ConfirmEmailModel, ForgotPasswordModel, LoginModel, RegisterModel, ResetPasswordModel } from 'models/DTOs/authModel';
import { ChangeEmailModel, ChangePasswordModel, ProfileFormModel } from 'models/DTOs/userModel';
import { BannerFormModel } from 'models/DTOs/bannerModel';
import { CategoryFormModel } from 'models/DTOs/categoryModel';
import { FeedbackFormModel } from 'models/DTOs/feedbackModel';
import { NewsFormModel } from 'models/DTOs/newsModel';
import { OrderFormModel } from 'models/DTOs/orderModel';
import { ProductFormModel } from 'models/DTOs/productModel';
import { PromotionFormModel } from 'models/DTOs/promotionModel';

const login: LoginModel = {
  userNameOrEmail: "",
  password: "",
  rememberMe: false
}

const register: RegisterModel = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
}

const confirmEmail: ConfirmEmailModel = {
  userId: "",
  code: "",
}

const forgotPassword: ForgotPasswordModel = {
  email: "",
}

const resetPassword: ResetPasswordModel = {
  code: "",
  email: "",
  password: "",
  confirmPassword: "",
}

const changePassword: ChangePasswordModel = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
}

const changeEmail: ChangeEmailModel = {
  email: "",
}

const profile: ProfileFormModel = {
  phoneNumber: "",
  fullName: "",
  homeAddress: "",
  avatar: "",
  file: undefined,
}

const banners: BannerFormModel = {
  file: undefined,
  image: '',
  categoryId: '',
};

const categories: CategoryFormModel = {
  file: undefined,
  image: '',
  name: '',
};

const feedbacks: FeedbackFormModel = {
  userId: undefined,
  file: undefined,
  image: '',
  productId: '',
  vote: 5,
  fullName: '',
  email: '',
  comment: '',
};

const news: NewsFormModel = {
  file: undefined,
  image: '',
  categoryId: '',
  title: '',
  summary: '',
  content: ''
};

const orders: OrderFormModel = {
  userId: undefined,
  sessionId: '',
  receiverName: '',
  receiverAddress: '',
  phoneNumber: '',
  totalAmount: '',
  quantity: 0,
  note: undefined,
  orderDetails: []
};

const products: ProductFormModel = {
  file: undefined,
  image: '',
  categoryId: '',
  name: '',
  description: '',
  price: ''
};

const promotions: PromotionFormModel = {
  name: '',
  description: '',
  discount: '',
  discountPercentage: '',
  startAt: "",
  endAt: ""
};

const fields = {
  login,
  register,
  confirmEmail,
  forgotPassword,
  resetPassword,
  changePassword,
  changeEmail,
  profile,
  banners,
  categories,
  feedbacks,
  news,
  orders,
  products,
  promotions,
};

export default fields;
