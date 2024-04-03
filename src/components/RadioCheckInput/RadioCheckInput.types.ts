import type { ChangeEventHandler } from 'react';

export type TRadioCheckInputProps = {
  checked: boolean;
  label?: string;
  name: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  type?: string;
};
