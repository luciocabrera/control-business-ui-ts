import styled from 'styled-components';

import {
  useRef,
  useEffect,
  useLayoutEffect as useOriginalLayoutEffect
} from 'react';

// Silence silly warning
// https://reactjs.org/link/uselayouteffect-ssr
export const useLayoutEffect =
  typeof window === 'undefined' ? useEffect : useOriginalLayoutEffect;

export function useFocusRef<T extends HTMLOrSVGElement>(isSelected: boolean) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    if (!isSelected) return;
    ref.current?.focus({ preventScroll: true });
  }, [isSelected]);

  return {
    ref,
    tabIndex: isSelected ? 0 : -1
  };
}

const CellExpander = styled.div`
  /* needed on chrome */
  float: right;
  float: inline-end;
  display: table;
  block-size: 100%;
  > span {
    display: table-cell;
    vertical-align: middle;
    cursor: pointer;
  }
`;

type CellExpanderFormatterProps = {
  isCellSelected: boolean;
  expanded: boolean;
  onCellExpand: () => void;
};

export function CellExpanderFormatter({
  isCellSelected,
  expanded,
  onCellExpand
}: CellExpanderFormatterProps) {
  const { ref, tabIndex } = useFocusRef<HTMLSpanElement>(isCellSelected);

  function handleKeyDown(e: React.KeyboardEvent<HTMLSpanElement>) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onCellExpand();
    }
  }

  return (
    <CellExpander>
      <span onClick={onCellExpand} onKeyDown={handleKeyDown}>
        <span ref={ref} tabIndex={tabIndex}>
          {expanded ? '\u25BC' : '\u25B6'}
        </span>
      </span>
    </CellExpander>
  );
}
