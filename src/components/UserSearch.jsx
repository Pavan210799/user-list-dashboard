import "./UserSearch.css";

function UserSearch({
  searchTerm,
  setSearchTerm,
  onRefresh,
  loading,
  userCount,
}) {
  return (
    <section className="search-section">

      <div className="search-controls">

        <input
          type="text"
          placeholder="Search by name, username, email or company..."
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(event.target.value)
          }
          aria-label="Search by name, username, email or company"
        />

        <button
          className="refresh-button"
          onClick={onRefresh}
          disabled={loading}
          aria-label="Refresh users"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 11A8.1 8.1 0 0 0 5.5 6.5L3 9"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M3 4V9H8"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M4 13A8.1 8.1 0 0 0 18.5 17.5L21 15"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M21 20V15H16"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          Refresh
        </button>

      </div>

      <div className="total-users">

        <span>
          {searchTerm
            ? "Matching Users"
            : "Total Users"}
        </span>

        <strong>
          {userCount}
        </strong>

      </div>

    </section>
  );
}

export default UserSearch;