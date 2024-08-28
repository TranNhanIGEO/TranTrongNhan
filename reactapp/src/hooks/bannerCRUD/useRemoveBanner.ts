import { useDispatch } from 'react-redux';
import { AxiosInstance } from 'axios';

import { AppDispatch } from 'stores/store';
import { removeBanner } from 'stores/banner/bannerThunks';

import useAxiosJWT from 'hooks/auth/useAxiosJWT';
import useMessage from 'hooks/common/useMessage';

const useRemoveBanner = () => {
  const dispatch: AppDispatch = useDispatch();
  const axiosJWT: AxiosInstance = useAxiosJWT();
  const { showMessage } = useMessage();

  const handleRemoveBanner = async (id?: string) => {
    if (!id) return;
    const action = await dispatch(removeBanner({ id, axiosJWT }));
    showMessage(action.payload?.isSuccess, action.payload?.message);
  };

  return {
    handleRemoveBanner,
  };
};

export default useRemoveBanner;
