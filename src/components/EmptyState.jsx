import "./EmptyState.css";

function EmptyState() {
  return (
    <div
      className="empty-state"
      role="status"
      aria-live="polite"
    >

      {/* =================================================
          EMPTY ICON
      ================================================= */}

      <div
        className="empty-state-icon"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="3"
            y="4"
            width="18"
            height="16"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.7"
          />

          <path
            d="M8 9H16"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />

          <path
            d="M8 13H13"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />

          <path
            d="M8 17H11"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      </div>


      {/* =================================================
          CONTENT
      ================================================= */}

      <h2>
        No Users Found
      </h2>

      <p>
        There are no users available to display.
      </p>

    </div>
  );
}

export default EmptyState;