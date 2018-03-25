import { combineReducers } from 'redux';
import navigation from './navigation';
import login from './login';
import projects from './projects';
import users from './users';
import milestones from './milestones';
import tasks from './tasks';

const rootReducer = combineReducers({
  navigation,
  login,
  projects,
  users,
  milestones,
  tasks
})

export default rootReducer;
