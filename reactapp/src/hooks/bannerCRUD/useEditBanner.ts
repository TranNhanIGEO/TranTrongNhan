import { useDispatch } from 'react-redux';
import { FormEvent, useEffect } from 'react';
import { AxiosInstance } from 'axios';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { BannerFormModel } from 'models/DTOs/bannerModel';
import { AppDispatch } from 'stores/store';
import { editBanner } from 'stores/banner/bannerThunks';
import configs from 'configs';

import useValidation from 'hooks/common/useValidation';
import useAxiosJWT from 'hooks/auth/useAxiosJWT';
import useMessage from 'hooks/common/useMessage';
import useGetBannerById from './useGetBannerById';
import useFormControl from 'components/Form/hooks/useFormControl';
import { bannerSchema } from 'validators/bannerValidator';

const useEditBanner = (id?: string) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const axiosJWT: AxiosInstance = useAxiosJWT();
  const { showMessage } = useMessage();
  const { record } = useGetBannerById(id);
  const { formData, setFormData, handleChange } = useFormControl<BannerFormModel>(record);
  const { validationErrors, handleValidate } = useValidation<BannerFormModel>(bannerSchema);

  const handleEditBanner = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;
    const isValid: boolean = await handleValidate(formData);
    if (!isValid) return;
    const action = await dispatch(editBanner({ id, formData, axiosJWT }));
    if (editBanner.fulfilled.match(action)) navigate(configs.routes.admin.banner.root);
    showMessage(action.payload?.isSuccess, action.payload?.message);
  };

  useEffect(() => {
    setFormData({
      categoryId: record.categoryId ?? "",
      image: record.image ?? "",
      file: undefined,
    })
  }, [record, setFormData])

  return {
    formData,
    validationErrors,
    setFormData,
    handleChange,
    handleEditBanner,
  };
};

export default useEditBanner;
