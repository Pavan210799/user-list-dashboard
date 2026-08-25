import "./Loading.css";

function Loading() {
  return (
    <div
      className="loading"
      role="status"
      aria-live="polite"
      aria-label="Loading users"
    >
      <div className="loading-spinner">
        <span></span>
      </div>

      <h2>
        Loading users
      </h2>

      <p>
        Fetching the latest users. Please wait...
      </p>
    </div>
  );
}

export default Loading;