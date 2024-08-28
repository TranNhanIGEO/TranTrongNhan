import { useDispatch } from 'react-redux';
import { FormEvent, useEffect } from 'react';
import { AxiosInstance } from 'axios';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { newsSchema } from 'validators/newsValidator';
import { NewsFormModel } from 'models/DTOs/newsModel';
import { AppDispatch } from 'stores/store';
import { editNews } from 'stores/news/newsThunks';
import configs from 'configs';

import useValidation from 'hooks/common/useValidation';
import useAxiosJWT from 'hooks/auth/useAxiosJWT';
import useMessage from 'hooks/common/useMessage';
import useGetNewsById from './useGetNewsById';
import useFormControl from 'components/Form/hooks/useFormControl';

const useEditNews = (id?: string) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const axiosJWT: AxiosInstance = useAxiosJWT();
  const { showMessage } = useMessage();
  const { record } = useGetNewsById(id);
  const { formData, setFormData, handleChange } = useFormControl<NewsFormModel>(record);
  const { validationErrors, handleValidate } = useValidation<NewsFormModel>(newsSchema);

  const handleEditNews = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;
    const isValid: boolean = await handleValidate(formData);
    if (!isValid) return;
    const action = await dispatch(editNews({ id, formData, axiosJWT }));
    if (editNews.fulfilled.match(action)) navigate(configs.routes.admin.news.root);
    showMessage(action.payload?.isSuccess, action.payload?.message);
  };

  useEffect(() => {
    setFormData({
      categoryId: record.categoryId ?? '',
      title: record.title ?? '',
      summary: record.summary ?? '',
      content: record.content ?? '',
      image: record.image ?? '',
      file: undefined
    });
  }, [record, setFormData]);

  return {
    formData,
    validationErrors,
    setFormData,
    handleChange,
    handleEditNews,
  };
};

export default useEditNews;
