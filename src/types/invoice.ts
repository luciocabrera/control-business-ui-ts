import type { AuditType } from 'types';

export type ProductInvoicesDetails = {
  productNameWithCode: string;
  productDescription: string;
  productPrice: number;
};

export type InvoicesDetails = ProductInvoicesDetails & {
  date: string;
  productId: number;
  description: string;
  quantity: number;
  priceUnit: number;
  priceQuantity: number;
};

export type InvoiceDetailForm = Omit<
  InvoicesDetails,
  'product' | 'productDescription' | 'productNameWithCode' | 'productPrice'
>;

export type InvoiceDetailCreate = Omit<
  InvoicesDetails,
  | 'date'
  | 'product'
  | 'productDescription'
  | 'productNameWithCode'
  | 'productPrice'
> & { date: Date };

export type InvoiceType = AuditType & {
  invoiceId: number;
  invoice: string;
  customerId: number;
  customer: string;
  details: InvoicesDetails[];
  date: string;
  subtotal: number;
  total: number;
  taxes: number;
  taxesPercentage: number;
};

export type InvoiceFormType = Omit<
  InvoiceType,
  | 'createdAt'
  | 'createdBy'
  | 'createdByAlias'
  | 'customer'
  | 'date'
  | 'invoiceId'
  | 'updatedAt'
  | 'updatedBy'
  | 'updatedByAlias'
> & {
  invoiceId?: number;
  date?: string;
};

export type InvoiceCreateType = Omit<
  InvoiceType,
  | 'createdAt'
  | 'createdByAlias'
  | 'customer'
  | 'date'
  | 'details'
  | 'invoiceId'
  | 'updatedAt'
  | 'updatedByAlias'
> & {
  date: Date;
  invoiceId?: number;
  customerId: number;
  details: InvoiceDetailCreate[];
};

export type StatsBase = {
  period?: string;
  date?: Date | string;
  subtotalSum: number;
  totalSum: number;
  taxesSum: number;
  quantitySum: number;
  subtotalMin: number;
  totalMin: number;
  taxesMin: number;
  subtotalMax: number;
  totalMax: number;
  taxesMax: number;
  subtotalAvg: number;
  totalAvg: number;
  taxesAvg: number;
  invoicesCount: number;
  invoicesMin: number;
  invoicesMax: number;
  type:
    | 'customers_current_month'
    | 'daily_current_month'
    | 'monthly'
    | 'quarter'
    | 'yearly';
};

export type InvoicesStats = StatsBase;

export type DataRowChart = { date: string; value: number };
