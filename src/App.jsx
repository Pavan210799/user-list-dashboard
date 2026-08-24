import { useEffect, useState } from "react";
import { fetchUsers } from "./services/userService";
import UserTable from "./components/UserTable";
import UserDetailsModal from "./components/UserDetailsModal";
import EmptyState from "./components/EmptyState";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  /* =========================
     FETCH USERS
  ========================= */

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      setSearchTerm("");

      const data = await fetchUsers();

      setUsers(data);
    } catch (error) {
      setError("Unable to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  /* =========================
     AUTOMATIC SEARCH
  ========================= */

  const filteredUsers = users.filter((user) => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) {
      return true;
    }

    return (
      user.name.toLowerCase().includes(term) ||
      user.username.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.company.name.toLowerCase().includes(term)
    );
  });

  /* =========================
     SELECT USER
  ========================= */

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  /* =========================
     CLOSE USER DETAILS
  ========================= */

  const handleCloseUserDetails = () => {
    setSelectedUser(null);
  };

  return (
    <div className={`app ${isDarkMode ? "dark" : ""}`}>

      {/* =========================
          HEADER
      ========================= */}

      <header className="dashboard-header">

        <div className="header-content">

          <div
            className="brand-icon"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 21V19C16 16.7909 14.2091 15 12 15H6C3.79086 15 2 16.7909 2 19V21"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <circle
                cx="9"
                cy="7"
                r="4"
                stroke="currentColor"
                strokeWidth="1.8"
              />

              <path
                d="M22 21V19C21.9999 17.1332 20.7095 15.5141 18.9 15.05"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />

              <path
                d="M16.9 3.05C18.7131 3.51116 20.0076 5.13117 20.0076 7C20.0076 8.86883 18.7131 10.4888 16.9 10.95"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div
            className="header-divider"
            aria-hidden="true"
          ></div>

          <div className="header-text">
            <h1>User Dashboard</h1>

            <p>
              Manage and view users from JSONPlaceholder
            </p>
          </div>

        </div>

        <div className="header-actions">

          <button
            className="theme-toggle"
            onClick={() =>
              setIsDarkMode((previous) => !previous)
            }
            aria-label={
              isDarkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
          >
            {isDarkMode ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />

                <path
                  d="M12 2V4M12 20V22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 12H4M20 12H22M4.93 19.07L6.34 17.66M17.66 6.34L19.07 4.93"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 12.79A9 9 0 1 1 11.21 3C10.7 3.84 10.43 4.82 10.43 5.86C10.43 8.9 12.89 11.36 15.93 11.36C16.97 11.36 17.95 11.09 18.79 10.58C19.08 11.28 19.84 12.03 21 12.79Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>

        </div>

      </header>

      {/* =========================
          SEARCH SECTION
      ========================= */}

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
            onClick={loadUsers}
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
            {filteredUsers.length}
          </strong>

        </div>

      </section>

      {/* =========================
          CONTENT
      ========================= */}

      <main className="content-area">

        {loading ? (
          <Loading />

        ) : error ? (
          <ErrorMessage
            message={error}
            onRetry={loadUsers}
          />

        ) : filteredUsers.length === 0 ? (
          <EmptyState />

        ) : (
          <UserTable
            users={filteredUsers}
            onUserSelect={handleUserSelect}
          />
        )}

      </main>

      {/* =========================
          USER DETAILS MODAL
      ========================= */}

      <UserDetailsModal
        user={selectedUser}
        onClose={handleCloseUserDetails}
      />

    </div>
  );
}

export default App;