import { useCallback } from 'react';

import { endpoints } from '../configs/configs';
import type {
  ApiResponse,
  CustomerCreateType,
  CustomerType,
  OptionsType,
} from '../types';

import {
  useApiData,
  useApiDataList,
  useApiRefreshData,
  useApiRequest,
} from './useApi';

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
    endpointUrl: customerId
      ? `${endpoints.customers}/${customerId}`
      : undefined,
  });

export const useRefreshCustomer = () => {
  const { mutate } = useApiRefreshData();

  return useCallback(
    (customerId: IdType) => mutate(`${endpoints.customers}/${customerId}`),
    [mutate]
  );
};

export const usePostCustomer = () => {
  const apiRequest = useApiRequest();
  return useCallback(
    async (
      customer: CustomerCreateType
    ): Promise<ApiResponse<CustomerType>> => {
      const { customerId, ...rest } = customer;
      const requestOptions: OptionsType = {
        method: customerId ? 'PUT' : 'POST',
        body: JSON.stringify(rest),
      };
      const url = customerId
        ? `${endpoints.customers}/${customerId ?? ''}`
        : endpoints.customers;

      return apiRequest<CustomerType>(url, requestOptions);
    },
    [apiRequest]
  );
};

export const useDeleteCustomer = () => {
  const apiRequest = useApiRequest();
  return useCallback(
    async (customerId: IdType): Promise<ApiResponse<unknown>> => {
      const requestOptions: OptionsType = {
        method: 'DELETE',
      };
      return apiRequest(`${endpoints.customers}/${customerId}`, requestOptions);
    },
    [apiRequest]
  );
};
