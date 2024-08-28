export interface CartItemModel {
  sessionId: string;
  productId: string;
  quantity: number;
}

export interface CartItemFormModel extends CartItemModel {

}

export interface CartItemViewModel extends CartItemModel {
  id: string;
  productName?: string;
  productImage?: string;
  productPrice?: string;
  totalAmount?: string;
}
