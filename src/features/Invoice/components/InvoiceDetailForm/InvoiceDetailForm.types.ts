import type { InvoicesDetails } from 'types';

export type InvoiceDetailFormProps = {
  detail?: InvoicesDetails;
  onAcceptDetail: (detail: InvoicesDetails) => void;
  onFinish: () => void;
};
