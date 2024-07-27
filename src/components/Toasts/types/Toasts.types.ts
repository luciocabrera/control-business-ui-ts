import { ReactNode } from 'react';

export type TToastProps = {
  position?: string;
};

export type TToasts = {
  toasts?: TToast[];
};

export type TToast = {
  id: number;
  title: string;
  description: ReactNode;
  backgroundColor: string;
  icon: string;
};

export type TToastType = 'danger' | 'error' | 'info' | 'success' | 'warning';
