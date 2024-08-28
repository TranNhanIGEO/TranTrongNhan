import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';

import { authStore } from 'stores/auth/authSlice';
import { AuthState } from 'stores/auth/authStateTypes';
import { ShoppingSessionFormModel } from 'models/DTOs/shoppingSessionModel';
import { AppDispatch } from 'stores/store';
import { editShoppingSession } from 'stores/shoppingSession/shoppingSessionThunks';
import { ShoppingSessionState } from 'stores/shoppingSession/shoppingSessionStateTypes';
import { shoppingSessionStore } from 'stores/shoppingSession/shoppingSessionSlice';

const useEditShoppingSession = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user }: AuthState = useSelector(authStore);
  const { record }: ShoppingSessionState = useSelector(shoppingSessionStore);

  const handleEditShoppingSession = useCallback(() => {
    const formData: ShoppingSessionFormModel = { userId: user.id };
    dispatch(editShoppingSession({ id: record.id, formData }));
  }, [record.id, user.id, dispatch]);

  return {
    handleEditShoppingSession,
  };
};

export default useEditShoppingSession;
