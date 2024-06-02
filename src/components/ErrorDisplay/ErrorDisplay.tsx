type ErrorDisplayProps = {
  errors: string | string[];
};

const ErrorDisplay = ({ errors }: ErrorDisplayProps) =>
  typeof errors === 'string' ? (
    <p>{errors}</p>
  ) : (
    <ul>
      {errors.map((err) => (
        <li key={`list-err-${err}`}>{err}</li>
      ))}
    </ul>
  );

ErrorDisplay.displayName = 'ErrorDisplay';

export default ErrorDisplay;
