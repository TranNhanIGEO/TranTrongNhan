import { OrderQueryModel } from "models/Query/orderQueryModel";
import { FormDataParam, IdentifierParam, QueryDataParam } from "../baseServiceTypes";
import { OrderFormModel, OrderViewModel } from "models/DTOs/orderModel";

export interface GetOrdersService extends QueryDataParam<OrderViewModel>, OrderQueryModel { };
export interface GetOrderByIdService extends IdentifierParam { };
export interface AddOrderService extends FormDataParam<OrderFormModel> { };
export interface EditOrderService extends FormDataParam<OrderFormModel>, IdentifierParam { };