import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';

import { authStore } from 'stores/auth/authSlice';
import { AuthState } from 'stores/auth/authStateTypes';
import { ShoppingSessionFormModel } from 'models/DTOs/shoppingSessionModel';
import { AppDispatch } from 'stores/store';
import { addShoppingSession } from 'stores/shoppingSession/shoppingSessionThunks';

const useAddShoppingSession = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user }: AuthState = useSelector(authStore);

  const handleAddShoppingSession = useCallback(() => {
    const formData: ShoppingSessionFormModel = { userId: user.id };
    dispatch(addShoppingSession({ formData }));
  }, [user.id, dispatch]);

  return {
    handleAddShoppingSession,
  };
};

export default useAddShoppingSession;
