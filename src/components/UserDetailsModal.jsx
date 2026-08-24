import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./UserDetailsModal.css";

function UserDetailsModal({ user, onClose }) {
  /* =========================================================
     LOCK MAIN PAGE SCROLL
  ========================================================= */

  useEffect(() => {
    if (!user) {
      return;
    }

    const scrollY = window.scrollY;

    const body = document.body;
    const html = document.documentElement;

    html.style.overflow = "hidden";

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";

    return () => {
      html.style.overflow = "";

      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "";

      window.scrollTo(0, scrollY);
    };
  }, [user]);

  /* =========================================================
     ESCAPE KEY
  ========================================================= */

  useEffect(() => {
    if (!user) {
      return;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [user, onClose]);

  /* =========================================================
     USER DATA
  ========================================================= */

  const avatarLetter =
    user?.name?.charAt(0).toUpperCase() || "?";

  const latitude = user?.address?.geo?.lat;
  const longitude = user?.address?.geo?.lng;

  const googleMapsUrl =
    latitude && longitude
      ? `https://www.google.com/maps?q=${latitude},${longitude}`
      : "#";

  /* =========================================================
     BACKDROP CLICK
  ========================================================= */

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence mode="wait">

      {user && (
        <motion.div
          key={`user-modal-overlay-${user.id}`}
          className="user-details-modal-overlay"
          onMouseDown={handleBackdropClick}
          role="presentation"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.14,
            ease: "easeOut",
          }}
        >

          <motion.div
            key={`user-modal-${user.id}`}
            className="user-details-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="user-details-modal-title"

            initial={{
              opacity: 0,
              y: 12,
              scale: 0.975,
            }}

            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}

            exit={{
              opacity: 0,
              y: 8,
              scale: 0.985,
            }}

            transition={{
              duration: 0.17,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            {/* =================================================
                MODAL HEADER
            ================================================= */}

            <div className="user-details-modal-header">

              <div className="user-details-modal-heading">

                <motion.div
                  className="user-details-modal-avatar"

                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}

                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}

                  transition={{
                    delay: 0.03,
                    duration: 0.13,
                    ease: "easeOut",
                  }}

                  whileHover={{
                    scale: 1.04,
                    y: -1,
                  }}

                  whileTap={{
                    scale: 0.96,
                  }}
                >
                  {avatarLetter}
                </motion.div>


                <div className="user-details-modal-title">

                  <span>
                    User Details
                  </span>

                  <h2 id="user-details-modal-title">
                    {user.name}
                  </h2>

                </div>

              </div>


              {/* CLOSE */}

              <motion.button
                type="button"
                className="user-details-modal-close"
                onClick={onClose}
                aria-label="Close user details"

                whileHover={{
                  scale: 1.04,
                  y: -1,
                }}

                whileTap={{
                  scale: 0.91,
                }}
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

              </motion.button>

            </div>


            {/* =================================================
                MODAL CONTENT
            ================================================= */}

            <div className="user-details-modal-content">

              {/* =================================================
                  BASIC INFORMATION
              ================================================= */}

              <section className="user-details-section">

                <div className="user-details-section-heading">

                  <span className="user-details-section-dot"></span>

                  <h3>
                    Basic Information
                  </h3>

                </div>


                <div className="user-details-grid">

                  <div className="user-detail-item">

                    <span className="user-detail-label">
                      Full Name
                    </span>

                    <strong className="user-detail-value">
                      {user.name}
                    </strong>

                  </div>


                  <div className="user-detail-item">

                    <span className="user-detail-label">
                      Username
                    </span>

                    <strong className="user-detail-value">
                      @{user.username}
                    </strong>

                  </div>


                  <div className="user-detail-item">

                    <span className="user-detail-label">
                      Email
                    </span>

                    <a
                      className="user-detail-link"
                      href={`mailto:${user.email}`}
                    >
                      {user.email}
                    </a>

                  </div>


                  <div className="user-detail-item">

                    <span className="user-detail-label">
                      Phone
                    </span>

                    <a
                      className="user-detail-link"
                      href={`tel:${user.phone}`}
                    >
                      {user.phone}
                    </a>

                  </div>

                </div>

              </section>


              {/* =================================================
                  ADDRESS
              ================================================= */}

              <section className="user-details-section">

                <div className="user-details-section-heading">

                  <span className="user-details-section-dot"></span>

                  <h3>
                    Address
                  </h3>

                </div>


                <div className="user-details-grid">

                  <div className="user-detail-item">

                    <span className="user-detail-label">
                      Street
                    </span>

                    <strong className="user-detail-value">
                      {user.address.street}
                    </strong>

                  </div>


                  <div className="user-detail-item">

                    <span className="user-detail-label">
                      Suite
                    </span>

                    <strong className="user-detail-value">
                      {user.address.suite}
                    </strong>

                  </div>


                  <div className="user-detail-item">

                    <span className="user-detail-label">
                      City
                    </span>

                    <strong className="user-detail-value">
                      {user.address.city}
                    </strong>

                  </div>


                  <div className="user-detail-item">

                    <span className="user-detail-label">
                      ZIP Code
                    </span>

                    <strong className="user-detail-value">
                      {user.address.zipcode}
                    </strong>

                  </div>

                </div>


                {/* GOOGLE MAPS */}

                <motion.a
                  className="user-details-location"
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${user.name}'s location in Google Maps`}

                  whileHover={{
                    y: -1,
                  }}

                  whileTap={{
                    scale: 0.985,
                  }}
                >

                  <div className="user-detail-location-icon">

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M20 10C20 15 12 22 12 22C12 22 4 15 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />

                      <circle
                        cx="12"
                        cy="10"
                        r="2.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />

                    </svg>

                  </div>


                  <div className="user-details-coordinates">

                    <span className="user-detail-label">
                      Location
                    </span>

                    <div className="user-coordinate-links">

                      <span>
                        Latitude:{" "}
                        <strong>
                          {latitude}
                        </strong>
                      </span>

                      <span>
                        Longitude:{" "}
                        <strong>
                          {longitude}
                        </strong>
                      </span>

                    </div>

                  </div>


                  <svg
                    className="user-location-external-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >

                    <path
                      d="M14 5H19V10"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M19 5L11 13"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M19 14V19C19 19.5523 18.5523 20 18 20H5C4.44772 20 4 19.5523 4 19V6C4 5.44772 4 5 5 5H10"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                  </svg>

                </motion.a>

              </section>


              {/* =================================================
                  COMPANY
              ================================================= */}

              <section className="user-details-section">

                <div className="user-details-section-heading">

                  <span className="user-details-section-dot"></span>

                  <h3>
                    Company
                  </h3>

                </div>


                <motion.div
                  className="user-details-company"

                  whileHover={{
                    y: -1,
                  }}
                >

                  <div className="user-detail-company-name">
                    {user.company.name}
                  </div>


                  <p className="user-detail-company-catchphrase">
                    {user.company.catchPhrase}
                  </p>


                  <div className="user-detail-company-row">

                    <span className="user-detail-company-subheading">
                      What do they do?
                    </span>

                    <p>
                      {user.company.bs}
                    </p>

                  </div>

                </motion.div>

              </section>


              {/* =================================================
                  WEBSITE
              ================================================= */}

              <section className="user-details-section user-details-section-last">

                <div className="user-details-section-heading">

                  <span className="user-details-section-dot"></span>

                  <h3>
                    Website
                  </h3>

                </div>


                <motion.a
                  className="user-details-website"
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"

                  whileHover={{
                    y: -1,
                  }}

                  whileTap={{
                    scale: 0.99,
                  }}
                >

                  <span>
                    {user.website}
                  </span>


                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >

                    <path
                      d="M14 5H19V10"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M19 5L11 13"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M19 14V19C19 19.5523 18.5523 20 18 20H5C4.44772 20 4 19.5523 4 19V6C4 5.44772 4.44772 5 5 5H10"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                  </svg>

                </motion.a>

              </section>

            </div>

          </motion.div>

        </motion.div>
      )}

    </AnimatePresence>
  );
}

export default UserDetailsModal;