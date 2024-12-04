import { error, success, info } from "../reducers/alerts.js";

const alertMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action.type.endsWith("/rejected")) {
      if (action.payload !== "Request canceled") {
        dispatch(error({ message: "Has Errors" }));
      }
    }
    if (action.type.endsWith("/fulfilled")) {
      if (action.payload !== "Request canceled") {
        dispatch(success({ message: "Successfully" }));
      }
    }
    if (action.type.endsWith("CANCEL_REQUEST/fulfilled")) {
      dispatch(info({ message: "Canceled" }));
    }
    return next(action);
  };

export default alertMiddleware;
