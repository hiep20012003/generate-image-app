import { createSlice } from "@reduxjs/toolkit";
import * as actionTypes from "../constants/actionTypes.js";

const initialState = {
  image: "",
};

const comfySlice = createSlice({
  name: "comfy",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(`${actionTypes.RESET_IMAGE}`, () => {
        return { ...initialState };
      })
      .addCase(`${actionTypes.GENERATE_BY_TEXT}/fulfilled`, (state, action) => {
        return {
          ...state,
          image: action.payload,
        };
      })
      .addCase(
        `${actionTypes.GENERATE_BY_SKETCH}/fulfilled`,
        (state, action) => {
          return {
            ...state,
            image: action.payload,
          };
        },
      )
      .addCase(actionTypes.CANCEL_REQUEST, (state, action) => {
        return { ...initialState };
      })
  },
});

export default comfySlice.reducer;
