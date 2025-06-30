import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance, axiosAuthInstance } from "../config";

const initialAuthState = {
  isLoggedIn: false,
  user: null,
  status: "idle",
  error: null,
};

export const signup = createAsyncThunk(
  "auth/signup",
  async (
    { name, email, password, confirmPassword },
    { rejectWithValue }
  ) => {
    if (!name || !email || !password || !confirmPassword) {
      return rejectWithValue("All fields are required");
    }
    if (password !== confirmPassword) {
      return rejectWithValue("Passwords do not match");
    }

    try {
      const res = await axiosInstance.post("/user/register", {
        name,
        email,
        password,
        confirmPassword,
      });
      if (res.data.success && res.data.user && res.data.token) {
        return { ...res.data.user, token: res.data.token };
      }

      return rejectWithValue(res.data.message || "Signup failed");
    } catch (err) {
      console.error("Signup error:", err);
      return rejectWithValue(err.response?.data?.message || "Signup failed");
    }
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/login", { email, password });
      if (res.data.success && res.data.user && res.data.token) {
        return { ...res.data.user, token: res.data.token };
      }
      return rejectWithValue(res.data.message || "Signin failed");
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Signin failed");
    }
  }
);



export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.user?.token;
      const res = await axiosAuthInstance(token).put("/user/update-profile", userData);
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
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.user?.token;
      await axiosAuthInstance(token).post("/user/logout");
      return true;
    } catch (err) {
      return rejectWithValue("Logout failed");
    }
  }
);

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(signin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(signin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;

      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
        state.status = "idle";
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
