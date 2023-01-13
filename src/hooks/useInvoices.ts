// configs
import { endpoints } from '../configs/configs';
// hooks
import { useApiData, useApiDataList, useApiRefreshData, useApiRequest } from './useApi';
// types
import type {
  ApiResponse,
  DailyCurrentMonth,
  InvoiceCreateType,
  InvoicesStats,
  InvoiceType,
  OptionsType,
} from '../types';
// react
import { useCallback } from 'react';
import { parseToNumber } from 'utilities';
// utilities

type IdType = string | number | undefined | null;

export const useFetchInvoices = () =>
  useApiDataList<InvoiceType[]>({
    endpointUrl: endpoints.invoices,
  });

export const useRefreshInvoices = () => {
  const { mutate } = useApiRefreshData();

  return useCallback(() => mutate(`${endpoints.invoices}`), [mutate]);
};

const getAxisValue = ({ type, record }: { type: string; record: InvoicesStats }) => {
  if (type === 'daily_current_month') return new Date(record.date as unknown as string).toLocaleDateString();
  if (type === 'yearly') return record.year?.toString() ?? '';
  if (type === 'monthly') return record.period?.toString() ?? '';

  return '';
};

export const useFetchInvoicesStats = (type: string = 'daily_current_month') =>
  useApiDataList({
    endpointUrl: `${endpoints.invoices}/stats/${type}`,
    transformData: (data: InvoicesStats[]) => {
      const seriesInvoices: DailyCurrentMonth[] = [];
      const seriesSubTotalSum: DailyCurrentMonth[] = [];
      const seriesTaxesSum: DailyCurrentMonth[] = [];
      data.forEach((record: InvoicesStats) => {
        seriesInvoices.push({
          date: getAxisValue({ type, record }),
          value: parseToNumber(record.invoicesCount),
        });
        seriesSubTotalSum.push({
          date: getAxisValue({ type, record }),
          value: parseToNumber(record.subtotalSum),
        });
        seriesTaxesSum.push({
          date: getAxisValue({ type, record }),
          value: parseToNumber(record.taxesSum),
        });
      });
      return {
        invoices: [
          {
            label: 'Invoices',
            data: seriesInvoices,
          },
        ],
        amounts: [
          {
            label: 'Sub Total',
            data: seriesSubTotalSum,
          },
          {
            label: 'Taxes',
            data: seriesTaxesSum,
          },
        ],
      };
    },
  });

export const useFetchInvoice = (invoiceId: IdType) =>
  useApiData<InvoiceType>({
    endpointUrl: invoiceId ? `${endpoints.invoices}/${invoiceId}` : undefined,
  });

export const useRefreshInvoice = () => {
  const { mutate } = useApiRefreshData();

  return useCallback((invoiceId: IdType) => mutate(`${endpoints.invoices}/${invoiceId}`), [mutate]);
};

export const usePostInvoice = () => {
  const apiRequest = useApiRequest();
  return useCallback(
    async (invoice: InvoiceCreateType): Promise<ApiResponse<InvoiceType>> => {
      const { invoiceId, ...rest } = invoice;
      const requestOptions: OptionsType = {
        method: invoice.invoiceId ? 'PUT' : 'POST',
        body: JSON.stringify(rest),
      };
      const url = invoiceId ? `${endpoints.invoices}/${invoiceId ?? ''}` : endpoints.invoices;

      return apiRequest<InvoiceType>(url, requestOptions);
    },
    [apiRequest],
  );
};

export const useDeleteInvoice = () => {
  const apiRequest = useApiRequest();
  return useCallback(
    async (invoiceId: IdType): Promise<ApiResponse<unknown>> => {
      const requestOptions: OptionsType = {
        method: 'DELETE',
      };
      return apiRequest(`${endpoints.invoices}/${invoiceId}`, requestOptions);
    },
    [apiRequest],
  );
};

export const useFetchInvoiceRates = () => 9;
// useApiData<InvoiceType>({
//   endpointUrl: invoiceId ? `${endpoints.invoices}/${invoiceId}` : undefined,
// });
