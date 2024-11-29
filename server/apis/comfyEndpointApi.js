import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

const COMFY_UI_ADDRESS = process.env.COMFY_UI_ADDRESS || 'localhost';

// const API = axios.create({ baseURL: `http://${COMFY_UI_ADDRESS}` })

export const getQueuePrompt = (port ,prompt, client_id) => axios.post(`http://${COMFY_UI_ADDRESS}:${port}/prompt`, { prompt: prompt, client_id: client_id });
export const getHistory = (port,prompt_id) => axios.get(`http://${COMFY_UI_ADDRESS}:${port}/history/${prompt_id}`);
export const getView = (port,queryParams) => axios.get(`http://${COMFY_UI_ADDRESS}:${port}/view?${queryParams}`, { responseType: 'arraybuffer' });
export const uploadImage = (port,formData) => axios.post(`http://${COMFY_UI_ADDRESS}:${port}/upload/image`, formData);
// export const getQueuePrompt = (prompt) => API.post(`/prompt`, { prompt: prompt });


