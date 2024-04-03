import type { Header } from '@tanstack/react-table';

export const getHeaderCalculatedSize = <TData>(
  header: Header<TData, unknown>
): number => {
  const subHeadersLength = header.subHeaders?.length ?? 0;
  const subHeadersPadding =
    subHeadersLength > 0 ? (subHeadersLength - 1) * 1 : 0;

  const subHeadersSizeSum =
    header?.subHeaders?.reduce((sum, current) => {
      const size =
        (current.subHeaders?.length ?? 0) > 0
          ? getHeaderCalculatedSize(current)
          : current.getSize();
      return sum + size;
    }, 0) ?? 0;

  return subHeadersLength > 0
    ? subHeadersSizeSum + subHeadersPadding
    : header.getSize();
};
