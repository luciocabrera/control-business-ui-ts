import type { AuditType, CustomerType, DateParameterType } from 'types';

type InvoiceCustomerType = Pick<CustomerType, 'documentId' | 'fullNameWithInitials' | 'documentTypeName' | 'titleName'>;

export type ProductInvoicesDetails = {
  productNameWithCode: string;
  productDescription: string;
  productPrice: number;
};

export type InvoicesDetails = {
  date: DateParameterType;
  productId: number;
  description: string;
  quantity: number;
  priceUnit: number;
  priceQuantity: number;
} & ProductInvoicesDetails;

export type CreateInvoiceDetail = Omit<
  InvoicesDetails,
  'product' | 'productNameWithCode' | 'productDescription' | 'productPrice'
>;

export type InvoiceType = AuditType & {
  invoiceId: number;
  invoice: string;
  customerId: number;
  customer: InvoiceCustomerType;
  invoiceDetails: InvoicesDetails[];
  date: Date;
  subtotal: number;
  total: number;
  taxes: number;
  taxesPercentage: number;
};

export type InvoiceFormType = Omit<
  InvoiceType,
  'date' | 'invoiceId' | 'updatedAt' | 'createdAt' | 'createdBy' | 'updatedBy'
> & {
  invoiceId?: number;
  date?: Date;
};

export type InvoiceCreateType = Omit<
  InvoiceType,
  'invoiceId' | 'updatedAt' | 'createdAt' | 'createdBy' | 'updatedBy' | 'customer' | 'invoiceDetails'
> & { invoiceId?: number; customerId: number; invoiceDetails: CreateInvoiceDetail[] };
