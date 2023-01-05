// types
import type { OptionsType } from 'types';

export const fetchRequest = async <T>(url: RequestInfo | URL, options?: OptionsType): Promise<T> => {
  const r = await fetch(url, options as RequestInit);

  return processResponse(r);
};

const getIsApplicationJson = (r: Response): boolean => {
  const contentTypesString = r.headers.get('content-type') || '';
  const contentTypes = contentTypesString.split(';');
  return contentTypes.includes('application/json');
};

export const execRequest = async <T>(
  url: RequestInfo | URL,
  options?: OptionsType,
): Promise<{
  response: T;
  status: number;
}> => {
  const r = await fetch(url, options as RequestInit);
  const bodyResponse = await processResponse(r);

  return { response: bodyResponse, status: r.status };
};

export const execDownload = async (
  url: RequestInfo | URL,
  fileName: string,
  options?: OptionsType,
): Promise<{
  response: Blob;
  status: number;
}> => {
  const r = await fetch(url, options as RequestInit);
  const isApplicationJson = getIsApplicationJson(r);

  if (!r.ok) return processError(r, isApplicationJson);

  const blob = await r.blob();

  // Create blob link to download
  const downloadUrl = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.setAttribute('download', `${fileName}`);

  document.body.appendChild(link);
  link.click();
  link.parentNode?.removeChild(link);

  return { response: blob, status: r.status };
};

export const processError = async (r: Response, isApplicationJson: boolean) => {
  let message = '';

  if (isApplicationJson) {
    const resWithError = await r.json();

    message = `${resWithError?.error || ''}  :  ${resWithError?.message || ''}`;
  } else {
    message = getStatusCustomMessage(r.status);
  }

  const error = new Error(message);

  error.cause = r.status;
  throw error;
};

export const processResponse = async (r: Response) => {
  const isApplicationJson = getIsApplicationJson(r);

  if (!r.ok) return processError(r, isApplicationJson);

  if (isApplicationJson) return r.json();

  return r;
};

const getStatusCustomMessage = (status: number) => {
  switch (status) {
    case 401:
      return 'You should be logged in to execute this action';
    case 403:
      return "You don't have enough privileges to execute this action";
    case 404:
      return 'API endpoint could not be found';
    case 500:
      return 'Something went wrong, please try again later. If this error persists, please reach out';
    default:
      return String(status);
  }
};
