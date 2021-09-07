import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggle: true,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    sidebarToggler: (state, action) => {
      return {
        toggle: !action.payload,
      };
    },
  },
});

export const { sidebarToggler } = sidebarSlice.actions;
export default sidebarSlice.reducer;

export const selectorSidebarToggle = (state) => state.sidebar.toggle;
