import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../api/endpoints";
import { getMultiFormHeaders } from "../authentication/authSlice";

const initialState = {
  isLoading: false,
  isCreated: false,
  message: "",
  error: null,
};

export const createPostAsync = createAsyncThunk(
  "posts/createPostAsync",
  async ({ slug, channelSlug, message }, thunkAPI) => {
    try {
      const isAuthenticated = thunkAPI.getState().auth.isAuthenticated;
      const response = await axios.post(
        API_URL + `teams/${slug}/channels/${channelSlug}/posts/create/`,
        message,
        getMultiFormHeaders(isAuthenticated)
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [createPostAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [createPostAsync.fulfilled]: (state, action) => {
      return {
        isCreated: true,
        isLoading: false,
      };
    },
    [createPostAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
  },
});

export default postSlice.reducer;
