import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TEAM_CREATE_URL, TEAM_URL } from "../../api/endpoints";
import { getHeaders } from "./../authentication/authSlice";

const initialState = {
  teamsDetail: [],
  teams: [],
  attendance: [],
  attendeesDetail: [],
  posts: [],
  meetings: [],
  members: [],
  meetingId: null,
  isOwner: false,
  name: null,
  description: null,
  privacy: null,
  isLoading: false,
  error: null,
  isCreated: false,
  isJoined: false,
  isLeaved: false,
  isDeleted: false,
  isSent: null,
  isAccept: null,
  isDecline: null,
  isRemove: null,
  dropdownValue: "public",
  count: null,
};

export const fetchTeamsAsync = createAsyncThunk(
  "teams/fetchTeamsAsync",
  async ({ joined, page, owns }, thunkAPI) => {
    try {
      const isAuthenticated = thunkAPI.getState().auth.isAuthenticated;
      const response = joined
        ? await axios.get(
            TEAM_URL + `?joined=${joined}&page=${page}`,
            getHeaders(isAuthenticated)
          )
        : await axios.get(
            TEAM_URL + `?owns=${owns}&page=${page}`,
            getHeaders(isAuthenticated)
          );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const fetchAttendanceAsync = createAsyncThunk(
  "teams/fetchAttendanceAsync",
  async ({ page, slug }, thunkAPI) => {
    try {
      const isAuthenticated = thunkAPI.getState().auth.isAuthenticated;
      const response = await axios.get(
        TEAM_URL + `${slug}/attendance/?page=${page}`,
        getHeaders(isAuthenticated)
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const fetchAttendeesAsync = createAsyncThunk(
  "teams/fetchAttendeesAsync",
  async ({ slug, id }, thunkAPI) => {
    try {
      const isAuthenticated = thunkAPI.getState().auth.isAuthenticated;
      const response = await axios.get(
        TEAM_URL + `${slug}/attendance/${id}/`,
        getHeaders(isAuthenticated)
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const createTeamAsync = createAsyncThunk(
  "teams/createTeamAsync",
  async (obj, thunkAPI) => {
    try {
      const isAuthenticated = thunkAPI.getState().auth.isAuthenticated;
      const response = await axios.post(
        TEAM_CREATE_URL,
        obj,
        getHeaders(isAuthenticated)
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchTeamsDetailsAsync = createAsyncThunk(
  "teams/fetchTeamsDetailsAsync",
  async ({ slug }, thunkAPI) => {
    try {
      const isAuthenticated = thunkAPI.getState().auth.isAuthenticated;
      const response = await axios.get(
        TEAM_URL + `${slug}`,
        getHeaders(isAuthenticated)
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const joinTeamsAsync = createAsyncThunk(
  "teams/joinTeamsAsync",
  async ({ slug }, thunkAPI) => {
    try {
      const isAuthenticated = thunkAPI.getState().auth.isAuthenticated;
      const response = await axios.post(
        TEAM_URL + `${slug}/join/`,
        {},
        getHeaders(isAuthenticated)
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data[0] });
    }
  }
);
export const leaveTeamsAsync = createAsyncThunk(
  "teams/leaveTeamsAsync",
  async ({ slug }, thunkAPI) => {
    try {
      const isAuthenticated = thunkAPI.getState().auth.isAuthenticated;
      const response = await axios.delete(
        TEAM_URL + `${slug}/leave/`,
        getHeaders(isAuthenticated)
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data[0] });
    }
  }
);
export const deleteTeamsAsync = createAsyncThunk(
  "teams/deleteTeamsAsync",
  async ({ slug }, thunkAPI) => {
    try {
      const isAuthenticated = thunkAPI.getState().auth.isAuthenticated;
      const response = await axios.delete(
        TEAM_URL + `${slug}/delete/`,
        getHeaders(isAuthenticated)
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data[0] });
    }
  }
);
export const acceptRequestAsync = createAsyncThunk(
  "teams/acceptRequestAsync",
  async ({ slug, id }, thunkAPI) => {
    try {
      const isAuthenticated = thunkAPI.getState().auth.isAuthenticated;
      const response = await axios.put(
        TEAM_URL + `${slug}/pendingmembers/${id}/approve`,
        {},
        getHeaders(isAuthenticated)
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data[0] });
    }
  }
);
export const declineRequestAsync = createAsyncThunk(
  "teams/declineRequestAsync",
  async ({ slug, id }, thunkAPI) => {
    try {
      const isAuthenticated = thunkAPI.getState().auth.isAuthenticated;
      const response = await axios.put(
        TEAM_URL + `${slug}/pendingmembers/${id}/decline`,
        {},
        getHeaders(isAuthenticated)
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data[0] });
    }
  }
);
export const removeMemberAsync = createAsyncThunk(
  "teams/removeMemberAsync",
  async ({ slug, id }, thunkAPI) => {
    try {
      const isAuthenticated = thunkAPI.getState().auth.isAuthenticated;
      const response = await axios.delete(
        TEAM_URL + `${slug}/members/${id}/remove`,
        getHeaders(isAuthenticated)
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data[0] });
    }
  }
);

const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    changePrivacy: (state, { payload }) => {
      state.dropdownValue = payload;
    },
    newPost: (state, action) => {
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    },
  },
  extraReducers: {
    [fetchTeamsAsync.pending]: (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [fetchTeamsAsync.fulfilled]: (state, { payload }) => {
      const totalPage = Math.ceil(payload.count / 6);
      return {
        teams: payload.results,
        count: totalPage,
        isLoading: false,
        dropdownValue: "public",
      };
    },
    [fetchTeamsAsync.rejected]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        dropdownValue: "public",
        error: action.error,
      };
    },
    [fetchAttendeesAsync.pending]: (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [fetchAttendeesAsync.fulfilled]: (state, { payload }) => {
      return {
        attendeesDetail: payload,
        isLoading: false,
        dropdownValue: "public",
      };
    },
    [fetchAttendeesAsync.rejected]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        dropdownValue: "public",
        error: action.error,
      };
    },
    [fetchAttendanceAsync.pending]: (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [fetchAttendanceAsync.fulfilled]: (state, { payload }) => {
      const totalPage = Math.ceil(payload.count / 6);
      return {
        attendance: payload.results,
        count: totalPage,
        isLoading: false,
        dropdownValue: "public",
      };
    },
    [fetchAttendanceAsync.rejected]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        dropdownValue: "public",
        error: action.error,
      };
    },
    [createTeamAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [createTeamAsync.fulfilled]: (state, { payload }) => {
      state.isCreated = true;
      state.isLoading = false;
    },
    [createTeamAsync.rejected]: (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    },
    [fetchTeamsDetailsAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchTeamsDetailsAsync.fulfilled]: (state, { payload }) => {
      state.teamsDetail = payload;
      state.posts = payload.channels[0].posts;
      state.meetings = payload.channels[0].meetings;
      if (state.meetings.length) {
        state.meetingId = state.meetings[0].id;
      }
      state.members = payload.members;
      payload.members.forEach((member) => {
        const username = JSON.parse(localStorage.getItem("username"));
        if (member.user.username === username) {
          state.isOwner = member.is_owner;
        }
      });
      state.isLoading = false;
    },
    [fetchTeamsDetailsAsync.rejected]: (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    },
    [joinTeamsAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [joinTeamsAsync.fulfilled]: (state, { payload }) => {
      state.isJoined = payload.approved;
      state.isLoading = false;
      state.isSent = !payload.approved;
    },
    [joinTeamsAsync.rejected]: (state, action) => {
      state.error = action.payload.error;
      state.isLoading = false;
    },
    [leaveTeamsAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [leaveTeamsAsync.fulfilled]: (state, { payload }) => {
      state.isLeaved = true;
      state.isLoading = false;
    },
    [leaveTeamsAsync.rejected]: (state, action) => {
      state.error = action.payload.error;
      state.isLoading = false;
    },
    [deleteTeamsAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteTeamsAsync.fulfilled]: (state, { payload }) => {
      state.isDeleted = true;
      state.isLoading = false;
    },
    [deleteTeamsAsync.rejected]: (state, action) => {
      state.error = action.payload.error;
      state.isLoading = false;
    },
    [acceptRequestAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [acceptRequestAsync.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isAccept = true;
      state.isDecline = false;
    },
    [acceptRequestAsync.rejected]: (state, action) => {
      state.error = action.payload.error;
      state.isLoading = false;
    },
    [declineRequestAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [declineRequestAsync.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isDecline = true;
      state.isAccept = false;
    },
    [declineRequestAsync.rejected]: (state, action) => {
      state.error = action.payload.error;
      state.isLoading = false;
    },
    [removeMemberAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [removeMemberAsync.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isRemoved = true;
    },
    [removeMemberAsync.rejected]: (state, action) => {
      state.error = action.payload.error;
      state.isLoading = false;
    },
  },
});

export const { changePrivacy, newPost } = teamsSlice.actions;
export default teamsSlice.reducer;

export const selectorIsLoading = (state) => state.teams.isLoading;
export const selectorIsJoined = (state) => state.teams.isJoined;
export const selectorIsLeaved = (state) => state.teams.isLeaved;
export const selectorCount = (state) => state.teams.count;
export const selectorTeams = (state) => state.teams.teams;
export const selectorAttendance = (state) => state.teams.attendance;
export const selectorAttendeesDetail = (state) => state.teams.attendeesDetail;
export const selectorDropdownValue = (state) => state.teams.dropdownValue;
export const selectorTeamsDetails = (state) => state.teams.teamsDetail;
export const selectorTeamName = (state) => state.teams.name;
export const selectorTeamDescription = (state) => state.teams.description;
export const selectorTeamPrivacy = (state) => state.teams.privacy;
export const selectorPosts = (state) => state.teams.posts;
export const selectorMeetings = (state) => state.teams.meetings;
export const selectorIsOwner = (state) => state.teams.isOwner;
export const selectorMeetingId = (state) => state.teams.meetingId;
