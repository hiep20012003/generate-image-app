import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

export const generateImageByText = (formData, cancelToken) =>
  API.post(`/comfy/generate/text`, formData, {
    cancelToken: cancelToken,
  });

export const generateImageBySketch = (formData, cancelToken) =>
  API.post(`/comfy/generate/sketch`, formData, {
    cancelToken: cancelToken,
  });
