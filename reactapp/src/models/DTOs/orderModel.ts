import { OrderDetailFormModel, OrderDetailViewModel } from "./orderDetailModel"

export interface OrderModel
{
    userId? : string
    sessionId: string
    receiverName: string
    receiverAddress: string
    phoneNumber: string
    note?: string
    quantity: number
    totalAmount: string
}

export interface OrderFormModel extends OrderModel
{
    orderDetails: OrderDetailFormModel[]    
}

export interface OrderViewModel extends OrderModel
{
    id: string
    orderStatusId: string
    orderAt: Date
    userFullName?: string
    orderStatus?: string
    paymentMethodName?: string
    paymentStatusName?: string
    orderDetails: OrderDetailViewModel[]
}
