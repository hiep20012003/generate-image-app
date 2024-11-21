import { createSlice } from "@reduxjs/toolkit";

const LIMIT = 3;

const alertsSlice = createSlice({
  name: "alerts",
  initialState: [],
  reducers: {
    info(state, action) {
      const newState = [
        ...state,
        {
          type: "info",
          message: action.payload.message,
        },
      ];
      return state.length >= LIMIT ? newState.slice(-LIMIT) : newState;
    },
    success(state, action) {
      const newState = [
        ...state,
        {
          type: "success",
          message: action.payload.message,
        },
      ];
      return state.length >= LIMIT ? newState.slice(-LIMIT) : newState;
    },
    warning(state, action) {
      const newState = [
        ...state,
        {
          type: "warning",
          message: action.payload.message,
        },
      ];
      return state.length >= LIMIT ? newState.slice(-LIMIT) : newState;
    },
    error(state, action) {
      const newState = [
        ...state,
        {
          type: "error",
          message: action.payload.message,
        },
      ];
      return state.length >= LIMIT ? newState.slice(-LIMIT) : newState;
    },
    timeOutEnd(state, action) {
      return state.slice(1);
    },
  },
});

export const { info, error, warning, success, timeOutEnd } =
  alertsSlice.actions;
export default alertsSlice.reducer;
