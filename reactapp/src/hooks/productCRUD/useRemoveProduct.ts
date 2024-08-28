import { useDispatch } from 'react-redux';
import { AxiosInstance } from 'axios';

import { AppDispatch } from 'stores/store';
import { removeProduct } from 'stores/product/productThunks';

import useAxiosJWT from 'hooks/auth/useAxiosJWT';
import useMessage from 'hooks/common/useMessage';

const useRemoveProduct = () => {
  const dispatch: AppDispatch = useDispatch();
  const axiosJWT: AxiosInstance = useAxiosJWT();
  const { showMessage } = useMessage();

  const handleRemoveProduct = async (id?: string) => {
    if (!id) return;
    const action = await dispatch(removeProduct({ id, axiosJWT }));
    showMessage(action.payload?.isSuccess, action.payload?.message);
  };

  return {
    handleRemoveProduct,
  };
};

export default useRemoveProduct;
