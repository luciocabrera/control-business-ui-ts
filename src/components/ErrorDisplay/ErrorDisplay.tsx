import { memo } from 'react';

type ErrorDisplayProps = {
  errors: string | string[];
};

const ErrorDisplay = memo(({ errors }: ErrorDisplayProps) =>
  typeof errors === 'string' ? (
    <p>{errors}</p>
  ) : (
    <ul>
      {errors.map((err, i) => (
        <li key={`list-err-${i}`}>{err}</li>
      ))}
    </ul>
  ),
);

export default ErrorDisplay;
