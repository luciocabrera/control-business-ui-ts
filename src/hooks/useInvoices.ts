// configs
import { endpoints } from '../configs/configs';
// hooks
import { useApiData, useApiDataList, useApiRefreshData, useApiRequest } from './useApi';
// types
import type { ApiResponse, InvoiceCreateType, InvoiceType, OptionsType } from '../types';
// react
import { useCallback } from 'react';
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
