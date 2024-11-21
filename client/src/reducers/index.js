import { combineReducers } from "redux";
import comfy from "./comfy.js";
import ui from "./loading";
import alerts from "./alerts";

const reducers = combineReducers({
  comfy,
  ui,
  alerts,
});

export default reducers;
