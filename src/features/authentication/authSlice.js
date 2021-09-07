import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  USER_LOGIN_URL,
  USER_REGISTER_URL,
  USER_URL,
} from "../../api/endpoints";

const initialState = {
  isAuthenticated: localStorage.getItem("token") ? true : false,
  isSignedUp: false,
  isUpdated: false,
  username: null,
  token: null,
  avatar: null,
  bio: null,
  email: null,
  name: null,
  isLoading: false,
  saveUserLoading: false,
  error: null,
};

export const getHeaders = (isAuthenticated) => {
  if (isAuthenticated) {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: "Token " + token.replace(/["]+/g, "") },
    };
    return config;
  }
  return null;
};
export const getMultiFormHeaders = (isAuthenticated) => {
  if (isAuthenticated) {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: "Token " + token.replace(/["]+/g, ""),
        "content-type":
          "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
        Accept: "*/*",
      },
    };
    return config;
  }
  return null;
};
export const signInAsync = createAsyncThunk(
  "auth/signInAsync",
  async (obj, thunkAPI) => {
    try {
      const isAuthenticated = thunkAPI.getState().auth.isAuthenticated;
      const response = await axios.post(
        USER_LOGIN_URL,
        obj,
        getHeaders(isAuthenticated)
      ); //where you want to fetch data
      await localStorage.setItem("token", JSON.stringify(response.data.token));
      await localStorage.setItem(
        "username",
        JSON.stringify(response.data.username)
      );
      return await response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const signUpAsync = createAsyncThunk(
  "auth/signUpAsync",
  async (obj, thunkAPI) => {
    try {
      const isAuthenticated = thunkAPI.getState().auth.isAuthenticated;
      const response = await axios.post(
        USER_REGISTER_URL,
        obj,
        getHeaders(isAuthenticated)
      ); //where you want to fetch data
      return await response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchUserAsync = createAsyncThunk(
  "auth/fetchUserAsync",
  async (username, thunkAPI) => {
    try {
      const isAuthenticated = thunkAPI.getState().auth.isAuthenticated;
      const response = await axios.get(
        USER_URL + username,
        getHeaders(isAuthenticated)
      ); //where you want to fetch data
      return await response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.reponse.data[0] });
    }
  }
);
export const updateUserAsync = createAsyncThunk(
  "auth/updateUserAsync",
  async ({ username, formdata }, thunkAPI) => {
    try {
      const isAuthenticated = thunkAPI.getState().auth.isAuthenticated;
      const response = await axios.patch(
        USER_URL + username + "/edit/",
        formdata,
        getMultiFormHeaders(isAuthenticated)
      ); //where you want to fetch data
      return await response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("selected-index");
    },
  },
  extraReducers: {
    [signInAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [signInAsync.fulfilled]: (state, { payload }) => {
      return {
        ...payload,
        isLoading: false,
        isAuthenticated: localStorage.getItem("token") ? true : false,
        error: null,
      };
    },
    [signInAsync.rejected]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: localStorage.getItem("token") ? true : false,
        error: action.error,
      };
    },
    [signUpAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [signUpAsync.fulfilled]: (state, { payload }) => {
      return {
        ...payload,
        isLoading: false,
        isSignedUp: true,
        error: null,
      };
    },
    [signUpAsync.rejected]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSignedUp: false,
        error: action.error,
      };
    },
    [fetchUserAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchUserAsync.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        ...payload,
        isLoading: false,
      };
    },
    [fetchUserAsync.rejected]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    },
    [updateUserAsync.pending]: (state, action) => {
      state.saveUserLoading = true;
    },
    [updateUserAsync.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        ...payload,
        isUpdated: true,
        saveUserLoading: false,
      };
    },
    [updateUserAsync.rejected]: (state, action) => {
      return {
        ...state,
        saveUserLoading: false,
        isUpdated: false,
        error: action.error,
      };
    },
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

export const selectorIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectorIsLoading = (state) => state.auth.isLoading;
export const selectorSaveUserLoading = (state) => state.auth.saveUserLoading;
export const selectorUsername = (state) => state.auth.username;
export const selectorAvatar = (state) => state.auth.avatar;
export const selectorName = (state) => state.auth.name;
export const selectorUser = (state) => {
  return {
    name: state.auth.name,
    bio: state.auth.bio,
    email: state.auth.email,
    profilePic: state.auth.avatar,
  };
};
