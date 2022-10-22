import { AuditType } from 'types';

export type ProductType = AuditType & {
  productId: number;
  name: string;
  code: string;
  description: string;
  nameWithCode: string;
  price: number;
};

export type ProductFormType = Omit<ProductType, 'productId' | 'updatedAt' | 'createdAt' | 'createdBy' | 'updatedBy'>;

export type ProductCreateType = Omit<
  ProductType,
  'productId' | 'updatedAt' | 'createdAt' | 'createdBy' | 'updatedBy'
> & { productId?: string | number };
