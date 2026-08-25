import { motion } from "framer-motion";

import AuthBackground from "./AuthBackground";

import "./SignupSuccessPage.css";

function SignupSuccessPage({
  user,
  isDarkMode,
  setIsDarkMode,
  onBackToLogin,
  onGoToDashboard,
}) {

  /* =========================================================
     USER INITIAL
  ========================================================= */

  const userInitial =
    (user?.name || "U")
      .trim()
      .charAt(0)
      .toUpperCase();


  /* =========================================================
     RENDER
  ========================================================= */

  return (

    <div
      className={`signup-success-page ${
        isDarkMode ? "dark" : ""
      }`}
    >

      {/* =====================================================
          AUTH BACKGROUND
      ===================================================== */}

      <AuthBackground
  isDarkMode={isDarkMode}
/>


      {/* =====================================================
          THEME TOGGLE
      ===================================================== */}

      <button
        type="button"
        className="auth-theme-toggle"

        onClick={() =>
          setIsDarkMode(
            (previous) => !previous
          )
        }

        aria-label={
          isDarkMode
            ? "Switch to light mode"
            : "Switch to dark mode"
        }
      >

        {isDarkMode ? (

          /* SUN */

          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >

            <circle
              cx="12"
              cy="12"
              r="4"
              stroke="currentColor"
              strokeWidth="1.8"
            />

            <path
              d="M12 2V4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            <path
              d="M12 20V22"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            <path
              d="M4.93 4.93L6.34 6.34"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            <path
              d="M17.66 17.66L19.07 19.07"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            <path
              d="M2 12H4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            <path
              d="M20 12H22"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            <path
              d="M4.93 19.07L6.34 17.66"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            <path
              d="M17.66 6.34L19.07 4.93"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

          </svg>

        ) : (

          /* MOON */

          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
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


      {/* =====================================================
          CONFETTI
      ===================================================== */}

      <div
        className="signup-success-confetti"
        aria-hidden="true"
      >

        {Array.from({
          length: 28,
        }).map((_, index) => (

          <motion.span
            key={index}
            className="signup-success-confetti-piece"

            initial={{
              opacity: 0,
              y: -40,
              x: 0,
              rotate: 0,
            }}

            animate={{
              opacity: [
                0,
                1,
                1,
                0,
              ],

              y: [
                -40,

                70 +
                  (index % 5) * 25,

                180 +
                  (index % 7) * 35,

                320 +
                  (index % 4) * 30,
              ],

              x: [
                0,

                (index % 2 === 0
                  ? 1
                  : -1) *
                  (20 +
                    (index % 6) * 18),

                (index % 2 === 0
                  ? -1
                  : 1) *
                  (35 +
                    (index % 5) * 20),

                (index % 2 === 0
                  ? 1
                  : -1) *
                  (20 +
                    (index % 7) * 15),
              ],

              rotate: [
                0,

                90 +
                  index * 10,

                180 +
                  index * 14,

                360 +
                  index * 18,
              ],
            }}

            transition={{
              duration:
                3.2 +
                (index % 5) * 0.35,

              delay:
                (index % 7) * 0.08,

              ease: "easeOut",

              repeat: Infinity,

              repeatDelay: 1.5,
            }}
          />

        ))}

      </div>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <main className="signup-success-content">

        <motion.div
          className="signup-success-card"

          initial={{
            opacity: 0,
            y: 20,
            scale: 0.96,
          }}

          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}

          transition={{
            duration: 0.42,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        >

          {/* =================================================
              SUCCESS ICON
          ================================================= */}

          <motion.div
            className="signup-success-icon"

            initial={{
              opacity: 0,
              scale: 0.5,
              rotate: -12,
            }}

            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}

            transition={{
              duration: 0.45,
              delay: 0.15,

              type: "spring",

              stiffness: 180,

              damping: 12,
            }}
          >

            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >

              <path
                d="M20 6L9 17L4 12"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

            </svg>

          </motion.div>


          {/* =================================================
              BRAND
          ================================================= */}

          <div className="signup-success-brand">

            <div className="signup-success-brand-icon">

              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
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

            <span>
              User Dashboard
            </span>

          </div>


          {/* =================================================
              HEADING
          ================================================= */}

          <motion.div
            className="signup-success-heading"

            initial={{
              opacity: 0,
              y: 8,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              duration: 0.3,
              delay: 0.28,
            }}
          >

            <h1>
              Account created successfully!
            </h1>

            <p>
              Welcome{" "}
              <strong>
                {user?.name || "there"}
              </strong>
              . Your account is ready to use.
            </p>

          </motion.div>


          {/* =================================================
              USER INFORMATION
          ================================================= */}

          <motion.div
            className="signup-success-user"

            initial={{
              opacity: 0,
              y: 8,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              duration: 0.3,
              delay: 0.35,
            }}
          >

            <div
              className="signup-success-avatar"
              aria-hidden="true"
            >
              {userInitial}
            </div>

            <div className="signup-success-user-info">

              <strong>
                {user?.name || "New User"}
              </strong>

              <span>
                {user?.email || ""}
              </span>

            </div>

          </motion.div>


          {/* =================================================
              ACTIONS
          ================================================= */}

          <motion.div
            className="signup-success-actions"

            initial={{
              opacity: 0,
              y: 8,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              duration: 0.3,
              delay: 0.42,
            }}
          >

            {/* GO TO DASHBOARD */}

            <motion.button
              type="button"
              className="signup-success-primary"

              onClick={
                onGoToDashboard
              }

              whileHover={{
                y: -1,
              }}

              whileTap={{
                scale: 0.985,
              }}
            >

              <span>
                Go to Dashboard
              </span>

              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >

                <path
                  d="M5 12H19"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />

                <path
                  d="M13 6L19 12L13 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

              </svg>

            </motion.button>


            {/* BACK TO LOGIN */}

            <motion.button
              type="button"
              className="signup-success-secondary"

              onClick={
                onBackToLogin
              }

              whileHover={{
                y: -1,
              }}

              whileTap={{
                scale: 0.985,
              }}
            >
              Back to Login
            </motion.button>

          </motion.div>

        </motion.div>

      </main>

    </div>
  );
}

export default SignupSuccessPage;