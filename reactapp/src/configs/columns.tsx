import { TableColumnProps } from 'components/Table/types/tableDataTypes';
import NumberHelper from 'helpers/numberHelper';
import { BannerViewModel } from 'models/DTOs/bannerModel';
import { CartItemViewModel } from 'models/DTOs/cartItemModel';
import { CategoryViewModel } from 'models/DTOs/categoryModel';
import { FeedbackViewModel } from 'models/DTOs/feedbackModel';
import { NewsViewModel } from 'models/DTOs/newsModel';
import { OrderViewModel } from 'models/DTOs/orderModel';
import { ProductViewModel } from 'models/DTOs/productModel';
import { PromotionViewModel } from 'models/DTOs/promotionModel';
import { ProfileViewModel } from 'models/DTOs/userModel';

function getStatusColor(status: string | boolean | undefined): string {
  switch (status) {
    case "Low":
    case false:
      return "badge rounded-pill bg-danger";
    case "Medium":
      return "badge rounded-pill bg-warning";
    case "High":
    case true:
      return "badge rounded-pill bg-success";
    default:
      return ""; 
  }
}

const banners: TableColumnProps<BannerViewModel>[] = [
  { key: 'id', label: 'ID', viewing: false },
  { key: 'image', label: 'Ảnh', type: 'file', viewing: true, sorting: false, searching: false },
  { key: 'categoryName', label: 'Danh mục', type: 'text', viewing: true, sorting: false, searching: true },
  { key: 'createdAt', label: 'Thời điểm khởi tạo', type: 'date', viewing: true, sorting: true, searching: true },
  { key: 'updatedAt', label: 'Thời điểm cập nhật', type: 'date', viewing: true, sorting: true, searching: true },
];

const categories: TableColumnProps<CategoryViewModel>[] = [
  { key: 'id', label: 'ID', viewing: false },
  { key: 'image', label: 'Ảnh', type: 'file', viewing: true, sorting: false, searching: false },
  { key: 'name', label: 'Tên danh mục', type: 'text', viewing: true, sorting: true, searching: true },
  { key: 'createdAt', label: 'Thời điểm khởi tạo', type: 'date', viewing: true, sorting: true, searching: true },
  { key: 'updatedAt', label: 'Thời điểm cập nhật', type: 'date', viewing: true, sorting: true, searching: true },
];

const carts: TableColumnProps<CartItemViewModel>[] = [
  { key: 'id', label: 'ID', viewing: false },
  { key: 'productImage', label: 'Ảnh', type: 'file', viewing: true, sorting: false },
  { key: 'productName', label: 'Tên sản phẩm', type: 'text', viewing: true, sorting: false },
  { key: 'productPrice', label: 'Đơn giá', type: 'text', viewing: true, sorting: false, renderRow: (item: CartItemViewModel) => <p>{NumberHelper.toDecimalString(item.productPrice)}</p> },
  { key: 'quantity', label: 'Số lượng', type: 'text', viewing: true, sorting: false },
  { key: 'totalAmount', label: 'Thành tiền', type: 'text', viewing: true, sorting: false, renderRow: (item: CartItemViewModel) => <p>{NumberHelper.toDecimalString(item.totalAmount)}</p> },
];

const feedbacks: TableColumnProps<FeedbackViewModel>[] = [
  { key: 'id', label: 'ID', viewing: false },
  { key: 'image', label: 'Ảnh', type: 'file', viewing: true, sorting: false, searching: false },
  { key: 'fullName', label: 'Khách hàng', type: 'text', viewing: true, sorting: false, searching: true },
  { key: 'email', label: 'Email', type: 'text', viewing: true, sorting: false, searching: true },
  { key: 'productName', label: 'Sản phẩm', type: 'text', viewing: true, sorting: false, searching: true },
  { key: 'vote', label: 'Đánh giá', type: 'number', viewing: true, sorting: true, searching: true },
  { key: 'comment', label: 'Cảm nhận khách hàng', type: 'text', viewing: true, sorting: true, searching: true },
  { key: 'createdAt', label: 'Thời điểm đánh giá', type: 'date', viewing: true, sorting: true, searching: true },
  // { key: 'updatedAt', label: 'Thời điểm cập nhật', type: 'date', viewing: true, sorting: true, searching: true },
];

const news: TableColumnProps<NewsViewModel>[] = [
  { key: 'id', label: 'ID', viewing: false },
  { key: 'image', label: 'Ảnh', type: 'file', viewing: true, sorting: false, searching: false },
  { key: 'title', label: 'Tiêu đề', type: 'text', viewing: true, sorting: true, searching: true },
  { key: 'summary', label: 'Tóm tắt', type: 'text', viewing: true, sorting: true, searching: true },
  { key: 'categoryName', label: 'Danh mục', type: 'text', viewing: true, sorting: false, searching: true },
  { key: 'createdAt', label: 'Thời điểm khởi tạo', type: 'date', viewing: true, sorting: true, searching: true },
  { key: 'updatedAt', label: 'Thời điểm cập nhật', type: 'date', viewing: true, sorting: true, searching: true },
];

const orders: TableColumnProps<OrderViewModel>[] = [
  { key: 'id', label: 'ID', viewing: false },
  { key: 'userFullName', label: 'Tên tài khoản', type: 'text', viewing: true, sorting: false, searching: true },
  { key: 'receiverName', label: 'Tên người nhận hàng', type: 'text', viewing: true, sorting: true, searching: true },
  { key: 'receiverAddress', label: 'Địa chỉ nhận hàng', type: 'text', viewing: true, sorting: true, searching: true },
  { key: 'phoneNumber', label: 'Số điện thoại', type: 'text', viewing: true, sorting: true, searching: true },
  { key: 'totalAmount', label: 'Tổng tiền', type: 'number', viewing: true, sorting: true, searching: true, renderRow: (item: OrderViewModel) => <p>{NumberHelper.toDecimalString(item.totalAmount)}</p> },
  { key: 'note', label: 'Ghi chú', type: 'textarea', viewing: true, sorting: false, searching: true },
  { key: 'orderStatus', label: 'Trạng thái đơn hàng', type: 'text', viewing: true, sorting: true, searching: true },
  // { key: 'paymentMethodName', label: 'Phương thức thanh toán', type: 'text', viewing: true, sorting: true, searching: true },
  // { key: 'paymentStatusName', label: 'Trạng thái thanh toán', type: 'text', viewing: true, sorting: true, searching: true },
  { key: 'orderAt', label: 'Thời điểm đặt hàng', type: 'date', viewing: true, sorting: true, searching: true },
];

const products: TableColumnProps<ProductViewModel>[] = [
  { key: 'id', label: 'ID', viewing: false },
  { key: 'image', label: 'Ảnh', type: 'file', viewing: true, sorting: false, searching: false },
  { key: 'name', label: 'Tên sản phẩm', type: 'text', viewing: true, sorting: true, searching: true },
  { key: 'description', label: 'Mô tả', type: 'textarea', viewing: true, sorting: true, searching: true },
  { key: 'price', label: 'Giá gốc', type: 'number', viewing: true, sorting: true, searching: true, renderRow: (item: ProductViewModel) => <p>{NumberHelper.toDecimalString(item.price)}</p> },
  { key: 'sold', label: 'Đã mua', type: 'number', viewing: true, sorting: true, searching: true },
  { key: 'viewed', label: 'Đã xem', type: 'number', viewing: true, sorting: true, searching: true },
  { key: 'categoryName', label: 'Danh mục', type: 'text', viewing: true, sorting: false, searching: true },
  { key: 'createdAt', label: 'Thời điểm khởi tạo', type: 'date', viewing: true, sorting: true, searching: true },
  { key: 'updatedAt', label: 'Thời điểm cập nhật', type: 'date', viewing: true, sorting: true, searching: true },
];

const promotions: TableColumnProps<PromotionViewModel>[] = [
  { key: 'id', label: 'ID', viewing: false },
  { key: 'name', label: 'Tiêu đề', type: 'text', viewing: true, sorting: true, searching: true },
  { key: 'description', label: 'Mô tả', type: 'textarea', viewing: true, sorting: true, searching: true },
  { key: 'discount', label: 'Giảm giá', type: 'number', viewing: true, sorting: true, searching: true, renderRow: (item: PromotionViewModel) => <p>{NumberHelper.toDecimalString(item.discount)}</p> },
  { key: 'discountPercentage', label: 'Phần trăm giảm giá', type: 'number', viewing: true, sorting: true, searching: true, renderRow: (item: PromotionViewModel) => <p>{NumberHelper.toDecimalString(item.discountPercentage)}</p> },
  { key: 'startAt', label: 'Thời điểm bắt đầu', type: 'date', viewing: true, sorting: true, searching: true },
  { key: 'endAt', label: 'Thời điểm kết thúc', type: 'date', viewing: true, sorting: true, searching: true },
];

const users: TableColumnProps<ProfileViewModel>[] = [
  { key: 'id', label: 'ID', viewing: false },
  { key: 'avatar', label: 'Ảnh đại diện', type: 'file', viewing: true, sorting: false, searching: true },
  { key: 'userName', label: 'Tên đăng nhập', type: 'text', viewing: true, sorting: false, searching: false },
  { key: 'fullName', label: 'Tên đầy đủ', type: 'text', viewing: true, sorting: false, searching: true },
  { key: 'email', label: 'Email', type: 'text', viewing: true, sorting: false, searching: true },
  { key: 'phoneNumber', label: 'Số điện thoại', type: 'text', viewing: true, sorting: false, searching: true },
  { key: 'homeAddress', label: 'Địa chỉ nhà ở', type: 'text', viewing: true, sorting: false, searching: true },
  { key: 'emailConfirmed', label: 'Tình trạng', type: 'text', viewing: true, sorting: false, searching: true, renderRow: (item: ProfileViewModel) => <p className={getStatusColor(item.emailConfirmed)}>{item.emailConfirmed ? "Actived" : "Not activated"}</p> },
  { key: 'createdAt', label: 'Thời điểm khởi tạo', type: 'date', viewing: true, sorting: true, searching: true },
  { key: 'updatedAt', label: 'Thời điểm cập nhật', type: 'date', viewing: true, sorting: true, searching: true },
];

const columns = {
  banners,
  categories,
  carts,
  feedbacks,
  news,
  orders,
  products,
  promotions,
  users
};

export default columns;
