import { ToastProviderProps } from "components/UI/types/toastTypes";
import { ToastActions, ToastState } from "stores/toast/toastStateTypes";
import { createContext, useReducer, Dispatch } from "react";
import toastReducer, { initState } from "stores/toast/toastSlice";

export const ToastStateContext = createContext<ToastState | undefined>(undefined);
export const ToastDispatchContext = createContext<Dispatch<ToastActions> | undefined>(undefined);


const AppToastProvider = ({ children }: ToastProviderProps) => {
  const [state, dispatch] = useReducer(toastReducer, initState);

  return (
    <ToastStateContext.Provider value={state}>
      <ToastDispatchContext.Provider value={dispatch}>
        {children}
      </ToastDispatchContext.Provider>
    </ToastStateContext.Provider>
  );
};

export default AppToastProvider;