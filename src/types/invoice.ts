import { AuditType, CustomerType } from 'types';

type InvoiceCustomerType = Pick<
  CustomerType,
  'documentId' | 'initials' | 'firstName' | 'lastName' | 'documentTypeName' | 'titleName'
>;

export type InvoicesDetails = {
  productId: number;
  product: { code: string; name: string };
  quantity: number;
  priceUnit: number;
  priceQuantity: number;
};

export type InvoiceType = AuditType & {
  invoiceId: number;
  invoice: string;
  customerId: number;
  customer: InvoiceCustomerType;
  invoicesDetails: InvoicesDetails[];
  date: Date;
  subtotal: number;
  total: number;
  taxes: number;
  taxesPercentage: number;
};

export type InvoiceFormType = Omit<InvoiceType, 'invoiceId' | 'updatedAt' | 'createdAt' | 'createdBy' | 'updatedBy'>;
// InvoiceCustomerType;

export type InvoiceCreateType = Omit<
  InvoiceType,
  'invoiceId' | 'updatedAt' | 'createdAt' | 'createdBy' | 'updatedBy' | 'customer'
> & { invoiceId?: string | number; customerId: number };
