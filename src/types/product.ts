import { AuditType } from 'types';

export type ProductType = AuditType & {
  productId: number;
  name: string;
  code: string;
  description: string;
  nameWithCode: string;
  price: number;
};

export type ProductFormType = Omit<
  ProductType,
  'createdAt' | 'createdBy' | 'productId' | 'updatedAt' | 'updatedBy'
>;

export type ProductCreateType = Omit<
  ProductType,
  'createdAt' | 'createdBy' | 'productId' | 'updatedAt' | 'updatedBy'
> & { productId?: number | string };
