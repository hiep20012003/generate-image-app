import { error, success, info } from "../reducers/alerts.js";

const alertMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action.type.endsWith("/rejected")) {
      dispatch(error({ message: "Has Error" }));
    }
    if (action.type.endsWith("/fulfilled")) {
      dispatch(success({ message: "Successfully" }));
    }
    if (action.type.endsWith("CANCEL_REQUEST")) {
      dispatch(info({ message: "Cancel Generate" }));
    }
    return next(action);
  };

export default alertMiddleware;
