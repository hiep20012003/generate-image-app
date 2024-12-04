import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../apis"; // Import API methods
import * as actionTypes from "../constants/actionTypes";
import { CANCEL_REQUEST } from "../constants/actionTypes";

let cancelTokenSource; // Biến để lưu `CancelToken.source`

// Thunk để gọi API Generate Image By Text
export const generateImageByText = createAsyncThunk(
  actionTypes.GENERATE_BY_TEXT,
  async (formData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    // Hủy yêu cầu trước đó (nếu có)
    if (cancelTokenSource) {
      cancelTokenSource.cancel("Previous request canceled");
    }

    // Tạo một CancelToken mới
    cancelTokenSource = axios.CancelToken.source();

    try {
      const { data } = await api.generateImageByText(
        formData,
        cancelTokenSource.token,
      );
      return data;
    } catch (error) {
      if (axios.isCancel(error)) {
        return rejectWithValue("Request canceled");
      }
      return rejectWithValue(error.message);
    }
  },
);

export const generateImageBySketch = createAsyncThunk(
  actionTypes.GENERATE_BY_TEXT,
  async (formData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    // Hủy yêu cầu trước đó (nếu có)
    if (cancelTokenSource) {
      cancelTokenSource.cancel("Previous request canceled");
    }

    // Tạo một CancelToken mới
    cancelTokenSource = axios.CancelToken.source();

    try {
      const { data } = await api.generateImageBySketch(
        formData,
        cancelTokenSource.token,
      );
      return data;
    } catch (error) {
      if (axios.isCancel(error)) {
        return rejectWithValue("Request canceled");
      }
      return rejectWithValue(error.message);
    }
  },
);

// Action để hủy yêu cầu
export const cancelGenerate = createAsyncThunk(
  actionTypes.CANCEL_REQUEST,
  async (_, thunkAPI) => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel("Operation canceled by the user");
      cancelTokenSource = null; // Reset source để không hủy lại
    }
    return "Request canceled";
  },
);
