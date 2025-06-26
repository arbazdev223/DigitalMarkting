import { createSlice } from "@reduxjs/toolkit";

const dummyStudent = {
  email: "student123@gmail.com",
  password: "student123",
  name: "Student User",
  role: "student",
};

const saveUserToStorage = (user) => {
  try {
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.error("Error saving user to localStorage:", error);
  }
};

const loadUserFromStorage = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error loading user from localStorage:", error);
    return null;
  }
};

const initialAuthState = {
  isLoggedIn: !!loadUserFromStorage(),
  user: loadUserFromStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
      saveUserToStorage(action.payload);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const handleSignup = () => (dispatch) => {
  const newUser = { role: "student", name: "Student User",email: dummyStudent.email };
  dispatch(authSlice.actions.login(newUser));
};

export const handleSignin = (email, password) => (dispatch) => {
  if (email === dummyStudent.email && password === dummyStudent.password ) {
    dispatch(
      authSlice.actions.login({ role: "student", name: dummyStudent.name,email: dummyStudent.email })
    );
  } else if (email.includes("admin")) {
    dispatch(authSlice.actions.login({ role: "admin", name: "Admin User" }));
  } else {
    alert("Invalid credentials. Try student123@gmail.com / student123");
  }
};

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
