// configs
import { endpoints } from '../configs/configs';
// hooks
import { useApiData, useApiDataList, useApiRefreshData, useApiRequest } from './useApi';
// types
import type { ApiResponse, CustomerCreateType, CustomerType, OptionsType } from '../types';
// react
import { useCallback } from 'react';
// utilities

type IdType = string | number | undefined | null;

export const useFetchCustomers = () =>
  useApiDataList<CustomerType[]>({
    endpointUrl: endpoints.customers,
  });

export const useRefreshCustomers = () => {
  const { mutate } = useApiRefreshData();

  return useCallback(() => mutate(`${endpoints.customers}`), [mutate]);
};

export const useFetchCustomer = (customerId: IdType) =>
  useApiData<CustomerType>({
    endpointUrl: customerId ? `${endpoints.customers}/${customerId}` : undefined,
  });

export const useRefreshCustomer = () => {
  const { mutate } = useApiRefreshData();

  return useCallback((customerId: IdType) => mutate(`${endpoints.customers}/${customerId}`), [mutate]);
};

export const usePostCustomer = () => {
  const apiRequest = useApiRequest();
  return useCallback(
    async (customer: CustomerCreateType): Promise<ApiResponse<CustomerType>> => {
      const requestOptions: OptionsType = {
        method: customer.customerId ? 'PATCH' : 'POST',
        body: JSON.stringify(customer),
      };
      const url = customer.customerId ? `${endpoints.customers}/${customer.customerId ?? ''}` : endpoints.customers;

      return apiRequest<CustomerType>(url, requestOptions);
    },
    [apiRequest],
  );
};
