// components
import { Toast } from 'components';
// hooks
import { useContextSelector, useCallback, useEffect, useState } from 'hooks';
// utilities
import { getToast, createContext } from 'utilities';
// types
import type { ReactNode, ToastType, ToastTypeType } from 'types';

type ToastContextType = {
  addToast: (type: ToastTypeType, description: ReactNode, title: string) => void;
  deleteToast: (id: number) => void;
  toasts?: ToastType[];
};
type ToastContextProviderProps = {
  children: ReactNode;
};

const useToastContext = () => {
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const deleteToast = useCallback(
    (id: number) => {
      const toastListItem = toasts.findIndex((e: ToastType) => e.id === id);

      toasts.splice(toastListItem, 1);
      setToasts([...toasts]);
    },
    [toasts],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (toasts.length > 0) {
        deleteToast(toasts[0].id);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [deleteToast, toasts]);

  const addToast = useCallback((type: ToastTypeType, description: ReactNode, title: string) => {
    const toast = getToast(description, title, type);
    if (toast) setToasts((prev) => [...prev, toast]);
  }, []);

  return {
    toasts,
    addToast: useCallback(addToast, [addToast]),
    deleteToast: useCallback(deleteToast, [deleteToast]),
  };
};

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastContextProvider = ({ children }: ToastContextProviderProps) => (
  <ToastContext.Provider value={useToastContext()}>
    {children}
    <Toast />
  </ToastContext.Provider>
);

export const useAddToast = () => useContextSelector(ToastContext, (s) => s?.addToast);
export const useDeleteToast = () => useContextSelector(ToastContext, (s) => s?.deleteToast);
export const useToasts = () => useContextSelector(ToastContext, (s) => s?.toasts);
