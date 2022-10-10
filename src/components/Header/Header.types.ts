import type { DetailedHTMLProps, ImgHTMLAttributes, ReactNode } from 'react';

export type HeaderProps = {
  icon?: string;
  title?: string;
  subtitle?: string;
  children?: ReactNode | ReactNode[];
};
