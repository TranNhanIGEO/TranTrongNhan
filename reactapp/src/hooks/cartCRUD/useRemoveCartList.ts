import { useDispatch, useSelector } from 'react-redux';
import { AxiosInstance } from 'axios';

import { shoppingSessionStore } from 'stores/shoppingSession/shoppingSessionSlice';
import { ShoppingSessionState } from 'stores/shoppingSession/shoppingSessionStateTypes';
import { AppDispatch } from 'stores/store';
import { removeCartList } from 'stores/cart/cartThunks';

import useAxiosJWT from 'hooks/auth/useAxiosJWT';
import useMessage from 'hooks/common/useMessage';

const useRemoveCartList = () => {
  const { record: session }: ShoppingSessionState = useSelector(shoppingSessionStore);
  const dispatch: AppDispatch = useDispatch();
  const axiosJWT: AxiosInstance = useAxiosJWT();
  const { showMessage } = useMessage();

  const handleRemoveCartList = async () => {
    const action = await dispatch(removeCartList({ id: session.id, axiosJWT }));
    showMessage(action.payload?.isSuccess, action.payload?.message);
  };

  return {
    handleRemoveCartList,
  };
};

export default useRemoveCartList;
