import { useDispatch } from 'react-redux';
import { FormEvent } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { AxiosInstance } from 'axios';

import { newsSchema } from 'validators/newsValidator';
import { NewsFormModel } from 'models/DTOs/newsModel';
import { AppDispatch } from 'stores/store';
import { addNews } from 'stores/news/newsThunks';
import configs from 'configs';

import useValidation from 'hooks/common/useValidation';
import useAxiosJWT from 'hooks/auth/useAxiosJWT';
import useMessage from 'hooks/common/useMessage';
import useFormControl from 'components/Form/hooks/useFormControl';

const fields: NewsFormModel = configs.fields.news;

const useAddNews = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const axiosJWT: AxiosInstance = useAxiosJWT();
  const { showMessage } = useMessage();
  const { formData, setFormData, handleChange } = useFormControl<NewsFormModel>(fields);
  const { validationErrors, handleValidate } = useValidation<NewsFormModel>(newsSchema);

  const handleAddNews = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid: boolean = await handleValidate(formData);
    if (!isValid) return;
    const action = await dispatch(addNews({ formData, axiosJWT }));
    if (addNews.fulfilled.match(action)) navigate(configs.routes.admin.news.root);
    showMessage(action.payload?.isSuccess, action.payload?.message);
  };

  return {
    formData,
    validationErrors,
    setFormData,
    handleChange,
    handleAddNews,
  };
};

export default useAddNews;
