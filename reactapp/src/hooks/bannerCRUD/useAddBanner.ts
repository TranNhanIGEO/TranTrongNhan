import { useDispatch } from 'react-redux';
import { FormEvent } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { AxiosInstance } from 'axios';

import { BannerFormModel } from 'models/DTOs/bannerModel';
import { AppDispatch } from 'stores/store';
import { addBanner } from 'stores/banner/bannerThunks';
import configs from 'configs';

import useValidation from 'hooks/common/useValidation';
import useAxiosJWT from 'hooks/auth/useAxiosJWT';
import useMessage from 'hooks/common/useMessage';
import useFormControl from 'components/Form/hooks/useFormControl';
import { bannerSchema } from 'validators/bannerValidator';

const fields: BannerFormModel = configs.fields.banners;

const useAddBanner = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const axiosJWT: AxiosInstance = useAxiosJWT();
  const { showMessage } = useMessage();
  const { formData, setFormData, handleChange } = useFormControl<BannerFormModel>(fields);
  const { validationErrors, handleValidate } = useValidation<BannerFormModel>(bannerSchema);

  const handleAddBanner = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid: boolean = await handleValidate(formData);
    if (!isValid) return;
    const action = await dispatch(addBanner({ formData, axiosJWT }))
    if (addBanner.fulfilled.match(action)) navigate(configs.routes.admin.banner.root);
    showMessage(action.payload?.isSuccess, action.payload?.message);
  };

  return {
    formData,
    validationErrors,
    setFormData,
    handleChange,
    handleAddBanner,
  };
};

export default useAddBanner;
