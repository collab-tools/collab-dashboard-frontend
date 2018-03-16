import { combineReducers } from 'redux';
import navigation from './navigation';
import login from './login';
import users from './users';
import milestones from './milestones';
import projects from './projects';
import tasks from './tasks';
import messages from './messages';

const rootReducer = combineReducers({
  navigation,
  login,
  users,
  milestones,
  projects,
  messages,
  tasks,
})

export default rootReducer;
