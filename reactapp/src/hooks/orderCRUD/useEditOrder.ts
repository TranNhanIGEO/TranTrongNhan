import { useDispatch } from 'react-redux';
import { FormEvent, useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { orderSchema } from 'validators/orderValidator';
import { OrderFormModel } from 'models/DTOs/orderModel';
import { AppDispatch } from 'stores/store';
import { editOrder } from 'stores/order/orderThunks';
import configs from 'configs';

import useValidation from 'hooks/common/useValidation';
import useMessage from 'hooks/common/useMessage';
import useGetOrderById from './useGetOrderById';
import useFormControl from 'components/Form/hooks/useFormControl';

const useEditOrder = (id?: string) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const { showMessage } = useMessage();
  const { record } = useGetOrderById(id);
  const { formData, setFormData, handleChange } = useFormControl<OrderFormModel>(record);
  const { validationErrors, handleValidate } = useValidation<OrderFormModel>(orderSchema);

  const handleEditOrder = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;
    const isValid: boolean = await handleValidate(formData);
    if (!isValid) return;
    const action = await dispatch(editOrder({ id, formData }));
    if (editOrder.fulfilled.match(action)) navigate(configs.routes.admin.order.root);
    showMessage(action.payload?.isSuccess, action.payload?.message);
  };

  useEffect(() => {
    setFormData({
      userId: record.userId ?? undefined,
      sessionId: record.sessionId ?? '',
      receiverName: record.receiverName ?? '',
      receiverAddress: record.receiverAddress ?? '',
      phoneNumber: record.phoneNumber ?? '',
      totalAmount: record.totalAmount ?? '',
      quantity: record.quantity ?? '',
      note: record.note ?? undefined,
      orderDetails: record.orderDetails ?? []
    });
  }, [record, setFormData]);

  return {
    formData,
    validationErrors,
    handleChange,
    handleEditOrder,
  };
};

export default useEditOrder;
