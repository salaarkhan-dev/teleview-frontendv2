import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL, TEAM_URL } from "../../api/endpoints";
import { getHeaders } from "../authentication/authSlice";

const initialState = {
  meeting: [],
  meeting_members: [],
  meetingIDs: null,
  meetingTitle: null,
  isCreated: false,
  isLoading: false,
  users: [],
  error: null,
};

export const createMeetingAsync = createAsyncThunk(
  "meeting/createMeetingAsync",
  async (obj, thunkAPI) => {
    try {
      console.log(obj.location);
      const isAuthenticated = thunkAPI.getState().auth.isAuthenticated;
      const response = await axios.post(
        `${API_URL}${obj.location.substring(1)}/meetings/create/`,
        {
          title: obj.title,
        },
        getHeaders(isAuthenticated)
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchMeetingDetailAsync = createAsyncThunk(
  "meeting/fetchMeetingDetailAsync",
  async (obj, thunkAPI) => {
    try {
      const isAuthenticated = thunkAPI.getState().auth.isAuthenticated;
      const response = await axios.get(
        `${TEAM_URL}${obj.slug}/channels/${obj.channelSlug}/meetings/${obj.meetingId}/`,
        getHeaders(isAuthenticated)
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const meetingSlice = createSlice({
  name: "meeting",
  initialState,
  reducers: {
    joinMember: (state, { payload }) => {
      return {
        ...state,
        meeting_members: [
          ...state.meeting_members,
          {
            ...payload,
          },
        ],
      };
    },
    updateMember: (state, { payload }) => {
      const index = state.meeting_members.findIndex(
        (meeting_member) => meeting_member.id === payload.id
      );

      return {
        ...state,
        meeting_members: state.meeting_members.map((meeting_member, i) =>
          i === index
            ? {
                ...meeting_member,
                attentiveness_score: payload.attentiveness_score,
                expression: payload.expression,
              }
            : meeting_member
        ),
      };
    },
    leaveMember: (state, { payload }) => {
      return {
        ...state,
        meeting_members: payload,
      };
    },
    userJoin: (state, { payload }) => {
      state.users = [...state.users, payload];
    },
    userLeft: (state, { payload }) => {
      return {
        ...state,
        users: state.users.filter((oldUser) => oldUser.uid !== payload.uid),
      };
    },
  },
  extraReducers: {
    [createMeetingAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [createMeetingAsync.fulfilled]: (state, { payload }) => {
      state.isCreated = true;
      state.meetingIDs = payload.id;
      state.meetingTitle = payload.title;
      state.isLoading = false;
    },
    [createMeetingAsync.rejected]: (state, action) => {
      state.isCreated = false;
      state.error = action.error;
      state.isLoading = false;
    },
    [fetchMeetingDetailAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchMeetingDetailAsync.fulfilled]: (state, { payload }) => {
      state.meeting_members = payload.meeting_members;
      state.meeting = payload;
      state.meetingTitle = payload.title;
      state.isLoading = false;
    },
    [fetchMeetingDetailAsync.rejected]: (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    },
  },
});

export const { userJoin, userLeft, joinMember, leaveMember, updateMember } =
  meetingSlice.actions;
export default meetingSlice.reducer;

export const selectorIsLoading = (state) => state.meeting.isLoading;
export const selectorMeetingMembers = (state) => state.meeting.meeting_members;
export const selectorMeetingIDs = (state) => state.meeting.meetingIDs;
export const selectorMeetingTitle = (state) => state.meeting.meetingTitle;
export const selectorMeetingUsers = (state) => state.meeting.users;
