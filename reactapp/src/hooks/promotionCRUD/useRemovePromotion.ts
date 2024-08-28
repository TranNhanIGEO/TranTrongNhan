import { useDispatch } from 'react-redux';
import { AxiosInstance } from 'axios';

import { AppDispatch } from 'stores/store';
import { removePromotion } from 'stores/promotion/promotionThunks';

import useAxiosJWT from 'hooks/auth/useAxiosJWT';
import useMessage from 'hooks/common/useMessage';

const useRemovePromotion = () => {
  const dispatch: AppDispatch = useDispatch();
  const axiosJWT: AxiosInstance = useAxiosJWT();
  const { showMessage } = useMessage();

  const handleRemovePromotion = async (id?: string) => {
    if (!id) return;
    const action = await dispatch(removePromotion({ id, axiosJWT }));
    showMessage(action.payload?.isSuccess, action.payload?.message);
  };

  return {
    handleRemovePromotion,
  };
};

export default useRemovePromotion;
