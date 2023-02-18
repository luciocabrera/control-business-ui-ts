// components
import { DateDisplay, NumberDisplay } from 'components';
// types
import type { CellContext, InvoicesDetails } from 'types';

export const getDateCell = ({
  row: {
    original: { date }
  }
}: CellContext<InvoicesDetails, unknown>) => <DateDisplay date={date} />;

export const getQuantityCell = ({
  row: {
    original: { quantity }
  }
}: CellContext<InvoicesDetails, unknown>) => (
  <NumberDisplay value={quantity} output='number' />
);

export const getPriceUnitCell = ({
  row: {
    original: { priceUnit }
  }
}: CellContext<InvoicesDetails, unknown>) => (
  <NumberDisplay value={priceUnit} output='currency' />
);

export const getPriceQuantityCell = ({
  row: {
    original: { priceQuantity }
  }
}: CellContext<InvoicesDetails, unknown>) => (
  <NumberDisplay value={priceQuantity} output='currency' />
);
