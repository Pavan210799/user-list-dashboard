const AUTH_USERS_KEY = "userDashboardUsers";
const CURRENT_USER_KEY = "userDashboardCurrentUser";

/* =========================================================
   INTERNAL HELPERS
========================================================= */

const getStoredUsers = () => {
  try {
    const storedUsers = localStorage.getItem(AUTH_USERS_KEY);

    if (!storedUsers) {
      return [];
    }

    const parsedUsers = JSON.parse(storedUsers);

    return Array.isArray(parsedUsers)
      ? parsedUsers
      : [];
  } catch {
    return [];
  }
};

const saveStoredUsers = (users) => {
  localStorage.setItem(
    AUTH_USERS_KEY,
    JSON.stringify(users)
  );
};


/* =========================================================
   NORMALIZE EMAIL
========================================================= */

const normalizeEmail = (email) => {
  return email.trim().toLowerCase();
};


/* =========================================================
   SIGN UP
========================================================= */

export const signupUser = ({
  name,
  email,
  password,
}) => {
  const users = getStoredUsers();

  const normalizedEmail = normalizeEmail(email);

  const existingUser = users.find(
    (user) =>
      user.email === normalizedEmail
  );

  if (existingUser) {
    return {
      success: false,
      message:
        "An account with this email already exists.",
    };
  }

  const newUser = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    password,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);

  saveStoredUsers(users);

  return {
    success: true,
    user: newUser,
    message:
      "Account created successfully.",
  };
};


/* =========================================================
   LOGIN
========================================================= */

export const loginUser = ({
  email,
  password,
}) => {
  const users = getStoredUsers();

  const normalizedEmail = normalizeEmail(email);

  const user = users.find(
    (storedUser) =>
      storedUser.email === normalizedEmail
  );

  if (!user) {
    return {
      success: false,
      message:
        "No account found with this email.",
    };
  }

  if (user.password !== password) {
    return {
      success: false,
      message:
        "Incorrect password. Please try again.",
    };
  }

  const sessionUser = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify(sessionUser)
  );

  return {
    success: true,
    user: sessionUser,
    message: "Welcome back!",
  };
};


/* =========================================================
   GET CURRENT USER
========================================================= */

export const getCurrentUser = () => {
  try {
    const storedUser =
      localStorage.getItem(CURRENT_USER_KEY);

    if (!storedUser) {
      return null;
    }

    return JSON.parse(storedUser);
  } catch {
    return null;
  }
};


/* =========================================================
   LOGOUT
========================================================= */

export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};


/* =========================================================
   CHECK AUTHENTICATION
========================================================= */

export const isUserAuthenticated = () => {
  return Boolean(getCurrentUser());
};


/* =========================================================
   FIND USER BY EMAIL
========================================================= */

export const findUserByEmail = (email) => {
  const users = getStoredUsers();

  const normalizedEmail = normalizeEmail(email);

  return (
    users.find(
      (user) =>
        user.email === normalizedEmail
    ) || null
  );
};


/* =========================================================
   RESET PASSWORD
========================================================= */

export const resetUserPassword = ({
  email,
  password,
}) => {
  const users = getStoredUsers();

  const normalizedEmail = normalizeEmail(email);

  const userIndex = users.findIndex(
    (storedUser) =>
      storedUser.email === normalizedEmail
  );

  if (userIndex === -1) {
    return {
      success: false,
      message:
        "No account found with this email.",
    };
  }

  users[userIndex] = {
    ...users[userIndex],
    password,
  };

  saveStoredUsers(users);

  return {
    success: true,
    message:
      "Password reset successfully.",
  };
};