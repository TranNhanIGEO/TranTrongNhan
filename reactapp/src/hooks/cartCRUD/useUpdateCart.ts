import { useDispatch, useSelector } from 'react-redux';
import { AxiosInstance } from 'axios';
import { ChangeEvent, useState } from 'react';

import { shoppingSessionStore } from 'stores/shoppingSession/shoppingSessionSlice';
import { ShoppingSessionState } from 'stores/shoppingSession/shoppingSessionStateTypes';
import { CartItemFormModel, CartItemViewModel } from 'models/DTOs/cartItemModel';
import { CartState } from 'stores/cart/cartStateTypes';
import { cartStore } from 'stores/cart/cartSlice';
import { AppDispatch } from 'stores/store';
import { addCart, editCart, removeCart } from 'stores/cart/cartThunks';

import useAxiosJWT from 'hooks/auth/useAxiosJWT';
import useMessage from 'hooks/common/useMessage';
import useGetShoppingSessionById from 'hooks/shoppingSessionCRU/useGetShoppingSessionById';

const useUpdateCart = (isCallApi: boolean = true) => {
  const { records }: CartState = useSelector(cartStore);
  const { record: session }: ShoppingSessionState = useSelector(shoppingSessionStore);
  const { handleGetShoppingSessionById } = useGetShoppingSessionById();
  const dispatch: AppDispatch = useDispatch();
  const axiosJWT: AxiosInstance = useAxiosJWT();
  const { showMessage } = useMessage();
  const [initQuantity, setInitQuantity] = useState<number>(1);

  const updateCartItem = async (quantity: number, productId?: string) => {
    const cartItem: CartItemViewModel | undefined = records?.find(record => {
      return record.productId === productId && record.sessionId === session.id;
    });

    const formData: CartItemFormModel = {
      sessionId: session.id,
      productId: productId as string,
      quantity: quantity,
    };

    let action;

    if (!isCallApi) {
      if (!cartItem) {
        action = await dispatch(addCart({ formData, axiosJWT }));
        // if (addCart.fulfilled.match(action)) dispatch(increaseQuantity({ quantity }));
      } else {
        const newFormData = { ...formData, quantity: cartItem.quantity + quantity };
        action = await dispatch(editCart({ id: cartItem.id, formData: newFormData, axiosJWT }));
        // if (editCart.fulfilled.match(action)) dispatch(increaseQuantity({ quantity }));
      }
    } else {
      if (!cartItem) {
        action = await dispatch(addCart({ formData, axiosJWT }));
        // if (addCart.fulfilled.match(action)) dispatch(changeQuantity({ quantity }));
      } else if (quantity > 0) {
        action = await dispatch(editCart({ id: cartItem.id, formData, axiosJWT }));
        // if (editCart.fulfilled.match(action)) dispatch(changeQuantity({ quantity: session.quantity + (quantity - cartItem.quantity) }));
      } else {
        action = await dispatch(removeCart({ id: cartItem.id, axiosJWT }));
        // if (removeCart.fulfilled.match(action)) dispatch(changeQuantity({ quantity }));
      }
    }

    action.payload?.isSuccess && setTimeout(() => handleGetShoppingSessionById(session.id), 250);
    showMessage(action.payload?.isSuccess, action.payload?.message);
  };

  const handleCartClick = async (quantity: number, productId?: string) => {
    isCallApi ? updateCartItem(quantity, productId) : setInitQuantity(quantity);
  };

  const handleCartChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { id: productId, value: quantity } = e.target;
    isCallApi ? updateCartItem(Number(quantity), productId) : setInitQuantity(Number(quantity));
  };

  return {
    initQuantity,
    updateCartItem,
    handleCartClick,
    handleCartChange,
  };
};

export default useUpdateCart;
