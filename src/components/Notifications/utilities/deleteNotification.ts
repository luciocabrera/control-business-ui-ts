// types
import type { TNotification } from '../types';

export const deleteNotification = ({ id, notifications }: { id: number; notifications: TNotification[] }) => {
  const index = notifications?.findIndex((e: TNotification) => e.id === id);

  if (Number.isInteger(index)) notifications?.splice(index, 1);

  return notifications;
};
