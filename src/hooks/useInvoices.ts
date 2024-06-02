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

  return () => mutate(`${endpoints.invoices}`);
};

export const useFetchInvoicesStatsNew = (type = 'daily_current_month') => {
  console.log('useFetchInvoicesStatsNew', { type });

  return useApiDataList<InvoicesStats[]>({
    endpointUrl: `${endpoints.invoices}/stats/${type}`,
  });
};

export const useFetchInvoicesStatsNewCallback = () => {
  const { mutate } = useApiRefreshData();

  return (type = 'daily_current_month') =>
    mutate(`${endpoints.invoices}/stats/${type}`);
};

export const useFetchInvoice = (invoiceId?: IdType) =>
  useApiData<InvoiceType>({
    endpointUrl: invoiceId ? `${endpoints.invoices}/${invoiceId}` : undefined,
  });

export const useRefreshInvoice = () => {
  const { mutate } = useApiRefreshData();

  return (invoiceId?: IdType) =>
    invoiceId ? mutate(`${endpoints.invoices}/${invoiceId}`) : undefined;
};

export const usePostInvoice = () => {
  const apiRequest = useApiRequest();
  return async (
    invoice: InvoiceCreateType
  ): Promise<ApiResponse<InvoiceType>> => {
    const { invoiceId, ...rest } = invoice;
    const requestOptions: OptionsType = {
      body: JSON.stringify(rest),
      method: invoice.invoiceId ? 'PUT' : 'POST',
    };
    const url = invoiceId
      ? `${endpoints.invoices}/${invoiceId ?? ''}`
      : endpoints.invoices;

    return apiRequest<InvoiceType>(url, requestOptions);
  };
};

export const useDeleteInvoice = () => {
  const apiRequest = useApiRequest();
  return async (invoiceId: IdType): Promise<ApiResponse<unknown>> => {
    const requestOptions: OptionsType = {
      method: 'DELETE',
    };
    return apiRequest(`${endpoints.invoices}/${invoiceId}`, requestOptions);
  };
};

export const useFetchInvoiceRates = () => 9;
// useApiData<InvoiceType>({
//   endpointUrl: invoiceId ? `${endpoints.invoices}/${invoiceId}` : undefined,
// });
