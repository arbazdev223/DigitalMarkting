import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../config";

const initialAuthState = {
  isLoggedIn: false,
  user: null,
  status: "idle",
  error: null,
  currentAction: null,
};

// Utility function for initials
export const getInitials = (name = "") => {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || "";
  return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
};

// SIGNUP
export const signup = createAsyncThunk(
  "auth/signup",
  async ({ name, email, password, confirmPassword }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        "/user/register",
        { name, email, password, confirmPassword },
        { withCredentials: true }
      );
      if (res.data.success && res.data.user) {
        return res.data.user;
      }
      return rejectWithValue(res.data.message);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

// SIGNIN
export const signin = createAsyncThunk(
  "auth/signin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        "/user/login",
        { email, password },
        { withCredentials: true }
      );
      if (res.data.success && res.data.user) {
        return { user: res.data.user };
      }
      return rejectWithValue(res.data.message);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signin failed");
    }
  }
);

// LOAD USER
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/user/me", {
        withCredentials: true,
      });
      if (res.data.success && res.data.user) {
        return res.data.user;
      }
      return rejectWithValue(res.data.message || "Unable to load user");
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Load failed");
    }
  }
);

// UPDATE USER
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { email, ...allowedData } = userData;
      const res = await axiosInstance.put("/user/update-profile", allowedData, {
        withCredentials: true,
      });
      if (res.data.success && res.data.user) {
        return res.data.user;
      }
      return rejectWithValue(res.data.message || "Update failed");
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);

// LOGOUT
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/user/logout", {}, { withCredentials: true });
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

// SLICE
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
    setAuthStatusIdle(state) {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(loadUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || null;
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
        state.status = "idle";
        state.error = null;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state, action) => {
          state.status = "loading";
          state.error = null;
          state.currentAction = action.type.split("/")[1];
        }
      )
      .addMatcher(
        (action) =>
          action.type.endsWith("/fulfilled") ||
          action.type.endsWith("/rejected"),
        (state) => {
          state.status = "idle";
          state.currentAction = null;
        }
      );
  },
});

export const { logout, clearError, setAuthStatusIdle } = authSlice.actions;
export default authSlice.reducer;
