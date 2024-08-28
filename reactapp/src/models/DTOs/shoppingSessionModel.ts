export interface ShoppingSessionModel {
  userId?: string;
}

export interface ShoppingSessionFormModel extends ShoppingSessionModel {
  
}

export interface ShoppingSessionViewModel extends ShoppingSessionModel {
  id: string;
  quantity: number;
  totalUnitPrice: string;
  totalDiscount: string;
  totalPrice: string;
  sessionStatusId: string;
  sessionStatus?: string;
  createdAt: string;
  updatedAt: string;
}
