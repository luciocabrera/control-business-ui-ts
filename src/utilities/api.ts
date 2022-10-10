import { OptionsType } from 'types';

export const fetchRequest = async <T>(url: RequestInfo | URL, options?: OptionsType): Promise<T> => {
  const r = await fetch(url, options as RequestInit);

  return processResponse(r);
};

export const execRequest = async <T>(
  url: RequestInfo | URL,
  options?: OptionsType,
): Promise<{
  response: T;
  status: number;
}> => {
  debugger;
  const r = await fetch(url, options as RequestInit);
  const bodyResponse = await processResponse(r);

  return { response: bodyResponse, status: r.status };
};

export const processError = async (r: Response, isApplicationJson: boolean) => {
  let message = '';

  if (isApplicationJson) {
    const resWithError = await r.json();

    message = `${resWithError?.error || ''}  :  ${resWithError?.message || ''}`;
  } else {
    message = getStatusCustomMessage(r.status);
  }

  throw new Error(message);
};

export const processResponse = async (r: Response) => {
  const contentTypesString = r.headers.get('content-type') || '';
  const contentTypes = contentTypesString.split(';');
  const isApplicationJson = contentTypes.includes('application/json');

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
