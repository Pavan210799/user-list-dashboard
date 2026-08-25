import { useEffect, useState } from "react";

import { fetchUsers } from "./services/userService";

import {
  getCurrentUser,
  isUserAuthenticated,
  logoutUser,
} from "./services/authService";

import UserTable from "./components/UserTable";
import UserDetailsModal from "./components/UserDetailsModal";
import EmptyState from "./components/EmptyState";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";

import DashboardHeader from "./components/DashboardHeader";
import UserSearch from "./components/UserSearch";

import LoginPage from "./auth/LoginPage";
import SignupPage from "./auth/SignupPage";
import SignupSuccessPage from "./auth/SignupSuccessPage";
import ForgotPasswordPage from "./auth/ForgotPasswordPage";
import ResetPasswordPage from "./auth/ResetPasswordPage";

import "./App.css";


const THEME_STORAGE_KEY =
  "userDashboardTheme";

const CURRENT_USER_KEY =
  "userDashboardCurrentUser";


function App() {

  /* =========================================================
     AUTHENTICATION
  ========================================================= */

  const [currentUser, setCurrentUser] = useState(
    () => getCurrentUser()
  );

  const [authPage, setAuthPage] =
    useState("login");

  const [resetEmail, setResetEmail] =
    useState("");


  /* =========================================================
     SIGNUP SUCCESS USER
  ========================================================= */

  const [signupSuccessUser, setSignupSuccessUser] =
    useState(null);


  /* =========================================================
     DASHBOARD STATE
  ========================================================= */

  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [selectedUser, setSelectedUser] =
    useState(null);


  /* =========================================================
     PERSISTENT THEME
  ========================================================= */

  const [isDarkMode, setIsDarkMode] =
    useState(() => {

      const storedTheme =
        localStorage.getItem(
          THEME_STORAGE_KEY
        );

      return storedTheme === "dark";

    });


  /* =========================================================
     SAVE THEME
  ========================================================= */

  useEffect(() => {

    localStorage.setItem(
      THEME_STORAGE_KEY,
      isDarkMode
        ? "dark"
        : "light"
    );

  }, [isDarkMode]);


  /* =========================================================
     AUTHENTICATION CHECK
  ========================================================= */

  useEffect(() => {

    const storedUser =
      getCurrentUser();

    if (
      storedUser &&
      isUserAuthenticated()
    ) {

      setCurrentUser(
        storedUser
      );

    } else {

      setCurrentUser(null);

    }

  }, []);


  /* =========================================================
     FETCH USERS
  ========================================================= */

  const loadUsers = async () => {

    try {

      setLoading(true);

      setError("");

      setSearchTerm("");

      const data =
        await fetchUsers();

      setUsers(data);

    } catch (error) {

      setError(
        "Unable to load users. Please try again."
      );

    } finally {

      setLoading(false);

    }

  };


  /* =========================================================
     LOAD DASHBOARD AFTER LOGIN
  ========================================================= */

  useEffect(() => {

    if (!currentUser) {
      return;
    }

    loadUsers();

  }, [currentUser]);


  /* =========================================================
     SEARCH
  ========================================================= */

  const filteredUsers =
    users.filter((user) => {

      const term =
        searchTerm
          .trim()
          .toLowerCase();

      if (!term) {
        return true;
      }

      return (
        user.name
          .toLowerCase()
          .includes(term) ||

        user.username
          .toLowerCase()
          .includes(term) ||

        user.email
          .toLowerCase()
          .includes(term) ||

        user.company.name
          .toLowerCase()
          .includes(term)
      );

    });


  /* =========================================================
     LOGIN SUCCESS
  ========================================================= */

  const handleLoginSuccess = (user) => {

    setCurrentUser(user);

    setAuthPage("login");

  };


  /* =========================================================
     SIGNUP SUCCESS
  ========================================================= */

  const handleSignupSuccess = (user) => {

    setSignupSuccessUser(user);

    setAuthPage(
      "signup-success"
    );

  };


  /* =========================================================
     BACK TO LOGIN FROM SUCCESS PAGE
  ========================================================= */

  const handleBackToLogin =
    () => {

      setSignupSuccessUser(null);

      setAuthPage("login");

    };


  /* =========================================================
     GO TO DASHBOARD FROM SUCCESS PAGE
  ========================================================= */

  const handleGoToDashboard =
    () => {

      if (!signupSuccessUser) {

        setAuthPage("login");

        return;

      }


      const sessionUser = {
        id: signupSuccessUser.id,
        name: signupSuccessUser.name,
        email: signupSuccessUser.email,
      };


      /*
        Create persistent login session.

        This is the same storage key used by
        authService.js.
      */

      localStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify(
          sessionUser
        )
      );


      setCurrentUser(
        sessionUser
      );

      setSignupSuccessUser(null);

      setAuthPage("login");

    };


  /* =========================================================
     EMAIL VERIFIED
  ========================================================= */

  const handleEmailVerified =
    (email) => {

      setResetEmail(email);

      setAuthPage(
        "reset-password"
      );

    };


  /* =========================================================
     RESET SUCCESS
  ========================================================= */

  const handleResetSuccess =
    () => {

      setResetEmail("");

      setAuthPage("login");

    };


  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = () => {

    logoutUser();

    setCurrentUser(null);

    setSelectedUser(null);

    setUsers([]);

    setSearchTerm("");

    setError("");

    setSignupSuccessUser(null);

    setAuthPage("login");

  };


  /* =========================================================
     SELECT USER
  ========================================================= */

  const handleUserSelect =
    (user) => {

      setSelectedUser(user);

    };


  /* =========================================================
     CLOSE MODAL
  ========================================================= */

  const handleCloseUserDetails =
    () => {

      setSelectedUser(null);

    };


  /* =========================================================
     AUTHENTICATION PAGES
  ========================================================= */

  if (!currentUser) {


    /* =======================================================
       SIGNUP
    ======================================================= */

    if (
      authPage === "signup"
    ) {

      return (
        <SignupPage
          isDarkMode={
            isDarkMode
          }

          setIsDarkMode={
            setIsDarkMode
          }

          onSignupSuccess={
            handleSignupSuccess
          }

          onNavigateToLogin={() =>
            setAuthPage(
              "login"
            )
          }
        />
      );

    }


    /* =======================================================
       SIGNUP SUCCESS
    ======================================================= */

    if (
      authPage ===
      "signup-success"
    ) {

      return (
        <SignupSuccessPage
          user={
            signupSuccessUser
          }

          isDarkMode={
            isDarkMode
          }

          setIsDarkMode={
            setIsDarkMode
          }

          onBackToLogin={
            handleBackToLogin
          }

          onGoToDashboard={
            handleGoToDashboard
          }
        />
      );

    }


    /* =======================================================
       FORGOT PASSWORD
    ======================================================= */

    if (
      authPage ===
      "forgot-password"
    ) {

      return (
        <ForgotPasswordPage
          isDarkMode={
            isDarkMode
          }

          setIsDarkMode={
            setIsDarkMode
          }

          onEmailVerified={
            handleEmailVerified
          }

          onNavigateToLogin={() =>
            setAuthPage(
              "login"
            )
          }
        />
      );

    }


    /* =======================================================
       RESET PASSWORD
    ======================================================= */

    if (
      authPage ===
      "reset-password"
    ) {

      return (
        <ResetPasswordPage
          isDarkMode={
            isDarkMode
          }

          setIsDarkMode={
            setIsDarkMode
          }

          email={
            resetEmail
          }

          onResetSuccess={
            handleResetSuccess
          }

          onNavigateToLogin={() =>
            setAuthPage(
              "login"
            )
          }
        />
      );

    }


    /* =======================================================
       LOGIN
    ======================================================= */

    return (
      <LoginPage
        isDarkMode={
          isDarkMode
        }

        setIsDarkMode={
          setIsDarkMode
        }

        onLoginSuccess={
          handleLoginSuccess
        }

        onNavigateToSignup={() =>
          setAuthPage(
            "signup"
          )
        }

        onNavigateToForgotPassword={() =>
          setAuthPage(
            "forgot-password"
          )
        }
      />
    );

  }


  /* =========================================================
     DASHBOARD
  ========================================================= */

  return (

    <div
      className={`app ${
        isDarkMode
          ? "dark"
          : ""
      }`}
    >


      {/* =====================================================
          HEADER
      ===================================================== */}

      <DashboardHeader
        isDarkMode={
          isDarkMode
        }

        setIsDarkMode={
          setIsDarkMode
        }

        currentUser={
          currentUser
        }

        onLogout={
          handleLogout
        }
      />


      {/* =====================================================
          SEARCH
      ===================================================== */}

      <UserSearch
        searchTerm={
          searchTerm
        }

        setSearchTerm={
          setSearchTerm
        }

        onRefresh={
          loadUsers
        }

        loading={
          loading
        }

        userCount={
          filteredUsers.length
        }
      />


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <main className="content-area">

        {loading ? (

          <Loading />

        ) : error ? (

          <ErrorMessage
            message={
              error
            }

            onRetry={
              loadUsers
            }
          />

        ) : filteredUsers.length === 0 ? (

          <EmptyState />

        ) : (

          <UserTable
            users={
              filteredUsers
            }

            onUserSelect={
              handleUserSelect
            }
          />

        )}

      </main>


      {/* =====================================================
          USER DETAILS MODAL
      ===================================================== */}

      <UserDetailsModal
        user={
          selectedUser
        }

        onClose={
          handleCloseUserDetails
        }
      />

    </div>

  );

}

export default App;