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

type IdType = number | string | null | undefined;

export const useFetchCustomers = () =>
  useApiDataList<CustomerType[]>({
    endpointUrl: endpoints.customers,
  });

export const useRefreshCustomers = () => {
  const { mutate } = useApiRefreshData();

  return () => mutate(`${endpoints.customers}`);
};

export const useFetchCustomer = (customerId: IdType) =>
  useApiData<CustomerType>({
    endpointUrl: customerId
      ? `${endpoints.customers}/${customerId}`
      : undefined,
  });

export const useRefreshCustomer = () => {
  const { mutate } = useApiRefreshData();

  return (customerId: IdType) => mutate(`${endpoints.customers}/${customerId}`);
};

export const usePostCustomer = () => {
  const apiRequest = useApiRequest();
  return async (
    customer: CustomerCreateType
  ): Promise<ApiResponse<CustomerType>> => {
    const { customerId, ...rest } = customer;
    const requestOptions: OptionsType = {
      body: JSON.stringify(rest),
      method: customerId ? 'PUT' : 'POST',
    };
    const url = customerId
      ? `${endpoints.customers}/${customerId ?? ''}`
      : endpoints.customers;

    return apiRequest<CustomerType>(url, requestOptions);
  };
};

export const useDeleteCustomer = () => {
  const apiRequest = useApiRequest();
  return async (customerId: IdType): Promise<ApiResponse<unknown>> => {
    const requestOptions: OptionsType = {
      method: 'DELETE',
    };
    return apiRequest(`${endpoints.customers}/${customerId}`, requestOptions);
  };
};
