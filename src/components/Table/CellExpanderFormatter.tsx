import {
  useEffect,
  useLayoutEffect as useOriginalLayoutEffect,
  useRef,
} from 'react';
import styled from 'styled-components';

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
    tabIndex: isSelected ? 0 : -1,
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
  expanded,
  isCellSelected,
  onCellExpand,
}: CellExpanderFormatterProps) {
  const { ref, tabIndex } = useFocusRef<HTMLSpanElement>(isCellSelected);

  function onKeyDown(e: React.KeyboardEvent<HTMLSpanElement>) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onCellExpand();
    }
  }

  return (
    <CellExpander>
      <span
        onClick={onCellExpand}
        onKeyDown={onKeyDown}
      >
        <span
          ref={ref}
          tabIndex={tabIndex}
        >
          {expanded ? '\u25BC' : '\u25B6'}
        </span>
      </span>
    </CellExpander>
  );
}
