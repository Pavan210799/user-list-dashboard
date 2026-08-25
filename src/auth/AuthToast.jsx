import { AnimatePresence, motion } from "framer-motion";

import "./AuthToast.css";

function AuthToast({
  type,
  message,
  onClose,
}) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className={`auth-toast auth-toast-${type}`}
          initial={{
            opacity: 0,
            y: -18,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -12,
            scale: 0.97,
          }}
          transition={{
            duration: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          role="alert"
        >

          {/* =================================================
              ICON
          ================================================= */}

          <div className="auth-toast-icon">
            {type === "success" ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M5 12.5L9.2 16.5L19 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />

                <path
                  d="M12 7.5V12.5"
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
            )}
          </div>


          {/* =================================================
              MESSAGE
          ================================================= */}

          <span className="auth-toast-message">
            {message}
          </span>


          {/* =================================================
              CLOSE
          ================================================= */}

          <button
            type="button"
            className="auth-toast-close"
            onClick={onClose}
            aria-label="Close notification"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M6 6L18 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />

              <path
                d="M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>

        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AuthToast;