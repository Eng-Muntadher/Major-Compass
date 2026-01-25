interface ErrorAlertProps {
  message: string;
}

export default function ErrorAlert({ message }: ErrorAlertProps) {
  if (!message) return null;

  return (
    <div
      className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
      role="alert"
      aria-live="assertive"
    >
      {message}
    </div>
  );
}
