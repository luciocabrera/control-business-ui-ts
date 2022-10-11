import type { ReactNode } from 'types';

export type ToastType = {
  id: number;
  title: string;
  description: ReactNode;
  backgroundColor: string;
  icon: string;
};

export type ToastTypeType = 'success' | 'danger' | 'info' | 'warning' | 'error';
