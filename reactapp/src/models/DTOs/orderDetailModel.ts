export interface OrderDetailModel {
  productId: string;
  quantity: number;
  discount?: string;
  discountPercentage?: string;
  unitPrice: string;
  totalPrice: string;
}

export interface OrderDetailFormModel extends OrderDetailModel {

}

export interface OrderDetailViewModel extends OrderDetailModel {
  orderId: string;
  productImage?: string;
  productName?: string;
  orderReceiverName?: string;
}
