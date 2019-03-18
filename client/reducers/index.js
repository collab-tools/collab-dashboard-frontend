import { combineReducers } from "redux";
import auth from "./auth";
import projects from "./projects";
import users from "./users";
import milestones from "./milestones";
import tasks from "./tasks";
import staffs from "./staffs";
import queryOptions from "./queryOptions";

const rootReducer = combineReducers({
  auth,
  projects,
  users,
  milestones,
  tasks,
  staffs,
  queryOptions
});

export default rootReducer;
