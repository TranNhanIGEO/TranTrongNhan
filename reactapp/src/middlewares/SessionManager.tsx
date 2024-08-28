import { FC, Fragment, ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { shoppingSessionStore } from 'stores/shoppingSession/shoppingSessionSlice';
import { ShoppingSessionState } from 'stores/shoppingSession/shoppingSessionStateTypes';
import useAddShoppingSession from 'hooks/shoppingSessionCRU/useAddShoppingSession';
import useGetShoppingSessionById from 'hooks/shoppingSessionCRU/useGetShoppingSessionById';

const SessionManager: FC<{ children: ReactNode }> = ({ children }) => {
  const { handleAddShoppingSession } = useAddShoppingSession();
  const { handleGetShoppingSessionById } = useGetShoppingSessionById();
  const { record }: ShoppingSessionState = useSelector(shoppingSessionStore);

  useEffect(() => {
    if (record.id) {
      handleGetShoppingSessionById(record.id)
    } else {
      handleAddShoppingSession();
    }
  }, [record.id, handleGetShoppingSessionById, handleAddShoppingSession]);

  return <Fragment>{children}</Fragment>;
};

export default SessionManager;
