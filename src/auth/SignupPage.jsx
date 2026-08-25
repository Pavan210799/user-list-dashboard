import { useState } from "react";
import { motion } from "framer-motion";

import { signupUser } from "../services/authService";
import AuthBackground from "./AuthBackground";
import AuthToast from "./AuthToast";

import "./SignupPage.css";

function SignupPage({
  isDarkMode,
  setIsDarkMode,
  onSignupSuccess,
  onNavigateToLogin,
}) {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [toast, setToast] = useState({
    type: "",
    message: "",
  });


  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = (event) => {

    event.preventDefault();


    if (!name.trim()) {

      setToast({
        type: "error",
        message: "Please enter your name.",
      });

      return;
    }


    if (!email.trim()) {

      setToast({
        type: "error",
        message:
          "Please enter your email address.",
      });

      return;
    }


    if (!password) {

      setToast({
        type: "error",
        message:
          "Please create a password.",
      });

      return;
    }


    if (password.length < 6) {

      setToast({
        type: "error",
        message:
          "Password must contain at least 6 characters.",
      });

      return;
    }


    if (!confirmPassword) {

      setToast({
        type: "error",
        message:
          "Please confirm your password.",
      });

      return;
    }


    if (password !== confirmPassword) {

      setToast({
        type: "error",
        message:
          "Passwords do not match.",
      });

      return;
    }


    const result = signupUser({
      name,
      email,
      password,
    });


    if (!result.success) {

      setToast({
        type: "error",
        message: result.message,
      });

      return;
    }


    /* =======================================================
       SUCCESS
    ======================================================= */

    setToast({
      type: "success",
      message: result.message,
    });


    /*
      IMPORTANT:
      Pass the newly-created user to App.jsx.

      The success page will use this user to show:
      - name
      - email
      - first-letter avatar
    */

    setTimeout(() => {

      onSignupSuccess(result.user);

    }, 700);

  };


  /* =========================================================
     EYE ICON
  ========================================================= */

  const renderEyeIcon = (visible) => {

    if (visible) {

      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >

          <path
            d="M2.5 12C4.6 7.9 8 5.5 12 5.5C16 5.5 19.4 7.9 21.5 12C19.4 16.1 16 18.5 12 18.5C8 18.5 4.6 16.1 2.5 12Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />

          <circle
            cx="12"
            cy="12"
            r="3"
            stroke="currentColor"
            strokeWidth="1.7"
          />

        </svg>
      );

    }


    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >

        <path
          d="M3 3L21 21"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />

        <path
          d="M10.6 5.7C11.05 5.57 11.52 5.5 12 5.5C16 5.5 19.4 7.9 21.5 12C20.72 13.52 19.77 14.8 18.65 15.8"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M7.1 7.1C5.22 8.08 3.72 9.72 2.5 12C4.6 16.1 8 18.5 12 18.5C13.2 18.5 14.35 18.23 15.4 17.72"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

      </svg>
    );

  };


  /* =========================================================
     RENDER
  ========================================================= */

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


      {/* =====================================================
          TOAST
      ===================================================== */}

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


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <motion.main
        className="signup-page-content"

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
          className="signup-card"

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

          <div className="signup-brand">

            <div className="signup-brand-icon">

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

          <div className="signup-heading">

            <h1>
              Create an account
            </h1>

            <p>
              Set up your account to access the dashboard.
            </p>

          </div>


          {/* =================================================
              FORM
          ================================================= */}

          <form
            className="signup-form"
            onSubmit={handleSubmit}
          >

            {/* NAME */}

            <div className="auth-field">

              <label htmlFor="signup-name">
                Full name
              </label>

              <input
                id="signup-name"
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="Enter your name"
                autoComplete="name"
              />

            </div>


            {/* EMAIL */}

            <div className="auth-field">

              <label htmlFor="signup-email">
                Email
              </label>

              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="Enter your email"
                autoComplete="email"
              />

            </div>


            {/* PASSWORD */}

            <div className="auth-field">

              <label htmlFor="signup-password">
                Password
              </label>

              <div className="password-input-wrapper">

                <input
                  id="signup-password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Create a password"
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="password-visibility-toggle"

                  onClick={() =>
                    setShowPassword(
                      (previous) => !previous
                    )
                  }

                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {renderEyeIcon(showPassword)}
                </button>

              </div>

            </div>


            {/* CONFIRM PASSWORD */}

            <div className="auth-field">

              <label htmlFor="signup-confirm-password">
                Confirm password
              </label>

              <div className="password-input-wrapper">

                <input
                  id="signup-confirm-password"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(
                      event.target.value
                    )
                  }
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="password-visibility-toggle"

                  onClick={() =>
                    setShowConfirmPassword(
                      (previous) => !previous
                    )
                  }

                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {renderEyeIcon(
                    showConfirmPassword
                  )}
                </button>

              </div>

            </div>


            {/* SUBMIT */}

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
              Create account
            </motion.button>

          </form>


          {/* =================================================
              LOGIN
          ================================================= */}

          <div className="auth-switch">

            <span>
              Already have an account?
            </span>

            <button
              type="button"
              onClick={onNavigateToLogin}
            >
              Login
            </button>

          </div>

        </motion.div>

      </motion.main>

    </div>
  );
}

export default SignupPage;