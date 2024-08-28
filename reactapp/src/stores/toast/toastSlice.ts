import { ToastProps } from 'components/UI/types/toastTypes';
import { ToastActions, ToastState } from "stores/toast/toastStateTypes";
import { ADD_TOAST, REMOVE_TOAST } from 'constants/toast';

const toastSlice = {
  initialState: {
    toasts: [],
  } as ToastState,

  actions: {
    setAddToast: (payload: ToastProps): ToastActions => {
      return { type: ADD_TOAST, payload };
    },

    setRemoveToast: (payload: string): ToastActions => {
      return { type: REMOVE_TOAST, payload };
    },
  },

  reducer: (state: ToastState, action: ToastActions): ToastState => {
    switch (action.type) {
      case ADD_TOAST:
        return { ...state, toasts: [...state.toasts, action.payload] };
      case REMOVE_TOAST:
        return { ...state, toasts: state.toasts.filter(el => el.id !== action.payload) };
      default:
        throw new Error('Invalid action');
    }
  },
};

export const initState = toastSlice.initialState;
export const { setAddToast, setRemoveToast } = toastSlice.actions;
export default toastSlice.reducer;
