import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance, axiosAuthInstance } from "../config";

const initialAuthState = {
  isLoggedIn: false,
  token: null,
  user: null,
  status: "idle",
  error: null,
};
export const getInitials = (name = "") => {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || "";
  return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
};
export const signup = createAsyncThunk(
  "auth/signup",
  async ({ name, email, password, confirmPassword }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/register", {
        name,
        email,
        password,
        confirmPassword,
      });
      if (res.data.success && res.data.user && res.data.token) {
        const userData = { ...res.data.user, token: res.data.token };
        localStorage.setItem("authUser", JSON.stringify(userData));
        return userData;
      }
      return rejectWithValue(res.data.message);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/login", { email, password });
      if (res.data.success && res.data.user && res.data.token) {
        return {
          user: res.data.user,
          token: res.data.token,
        };
      }
      return rejectWithValue(res.data.message);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signin failed");
    }
  }
);

export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;

    if (!token) return rejectWithValue("No token available");

    try {
      const res = await axiosAuthInstance(token).get("/user/me");

      if (res.data.success && res.data.user) {
        return res.data.user;
      }

      return rejectWithValue("Unable to load user");
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Load failed");
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await axiosAuthInstance(token).put(
        "/user/update-profile",
        userData
      );

      if (res.data.success && res.data.user) {
        return res.data.user;
      }

      return rejectWithValue(res.data.message || "Update failed");
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/user/logout");
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logout(state) {
      localStorage.removeItem("authUser");
      state.isLoggedIn = false;
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.status = "succeeded";
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.status = "succeeded";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        state.status = "idle";
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        }
      );
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
