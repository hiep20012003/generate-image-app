import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const generateImageByText = (formData) => API.post(`/comfy/generate/text`, formData);
export const generateImageBySketch = (formData) => API.post(`/comfy/generate/sketch`, formData);