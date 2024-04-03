import type { TVirtualPaddingTdProps } from './VirtualPaddingTd.types';

const VirtualPaddingTd = ({
  columnVirtualizer,
  isLeft = false,
}: TVirtualPaddingTdProps) => {
  //different virtualization strategy for columns - instead of absolute and translateY, we add empty columns to the left and right
  let virtualPaddingLeft: number | undefined;
  let virtualPaddingRight: number | undefined;

  const virtualColumns = columnVirtualizer.getVirtualItems();

  if (columnVirtualizer && virtualColumns?.length) {
    virtualPaddingLeft = virtualColumns[0]?.start ?? 0;
    virtualPaddingRight =
      columnVirtualizer.getTotalSize() -
      (virtualColumns[virtualColumns.length - 1]?.end ?? 0);
  }
  if (isLeft && !virtualPaddingLeft) return null;
  if (!isLeft && !virtualPaddingRight) return null;

  return (
    <td
      style={{
        minWidth: isLeft ? virtualPaddingLeft : virtualPaddingRight,
        width: isLeft ? virtualPaddingLeft : virtualPaddingRight,
      }}
    />
  );
};

export default VirtualPaddingTd;
