import { memo } from 'react';

const ViewIcon = memo(({ color = 'rgb(157 105 34)' }: { color?: string }) => (
  <svg strokeWidth="5" version="1.1" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" stroke={color} fill="none">
    <g>
      <g>
        <path d="M32,12.625C14.878,12.625,1,32,1,32    s13.878,19.375,31,19.375S63,32,63,32S49.122,12.625,32,12.625z M32,43.625c-6.421,0-11.625-5.204-11.625-11.625    S25.579,20.375,32,20.375S43.625,25.579,43.625,32S38.421,43.625,32,43.625z" />
      </g>
    </g>
  </svg>
));

export default ViewIcon;
