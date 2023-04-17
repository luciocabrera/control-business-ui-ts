import type { AuditType } from 'types';

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
  | 'product'
  | 'productNameWithCode'
  | 'productDescription'
  | 'productPrice'
  | 'date'
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
  | 'date'
  | 'invoiceId'
  | 'updatedAt'
  | 'createdAt'
  | 'createdBy'
  | 'updatedBy'
  | 'createdByAlias'
  | 'updatedByAlias'
  | 'customer'
> & {
  invoiceId?: number;
  date?: string;
};

export type InvoiceCreateType = Omit<
  InvoiceType,
  | 'invoiceId'
  | 'updatedAt'
  | 'createdAt'
  | 'customer'
  | 'details'
  | 'date'
  | 'createdByAlias'
  | 'updatedByAlias'
> & {
  date: Date;
  invoiceId?: number;
  customerId: number;
  details: InvoiceDetailCreate[];
};

export type StatsBase = {
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
};

export type InvoicesStats = StatsBase &
  (
    | {
        type: 'daily_current_month';
      }
    | {
        customer?: string;
        type: 'customers_current_month';
      }
    | {
        year?: number | string;
        type: 'yearly';
      }
    | {
        period?: string;
        type: 'monthly';
      }
  );

export type DataRowChart = { date: string; value: number };
