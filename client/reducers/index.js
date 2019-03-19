import { combineReducers } from "redux";
import auth from "./auth";
import dashboardData from "./dashboardData";
import staffs from "./staffs";
import queryOptions from "./queryOptions";
import loading from "./loading";

const rootReducer = combineReducers({
  auth,
  dashboardData,
  staffs,
  queryOptions,
  loading
});

export default rootReducer;
