import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import authReducer from "../features/authentication/authSlice";
import teamsReducer from "../features/teams/teamsSlice";
import postsReducer from "../features/posts/postSlice";
import meetingReducer from "../features/meeting/meetingSlice";
import attendanceReducer from "../features/attendance/attendanceSlice";
import sidebarReducer from "../features/sidebar/sidebarSlice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const reducers = combineReducers({
  auth: authReducer,
  teams: teamsReducer,
  posts: postsReducer,
  meeting: meetingReducer,
  attendance: attendanceReducer,
  sidebar: sidebarReducer,
});

const persistConfig = {
  key: "root",
  blacklist: ["meeting"],
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  devTools: process.env.NODE_ENV === "development",
});
