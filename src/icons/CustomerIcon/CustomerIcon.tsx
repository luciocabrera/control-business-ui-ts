const CustomerIcon = ({ color = '#03542f' }: { color?: string }) => (
  <svg
    fill={color}
    height='1em'
    stroke={color}
    strokeWidth='0'
    viewBox='0 0 16 16'
    width='1em'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'></path>
  </svg>
);

CustomerIcon.displayName = 'CustomerIcon';

export default CustomerIcon;
