import { memo } from 'react';

const CustomerIcon = memo(({ color = '#03542f' }: { color?: string }) => (
  <svg
    stroke={color}
    fill={color}
    strokeWidth="0"
    height="1em"
    width="1em"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
  </svg>
));

export default CustomerIcon;
