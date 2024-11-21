import { error, success } from "../reducers/alerts.js";

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
    return next(action);
  };

export default alertMiddleware;
