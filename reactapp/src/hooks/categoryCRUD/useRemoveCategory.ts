import { useDispatch } from 'react-redux';
import { AxiosInstance } from 'axios';

import { AppDispatch } from 'stores/store';
import { removeCategory } from 'stores/category/categoryThunks';

import useAxiosJWT from 'hooks/auth/useAxiosJWT';
import useMessage from 'hooks/common/useMessage';

const useRemoveCategory = () => {
  const dispatch: AppDispatch = useDispatch();
  const axiosJWT: AxiosInstance = useAxiosJWT();
  const { showMessage } = useMessage();

  const handleRemoveCategory = async (id?: string) => {
    if (!id) return;
    const action = await dispatch(removeCategory({ id, axiosJWT }));
    showMessage(action.payload?.isSuccess, action.payload?.message);
  };

  return {
    handleRemoveCategory,
  };
};

export default useRemoveCategory;
