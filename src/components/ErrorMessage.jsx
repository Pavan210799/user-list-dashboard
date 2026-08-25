import "./ErrorMessage.css";

function ErrorMessage({
  message,
  onRetry,
}) {
  return (
    <div className="error-message">

      <h2>
        Something went wrong
      </h2>

      <p>
        {message}
      </p>

      <button
        type="button"
        onClick={onRetry}
      >
        Try Again
      </button>

    </div>
  );
}

export default ErrorMessage;