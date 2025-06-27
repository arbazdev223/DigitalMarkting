import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toast";

const dummyStudent = [
  {
    email: "student123@gmail.com",
    password: "student123",
    name: "Student User",
    role: "student",
  },
  {
    email: "aditya@gmail.com",
    password: "aditya123",
    name: "Aditya Kumar",
    role: "student",
  },
];

const saveUsersToStorage = (users) => {
  try {
    localStorage.setItem("users", JSON.stringify(users));
  } catch (error) {
    console.error("Error saving users to localStorage:", error);
  }
};

const loadUsersFromStorage = () => {
  try {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error("Error loading users from localStorage:", error);
    return [];
  }
};

const saveCurrentUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const loadCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const getInitials = (name = "") => {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || "";
  return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
};

const initialAuthState = {
  isLoggedIn: !!loadCurrentUser(),
  user: loadCurrentUser(),
  users: loadUsersFromStorage().length ? loadUsersFromStorage() : dummyStudent,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
      saveCurrentUser(action.payload);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem("user");
    },
    updateUser(state, action) {
      state.user = { ...state.user, ...action.payload };
      const updatedUsers = state.users.map((u) =>
        u.email === state.user.email ? { ...u, ...action.payload } : u
      );
      state.users = updatedUsers;
      saveUsersToStorage(updatedUsers);
      saveCurrentUser(state.user);
    },
    signup(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.users.push(action.payload);
      saveUsersToStorage(state.users);
      saveCurrentUser(action.payload);
    },
  },
});

export const handleSignup = (newUser) => (dispatch, getState) => {
  const { users } = getState().auth;
  const exists = users.some((u) => u.email === newUser.email);
  if (exists) {
    toast("User already exists with this email");
    return;
  }
  dispatch(authSlice.actions.signup(newUser));
  toast.success("Signup successful!");
};

export const handleSignin = (email, password) => (dispatch, getState) => {
  const { users } = getState().auth;
  const matchedUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (matchedUser) {
    dispatch(authSlice.actions.login(matchedUser));
  } else if (email.includes("admin")) {
    dispatch(
      authSlice.actions.login({ role: "admin", name: "Admin User", email })
    );
  } else {
    toast("Invalid credentials.");
  }
};

export const { login, logout, updateUser, signup } = authSlice.actions;
export default authSlice.reducer;
