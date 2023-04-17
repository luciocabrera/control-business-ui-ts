// configs
// react
import { useCallback } from 'react';
// types
import type {
  ApiResponse,
  DocumentTypeCreateType,
  DocumentTypeType,
  OptionsType,
} from 'types';

import { endpoints } from '../configs/configs';

// hooks
import {
  useApiData,
  useApiDataList,
  useApiRefreshData,
  useApiRequest,
} from './useApi';
// utilities

type IdType = string | number;

export const useFetchDocumentTypes = () =>
  useApiDataList<DocumentTypeType[]>({
    endpointUrl: endpoints.documentTypes,
  });

export const useRefreshDocumentTypes = () => {
  const { mutate } = useApiRefreshData();

  return useCallback(() => mutate(`${endpoints.documentTypes}`), [mutate]);
};

export const useFetchDocumentType = (documentTypeId: IdType) =>
  useApiData<DocumentTypeType>({
    endpointUrl: documentTypeId
      ? `${endpoints.documentTypes}/${documentTypeId}`
      : undefined,
  });

export const useRefreshDocumentType = (documentTypeId: IdType) => {
  const { mutate } = useApiRefreshData();

  return useCallback(
    () => mutate(`${endpoints.documentTypes}/${documentTypeId}`),
    [documentTypeId, mutate]
  );
};

export const usePostDocumentType = () => {
  const apiRequest = useApiRequest();
  return useCallback(
    async (
      documentType: DocumentTypeCreateType
    ): Promise<ApiResponse<DocumentTypeType>> => {
      const requestOptions: OptionsType = {
        method: documentType.documentTypeId ? 'POST' : 'PATCH',
        body: JSON.stringify(DocumentType),
      };
      const url = documentType.documentTypeId
        ? endpoints.documentTypes
        : `${endpoints.documentTypes}/${documentType.documentTypeId ?? ''}`;

      return apiRequest<DocumentTypeType>(url, requestOptions);
    },
    [apiRequest]
  );
};
