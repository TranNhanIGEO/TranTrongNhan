import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { NavigateFunction, useNavigate, useSearchParams } from 'react-router-dom';

import { AppDispatch } from 'stores/store';
import { ConfirmEmailModel } from 'models/DTOs/authModel';
import { confirmEmail } from 'stores/auth/authThunks';

import StringHelper from 'helpers/stringHelper';
import configs from 'configs';
import useMessage from 'hooks/common/useMessage';
import useValidation from 'hooks/common/useValidation';
import { confirmEmailSchema } from 'validators/authValidator';

const useConfirmEmail = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const { showMessage } = useMessage();
  const { handleValidate } = useValidation(confirmEmailSchema);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleConfirmEmail = useCallback(async () => {
    const formData: ConfirmEmailModel = StringHelper.toObject(searchParams);
    setSearchParams();
    const isValid = await handleValidate(formData);
    if (!isValid) return;
    const action = await dispatch(confirmEmail({ formData }));
    if (confirmEmail.fulfilled.match(action)) navigate(configs.routes.auth.login);
    showMessage(action.payload?.isSuccess, action.payload?.message);
  }, [searchParams, setSearchParams, handleValidate, dispatch, navigate, showMessage]);

  return {
    handleConfirmEmail,
  };
};

export default useConfirmEmail;
