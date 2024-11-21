import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { isLoading: false, loadingCount: 0 },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.match(/^(GENERATE).*\/pending$/i),
        (state) => {
          state.loadingCount += 1;
          state.isLoading = true;
        },
      )
      .addMatcher(
        (action) => action.type.match(/^(GENERATE).*\/(fulfilled|rejected)$/i),
        (state) => {
          state.loadingCount -= 1;
          state.isLoading = state.loadingCount > 0;
        },
      );
  },
});

export default uiSlice.reducer;
