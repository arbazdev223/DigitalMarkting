import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../config";

const initialBlogState = {
  blogs: [],
  selectedBlog: null,
  status: "idle",
  error: null,
  currentAction: null,
};

// Thunks
export const fetchBlogs = createAsyncThunk("blog/fetchBlogs", async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get("/blogs/blogsAll");
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to fetch blogs");
  }
});

export const createBlog = createAsyncThunk("blog/createBlog", async (blogData, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post("/blogs/create", blogData);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to create blog");
  }
});

export const fetchBlogById = createAsyncThunk("blog/fetchBlogById", async (id, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get(`/blogs/${id}`);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to fetch blog");
  }
});

// ✅ Updated: includes rating in payload and request
export const addComment = createAsyncThunk(
  "blog/addComment",
  async ({ blogId, name, email, text, rating }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(`/blogs/${blogId}/comment`, {
        name,
        email,
        text,
        rating,
      });
      return { blogId, comments: res.data.comments };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to add comment");
    }
  }
);

// Slice
const blogSlice = createSlice({
  name: "blog",
  initialState: initialBlogState,
  reducers: {
    clearBlogError(state) {
      state.error = null;
    },
    clearSelectedBlog(state) {
      state.selectedBlog = null;
    },
    setBlogStatusIdle(state) {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.blogs.unshift(action.payload);
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.selectedBlog = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const { blogId, comments } = action.payload;

        if (state.selectedBlog?._id === blogId) {
          state.selectedBlog.comments = comments;
        }

        const index = state.blogs.findIndex((b) => b._id === blogId);
        if (index !== -1) {
          state.blogs[index].comments = comments;
        }

        state.status = "succeeded";
        state.error = null;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
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
          action.type.endsWith("/fulfilled") || action.type.endsWith("/rejected"),
        (state) => {
          state.currentAction = null;
        }
      );
  },
});

export const {
  clearBlogError,
  clearSelectedBlog,
  setBlogStatusIdle,
} = blogSlice.actions;

export default blogSlice.reducer;
