import { useDispatch } from 'react-redux';
import { AxiosInstance } from 'axios';

import { AppDispatch } from 'stores/store';
import { removeFeedback } from 'stores/feedback/feedbackThunks';

import useAxiosJWT from 'hooks/auth/useAxiosJWT';
import useMessage from 'hooks/common/useMessage';

const useRemoveFeedback = () => {
  const dispatch: AppDispatch = useDispatch();
  const axiosJWT: AxiosInstance = useAxiosJWT();
  const { showMessage } = useMessage();

  const handleRemoveFeedback = async (id?: string) => {
    if (!id) return;
    const action = await dispatch(removeFeedback({ id, axiosJWT }));
    showMessage(action.payload?.isSuccess, action.payload?.message);
  };

  return {
    handleRemoveFeedback,
  };
};

export default useRemoveFeedback;
