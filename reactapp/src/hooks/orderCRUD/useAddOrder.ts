import { useDispatch, useSelector } from 'react-redux';
import { FormEvent, useEffect, useMemo } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { AuthState } from 'stores/auth/authStateTypes';
import { authStore } from 'stores/auth/authSlice';
import { shoppingSessionStore } from 'stores/shoppingSession/shoppingSessionSlice';
import { ShoppingSessionState } from 'stores/shoppingSession/shoppingSessionStateTypes';
import { cartStore } from 'stores/cart/cartSlice';
import { CartState } from 'stores/cart/cartStateTypes';
import { OrderDetailFormModel } from 'models/DTOs/orderDetailModel';
import { orderSchema } from 'validators/orderValidator';
import { OrderFormModel } from 'models/DTOs/orderModel';
import { AppDispatch } from 'stores/store';
import { addOrder } from 'stores/order/orderThunks';
import NumberHelper from 'helpers/numberHelper';
import configs from 'configs';

import useValidation from 'hooks/common/useValidation';
import useMessage from 'hooks/common/useMessage';
import useFormControl from 'components/Form/hooks/useFormControl';
import useRemoveCartList from 'hooks/cartCRUD/useRemoveCartList';
import useGetShoppingSessionById from 'hooks/shoppingSessionCRU/useGetShoppingSessionById';

const fields: OrderFormModel = configs.fields.orders;

const useAddOrder = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const { showMessage } = useMessage();
  const { formData, setFormData, handleChange } = useFormControl<OrderFormModel>(fields);
  const { validationErrors, handleValidate } = useValidation<OrderFormModel>(orderSchema);
  const { handleRemoveCartList } = useRemoveCartList();
  const { handleGetShoppingSessionById } = useGetShoppingSessionById();
  const { record: session }: ShoppingSessionState = useSelector(shoppingSessionStore);
  const { records: cartItems }: CartState = useSelector(cartStore);
  const { user }: AuthState = useSelector(authStore);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      receiverName: user.fullName ?? "",
      receiverAddress: user.homeAddress ?? "",
      phoneNumber: user.phoneNumber ?? "",
    }))
  }, [user, setFormData])

  const orderDetails: OrderDetailFormModel[] = useMemo(() => {
    const discount: string = "0";
    const discountPercentage: string = "0";
  
    return cartItems?.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      discount: discount,
      discountPercentage: discountPercentage,
      unitPrice: item.productPrice as string,
      totalPrice: item.productPrice as string
    }))
  }, [cartItems]);

  const newFormData: OrderFormModel = useMemo(() => {
    return {
      ...formData,
      userId: user.id,
      sessionId: session.id,
      totalAmount: NumberHelper.toDecimalString(session.totalPrice),
      quantity: session.quantity,
      orderDetails: orderDetails
    }
  }, [orderDetails, formData, user.id, session]);

  const handleAddOrder = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const isValid: boolean = await handleValidate(newFormData);
    if (!isValid) return;

    const action = await dispatch(addOrder({ formData: newFormData }));
    if (addOrder.fulfilled.match(action)) {
      handleRemoveCartList();
      setTimeout(() => handleGetShoppingSessionById(session.id), 250);
      navigate(configs.routes.customer.product.root);
    }
    
    showMessage(action.payload?.isSuccess, action.payload?.message);
  };

  return {
    formData,
    validationErrors,
    handleChange,
    handleAddOrder,
  };
};

export default useAddOrder;
