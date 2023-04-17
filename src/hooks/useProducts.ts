import { useCallback } from 'react';
import type {
  ApiResponse,
  OptionsType,
  ProductCreateType,
  ProductType,
} from 'types';

import { endpoints } from '../configs/configs';

import {
  useApiData,
  useApiDataList,
  useApiRefreshData,
  useApiRequest,
} from './useApi';

type IdType = string | number;

export const useFetchProducts = () =>
  useApiDataList<ProductType[]>({
    endpointUrl: endpoints.products,
  });

export const useRefreshProducts = () => {
  const { mutate } = useApiRefreshData();

  return useCallback(() => mutate(`${endpoints.products}`), [mutate]);
};

export const useFetchProduct = (productId: IdType) =>
  useApiData<ProductType>({
    endpointUrl: productId ? `${endpoints.products}/${productId}` : undefined,
  });

export const useRefreshProduct = (productId: IdType) => {
  const { mutate } = useApiRefreshData();

  return useCallback(
    () => mutate(`${endpoints.products}/${productId}`),
    [productId, mutate]
  );
};

export const usePostProduct = () => {
  const apiRequest = useApiRequest();
  return useCallback(
    async (product: ProductCreateType): Promise<ApiResponse<ProductType>> => {
      const requestOptions: OptionsType = {
        method: product.productId ? 'POST' : 'PATCH',
        body: JSON.stringify(product),
      };
      const url = product.productId
        ? endpoints.products
        : `${endpoints.products}/${product.productId ?? ''}`;

      return apiRequest<ProductType>(url, requestOptions);
    },
    [apiRequest]
  );
};
