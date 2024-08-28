import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { AppDispatch } from 'stores/store';
import { getShoppingSessionById } from 'stores/shoppingSession/shoppingSessionThunks';

const useGetShoppingSessionById = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleGetShoppingSessionById = useCallback((id?: string) => {
    if (!id) return;
    dispatch(getShoppingSessionById({ id }));
  }, [dispatch]);

  return {
    handleGetShoppingSessionById
  };
};

export default useGetShoppingSessionById;
