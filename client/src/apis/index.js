import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

export const generateImageByText = (formData) => API.post(`/comfy/generate/text`, formData);
export const generateImageBySketch = (formData) => API.post(`/comfy/generate/sketch`, formData);