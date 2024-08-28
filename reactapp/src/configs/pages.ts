import routes from './routes';
import { NotFoundPage } from 'pages';
import { 
  ChangePasswordPage,
  ProfilePage,
  ConfirmEmailPage, 
  ForgotPasswordPage, 
  LoginPage, 
  RegisterPage, 
  ResetPasswordPage 
} from 'modules/Auth';
import {
  DashboardPage,
  BannerManagementPage,
  CategoryManagementPage,
  FeedbackManagementPage,
  NewsManagementPage,
  OrderManagementPage,
  ProductManagementPage,
  PromotionManagementPage,
  UserManagementPage,
  AddBannerPage,
  EditBannerPage,
  BannerDetailManagementPage,
  AddCategoryPage,
  CategoryDetailManagementPage,
  EditCategoryPage,
  AddNewsPage,
  NewsDetailManagementPage,
  EditNewsPage,
  AddProductPage,
  ProductDetailManagementPage,
  EditProductPage,
  FeedbackDetailManagementPage,
  OrderDetailManagementPage,
  AddPromotionPage,
  PromotionDetailManagementPage,
  EditPromotionPage,
} from 'modules/Admin';
import {
  AboutPage,
  CartPage,
  CheckoutPage,
  ContactPage,
  HomePage,
  NewsDetailPage,
  NewsPage,
  OrderPage,
  PaymentPage,
  ProductDetailPage,
  ProductPage,
} from 'modules/Customer';

const pages = {
  authPages: [
    { path: routes.auth.login, element: LoginPage },
    { path: routes.auth.register, element: RegisterPage },
    { path: routes.auth.confirmEmail, element: ConfirmEmailPage },
    { path: routes.auth.forgetPassword, element: ForgotPasswordPage },
    { path: routes.auth.resetPassword, element: ResetPasswordPage },
  ],
  commonPages: [
    { path: routes.auth.changePassword, element: ChangePasswordPage },
    { path: routes.auth.changeProfile, element: ProfilePage },
  ],
  privatePages: [
    { path: routes.admin.dashboard, element: DashboardPage },

    { path: routes.admin.category.root, element: CategoryManagementPage },
    { path: routes.admin.category.add, element: AddCategoryPage },
    { path: routes.admin.category.detail, element: CategoryDetailManagementPage },
    { path: routes.admin.category.edit, element: EditCategoryPage },

    { path: routes.admin.banner.root, element: BannerManagementPage },
    { path: routes.admin.banner.add, element: AddBannerPage },
    { path: routes.admin.banner.detail, element: BannerDetailManagementPage },
    { path: routes.admin.banner.edit, element: EditBannerPage },
    
    { path: routes.admin.news.root, element: NewsManagementPage },
    { path: routes.admin.news.add, element: AddNewsPage },
    { path: routes.admin.news.detail, element: NewsDetailManagementPage },
    { path: routes.admin.news.edit, element: EditNewsPage },
    
    { path: routes.admin.product.root, element: ProductManagementPage },
    { path: routes.admin.product.add, element: AddProductPage },
    { path: routes.admin.product.detail, element: ProductDetailManagementPage },
    { path: routes.admin.product.edit, element: EditProductPage },
    
    { path: routes.admin.feedback.root, element: FeedbackManagementPage },
    { path: routes.admin.feedback.detail, element: FeedbackDetailManagementPage },

    { path: routes.admin.order.root, element: OrderManagementPage },
    { path: routes.admin.order.detail, element: OrderDetailManagementPage },

    { path: routes.admin.promotion.root, element: PromotionManagementPage },
    { path: routes.admin.promotion.add, element: AddPromotionPage },
    { path: routes.admin.promotion.detail, element: PromotionDetailManagementPage },
    { path: routes.admin.promotion.edit, element: EditPromotionPage },
    
    { path: routes.admin.user, element: UserManagementPage },
  ],
  publicPages: [
    { path: routes.customer.home, element: HomePage },
    { path: routes.customer.about, element: AboutPage },
    { path: routes.customer.contact, element: ContactPage },
    { path: routes.customer.product.root, element: ProductPage },
    { path: routes.customer.product.detail, element: ProductDetailPage },

    { path: routes.customer.news.root, element: NewsPage },
    { path: routes.customer.news.detail, element: NewsDetailPage },

    { path: routes.customer.order.root, element: OrderPage },

    { path: routes.customer.cart, element: CartPage },
    { path: routes.customer.checkout, element: CheckoutPage },
    { path: routes.customer.payment, element: PaymentPage },
  ],
  errorPage: { path: routes.error, element: NotFoundPage },
};

export default pages;
