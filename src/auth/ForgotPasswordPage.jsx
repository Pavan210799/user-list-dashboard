import { useState } from "react";
import { motion } from "framer-motion";

import { findUserByEmail } from "../services/authService";
import AuthBackground from "./AuthBackground";
import AuthToast from "./AuthToast";

import "./ForgotPasswordPage.css";


function ForgotPasswordPage({
  isDarkMode,
  setIsDarkMode,
  onEmailVerified,
  onNavigateToLogin,
}) {

  const [email, setEmail] = useState("");

  const [toast, setToast] = useState({
    type: "",
    message: "",
  });


  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = (event) => {

    event.preventDefault();


    if (!email.trim()) {

      setToast({
        type: "error",
        message:
          "Please enter your email address.",
      });

      return;
    }


    const user = findUserByEmail(email);


    if (!user) {

      setToast({
        type: "error",
        message:
          "No account found with this email.",
      });

      return;
    }


    setToast({
      type: "success",
      message:
        "Email verified. You can reset your password.",
    });


    setTimeout(() => {

      onEmailVerified(
        email.trim().toLowerCase()
      );

    }, 700);

  };


  return (

    <div
      className={`auth-page ${
        isDarkMode
          ? "auth-dark"
          : ""
      }`}
    >

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

          <svg
            viewBox="0 0 24 24"
            fill="none"
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


      <AuthToast
        type={toast.type}
        message={toast.message}
        onClose={() =>
          setToast({
            type: "",
            message: "",
          })
        }
      />


      <motion.main
        className="forgot-password-page-content"

        initial={{
          opacity: 0,
          y: 12,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.28,
          ease: [0.22, 1, 0.36, 1],
        }}
      >

        <motion.div
          className="forgot-password-card"

          initial={{
            opacity: 0,
            scale: 0.97,
          }}

          animate={{
            opacity: 1,
            scale: 1,
          }}

          transition={{
            duration: 0.28,
            delay: 0.03,
            ease: [0.22, 1, 0.36, 1],
          }}
        >

          {/* =================================================
              BRAND
          ================================================= */}

          <div className="forgot-password-brand">

            <div className="forgot-password-brand-icon">

              <svg
                viewBox="0 0 24 24"
                fill="none"
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

          <div className="forgot-password-heading">

            <div className="forgot-password-title-icon">

              <svg
                viewBox="0 0 24 24"
                fill="none"
              >

                <path
                  d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />

                <path
                  d="M12 8V12"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />

                <circle
                  cx="12"
                  cy="16"
                  r="1"
                  fill="currentColor"
                />

              </svg>

            </div>

            <h1>
              Forgot your password?
            </h1>

            <p>
              Enter your registered email address and
              we'll help you reset your password.
            </p>

          </div>


          {/* =================================================
              FORM
          ================================================= */}

          <form
            className="forgot-password-form"
            onSubmit={handleSubmit}
          >

            <div className="auth-field">

              <label htmlFor="forgot-password-email">
                Email
              </label>

              <input
                id="forgot-password-email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="Enter your email"
                autoComplete="email"
              />

            </div>


            <motion.button
              type="submit"
              className="auth-primary-button"

              whileHover={{
                y: -1,
              }}

              whileTap={{
                scale: 0.985,
              }}
            >
              Continue
            </motion.button>

          </form>


          {/* =================================================
              BACK TO LOGIN
          ================================================= */}

          <div className="auth-switch forgot-back-login">

            <button
              type="button"
              onClick={onNavigateToLogin}
            >

              <svg
                viewBox="0 0 24 24"
                fill="none"
              >

                <path
                  d="M19 12H5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />

                <path
                  d="M11 18L5 12L11 6"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

              </svg>

              Back to login

            </button>

          </div>

        </motion.div>

      </motion.main>

    </div>

  );

}

export default ForgotPasswordPage;