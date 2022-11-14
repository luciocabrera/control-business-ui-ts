import type { AuditType, CustomerType, DateParameterType } from 'types';

type InvoiceCustomerType = Pick<CustomerType, 'documentId' | 'fullNameWithInitials' | 'documentTypeName' | 'titleName'>;

export type ProductInvoicesDetails = {
  productNameWithCode: string;
  productDescription: string;
  productPrice: number;
};

export type InvoicesDetails = {
  date: string;
  productId: number;
  description: string;
  quantity: number;
  priceUnit: number;
  priceQuantity: number;
} & ProductInvoicesDetails;

export type InvoiceDetailForm = Omit<
  InvoicesDetails,
  'product' | 'productNameWithCode' | 'productDescription' | 'productPrice'
>;

export type InvoiceDetailCreate = Omit<
  InvoicesDetails,
  'product' | 'productNameWithCode' | 'productDescription' | 'productPrice' | 'date'
> & { date: Date };

export type InvoiceType = AuditType & {
  invoiceId: number;
  invoice: string;
  customerId: number;
  customer: InvoiceCustomerType;
  invoiceDetails: InvoicesDetails[];
  date: string;
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
  date?: string;
};

export type InvoiceCreateType = Omit<
  InvoiceType,
  'invoiceId' | 'updatedAt' | 'createdAt' | 'createdBy' | 'updatedBy' | 'customer' | 'invoiceDetails' | 'date'
> & { date: Date; invoiceId?: number; customerId: number; invoiceDetails: InvoiceDetailCreate[] };
