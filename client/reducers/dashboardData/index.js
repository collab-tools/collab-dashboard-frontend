import { combineReducers } from "redux";

import projects from "./projects";
import users from "./users";
import milestones from "./milestones";
import tasks from "./tasks";
import projectDetail from "./projectDetail";
import userDetail from "./userDetail";

const dataReducer = combineReducers({
  projects,
  users,
  milestones,
  tasks,
  projectDetail,
  userDetail
});

export default dataReducer;
