import { useEffect, useRef, useState } from "react";
import "./DashboardHeader.css";

function DashboardHeader({
  isDarkMode,
  setIsDarkMode,
  currentUser,
  onLogout,
}) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef(null);

  /* =========================================================
     CLOSE PROFILE WHEN CLICKING OUTSIDE
  ========================================================= */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);


  /* =========================================================
     CLOSE PROFILE WITH ESCAPE
  ========================================================= */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);


  /* =========================================================
     USER INITIAL
  ========================================================= */

  const userInitial =
    currentUser?.name?.trim()?.charAt(0)?.toUpperCase() || "?";


  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = () => {
    setIsProfileOpen(false);

    onLogout();
  };


  return (
    <header className="dashboard-header">

      {/* =====================================================
          HEADER CONTENT
      ===================================================== */}

      <div className="header-content">

        {/* BRAND ICON */}

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


        {/* DIVIDER */}

        <div
          className="header-divider"
          aria-hidden="true"
        ></div>


        {/* HEADER TEXT */}

        <div className="header-text">

          <h1>User Dashboard</h1>

          <p>
            Manage and view users from JSONPlaceholder
          </p>

        </div>

      </div>


      {/* =====================================================
          HEADER ACTIONS
      ===================================================== */}

      <div className="header-actions">


        {/* =================================================
            THEME TOGGLE
        ================================================= */}

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


        {/* =================================================
            PROFILE
        ================================================= */}

        <div
          className="profile-wrapper"
          ref={profileRef}
        >

          <button
            type="button"
            className={`profile-toggle ${
              isProfileOpen ? "is-open" : ""
            }`}
            onClick={() =>
              setIsProfileOpen(
                (previous) => !previous
              )
            }
            aria-label="Open profile menu"
            aria-expanded={isProfileOpen}
          >

            <span>
              {userInitial}
            </span>

          </button>


          {/* ===============================================
              PROFILE DRAWER
          =============================================== */}

          {isProfileOpen && (

            <div
              className="profile-drawer"
              role="dialog"
              aria-label="Profile menu"
            >

              <div className="profile-drawer-header">

                <div className="profile-drawer-avatar">
                  {userInitial}
                </div>

                <div className="profile-drawer-user">

                  <strong>
                    {currentUser?.name || "User"}
                  </strong>

                  <span>
                    {currentUser?.email || ""}
                  </span>

                </div>

              </div>


              <div className="profile-drawer-divider"></div>


              <button
                type="button"
                className="logout-button"
                onClick={handleLogout}
              >

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M9 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H9"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />

                  <path
                    d="M16 17L21 12L16 7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M21 12H9"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>

                <span>
                  Logout
                </span>

              </button>

            </div>

          )}

        </div>

      </div>

    </header>
  );
}

export default DashboardHeader;