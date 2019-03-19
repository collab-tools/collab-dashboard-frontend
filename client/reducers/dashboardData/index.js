import { combineReducers } from "redux";

import projects from "./projects";
import users from "./users";
import milestones from "./milestones";
import tasks from "./tasks";

const dataReducer = combineReducers({
  projects,
  users,
  milestones,
  tasks
});

export default dataReducer;
