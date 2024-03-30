// components
// types
import type { CellContext, InvoiceType } from 'types';
// utilities
import { getFormattedNumber } from 'utilities';

import { DateDisplay } from 'components';

import TableActions from '../components/TableActions';

export const getDateCell = ({
  row: {
    original: { date },
  },
}: CellContext<InvoiceType, unknown>) => <DateDisplay date={date} />;

export const getTotalCell = ({
  row: {
    original: { total },
  },
}: CellContext<InvoiceType, unknown>) => getFormattedNumber(total, 'currency');

export const getSubTotalCell = ({
  row: {
    original: { subtotal },
  },
}: CellContext<InvoiceType, unknown>) =>
  getFormattedNumber(subtotal, 'currency');

export const getTaxesCell = ({
  row: {
    original: { taxes },
  },
}: CellContext<InvoiceType, unknown>) => getFormattedNumber(taxes, 'currency');

export const getActionsCell = ({
  row: {
    original: { invoiceId },
  },
}: CellContext<InvoiceType, unknown>) => <TableActions invoiceId={invoiceId} />;
