import { FC, lazy } from "react";

export const HomePage: FC = lazy(() => import("./Home"));
export const AboutPage: FC = lazy(() => import("./About"));
export const ContactPage: FC = lazy(() => import("./Contact"));
export const CartPage: FC = lazy(() => import("./Cart"));
export const CheckoutPage: FC = lazy(() => import("./Checkout"));
export const NewsPage: FC = lazy(() => import("./News"));
export const NewsDetailPage: FC = lazy(() => import("./NewsDetail"));
export const OrderPage: FC = lazy(() => import("./Order"));
export const PaymentPage: FC = lazy(() => import("./Payment"));
export const ProductPage: FC = lazy(() => import("./Product"));
export const ProductDetailPage: FC = lazy(() => import("./ProductDetail"));