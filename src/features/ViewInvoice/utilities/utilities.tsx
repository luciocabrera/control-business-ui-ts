import type { CellContext, InvoicesDetails } from 'types';

import { DateDisplay, NumericDisplay } from 'components';

export const getDateCell = ({
  row: {
    original: { date },
  },
}: CellContext<InvoicesDetails, unknown>) => <DateDisplay date={date} />;

export const getQuantityCell = ({
  row: {
    original: { quantity },
  },
}: CellContext<InvoicesDetails, unknown>) => (
  <NumericDisplay
    value={quantity}
    output='number'
  />
);

export const getPriceUnitCell = ({
  row: {
    original: { priceUnit },
  },
}: CellContext<InvoicesDetails, unknown>) => (
  <NumericDisplay
    value={priceUnit}
    output='currency'
  />
);

export const getPriceQuantityCell = ({
  row: {
    original: { priceQuantity },
  },
}: CellContext<InvoicesDetails, unknown>) => (
  <NumericDisplay
    value={priceQuantity}
    output='currency'
  />
);
