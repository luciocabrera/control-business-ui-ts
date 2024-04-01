import { useCallback } from 'react';

import { endpoints } from '../configs/configs';
import type {
  ApiResponse,
  InvoiceCreateType,
  InvoicesStats,
  InvoiceType,
  OptionsType,
} from '../types';

import {
  useApiData,
  useApiDataList,
  useApiRefreshData,
  useApiRequest,
} from './useApi';

type IdType = number | string;

export const useFetchInvoices = () =>
  useApiDataList<InvoiceType[]>({
    endpointUrl: endpoints.invoices,
  });

export const useRefreshInvoices = () => {
  const { mutate } = useApiRefreshData();

  return useCallback(() => mutate(`${endpoints.invoices}`), [mutate]);
};

export const useFetchInvoicesStatsNew = (type = 'daily_current_month') => {
  console.log('useFetchInvoicesStatsNew', { type });

  return useApiDataList<InvoicesStats[]>({
    endpointUrl: `${endpoints.invoices}/stats/${type}`,
  });
};

export const useFetchInvoicesStatsNewCallback = () => {
  const { mutate } = useApiRefreshData();

  return useCallback(
    (type = 'daily_current_month') =>
      mutate(`${endpoints.invoices}/stats/${type}`),
    [mutate]
  );
};

export const useFetchInvoice = (invoiceId?: IdType) =>
  useApiData<InvoiceType>({
    endpointUrl: invoiceId ? `${endpoints.invoices}/${invoiceId}` : undefined,
  });

export const useRefreshInvoice = () => {
  const { mutate } = useApiRefreshData();

  return useCallback(
    (invoiceId?: IdType) =>
      invoiceId ? mutate(`${endpoints.invoices}/${invoiceId}`) : undefined,
    [mutate]
  );
};

export const usePostInvoice = () => {
  const apiRequest = useApiRequest();
  return useCallback(
    async (invoice: InvoiceCreateType): Promise<ApiResponse<InvoiceType>> => {
      const { invoiceId, ...rest } = invoice;
      const requestOptions: OptionsType = {
        body: JSON.stringify(rest),
        method: invoice.invoiceId ? 'PUT' : 'POST',
      };
      const url = invoiceId
        ? `${endpoints.invoices}/${invoiceId ?? ''}`
        : endpoints.invoices;

      return apiRequest<InvoiceType>(url, requestOptions);
    },
    [apiRequest]
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
    [apiRequest]
  );
};

export const useFetchInvoiceRates = () => 9;
// useApiData<InvoiceType>({
//   endpointUrl: invoiceId ? `${endpoints.invoices}/${invoiceId}` : undefined,
// });
