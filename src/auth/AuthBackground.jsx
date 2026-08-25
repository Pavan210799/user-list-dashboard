import { motion } from "framer-motion";

import "./AuthBackground.css";

function AuthBackground({
  isDarkMode = false,
}) {

  return (

    <div
      className={`auth-background ${
        isDarkMode ? "dark" : ""
      }`}
      aria-hidden="true"
    >

      {/* =====================================================
          SOFT BACKGROUND GRADIENT
      ===================================================== */}

      <div className="auth-background-gradient"></div>


      {/* =====================================================
          LARGE FLOATING SHAPE
      ===================================================== */}

      <motion.div
        className="auth-floating-shape auth-shape-one"

        animate={{
          x: [0, 35, -15, 0],
          y: [0, -25, 20, 0],
          rotate: [20, 32, 12, 20],
        }}

        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />


      {/* =====================================================
          FLOATING CIRCLE
      ===================================================== */}

      <motion.div
        className="auth-floating-shape auth-shape-two"

        animate={{
          x: [0, -30, 20, 0],
          y: [0, 25, -15, 0],
          rotate: [0, -15, 10, 0],
        }}

        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />


      {/* =====================================================
          BOTTOM FLOATING SHAPE
      ===================================================== */}

      <motion.div
        className="auth-floating-shape auth-shape-three"

        animate={{
          x: [0, 20, -25, 0],
          y: [0, 30, -20, 0],
          scale: [1, 1.08, 0.94, 1],
          rotate: [25, 38, 18, 25],
        }}

        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />


      {/* =====================================================
          SMALL FLOATING CIRCLE
      ===================================================== */}

      <motion.div
        className="auth-floating-circle auth-circle-one"

        animate={{
          x: [0, -20, 15, 0],
          y: [0, 18, -22, 0],
          scale: [1, 1.06, 0.96, 1],
        }}

        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />


      {/* =====================================================
          SECOND SMALL FLOATING CIRCLE
      ===================================================== */}

      <motion.div
        className="auth-floating-circle auth-circle-two"

        animate={{
          x: [0, 25, -10, 0],
          y: [0, -18, 24, 0],
          scale: [1, 0.94, 1.07, 1],
        }}

        transition={{
          duration: 19,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />


      {/* =====================================================
          SUBTLE GRID
      ===================================================== */}

      <div className="auth-background-grid"></div>

    </div>
  );
}

export default AuthBackground;