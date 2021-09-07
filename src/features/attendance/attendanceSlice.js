import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  fileName: null,
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    setCsvData: (state, { payload }) => {
      return {
        ...state,
        data: payload.data,
        fileName: payload.fileName,
      };
    },
  },
});

export const { setCsvData } = attendanceSlice.actions;
export default attendanceSlice.reducer;

export const selectorData = (state) => state.attendance.data;
export const selectorFileName = (state) => state.attendance.fileName;
