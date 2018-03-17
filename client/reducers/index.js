import { combineReducers } from 'redux';
import navigation from './navigation';
import login from './login';
import projects from './projects';
import users from './users';
import milestones from './milestones';
import tasks from './tasks';
import messages from './messages';

const rootReducer = combineReducers({
  navigation,
  login,
  projects,
  users,
  milestones,
  tasks,
  messages
})

export default rootReducer;
