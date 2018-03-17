import {
  GET_TOTAL_USERS,
  GET_NEW_USERS,
  GET_LATEST_USERS,
  GET_ACTIVE_USERS,
  GET_INACTIVE_USERS,
  GET_RETENTION_RATE,
  GET_PROJECTS_BY_USER_ID
} from '../constants/actionTypes';

import moment from 'moment';

const initialState = {
  totalUsers: -1,
  newUsers: -1,
  latestUsers: null,
  activeUsers: -1,
  inactiveUsers: -1,
  retentionRate: -1,
  projectsByUserId: null,
  projectNamesByUserId: null,
  completedTasksByUserId: null,
  incompleteTasksByUserId: null
}

export default function users(state = initialState, action) {
  switch (action.type) {
    case GET_TOTAL_USERS:
      return Object.assign({}, state, {
        totalUsers: action.totalUsers,
      });
    case GET_NEW_USERS:
      return Object.assign({}, state, {
        newUsers: action.newUsers,
      });
    case GET_LATEST_USERS: {
      let _latestUsers = action.latestUsers;

      for (var i = 0; i < _latestUsers.length; i++) {
        for (var key in _latestUsers[i]) {
          if (_latestUsers[i].hasOwnProperty(key) && _latestUsers[i][key] == null) {
            _latestUsers[i][key] = 'N.A';
          }
          if (key == 'created_at') {
            _latestUsers[i][key] = moment(_latestUsers[i][key]).format("DD MMM YYYY");
          }
          if (key == 'user_projects') {
            _latestUsers[i][key] = _latestUsers[i][key].replace(",", ", ");
          }
        }
      }

      return Object.assign({}, state, {
        latestUsers: action.latestUsers,
      });
    }
    case GET_ACTIVE_USERS:
      return Object.assign({}, state, {
        activeUsers: action.activeUsers,
      });
    case GET_INACTIVE_USERS:
      return Object.assign({}, state, {
        inactiveUsers: action.inactiveUsers,
      });
    case GET_RETENTION_RATE:
      return Object.assign({}, state, {
        retentionRate: action.retentionRate,
      });
    case GET_PROJECTS_BY_USER_ID: {
      let _projectsByUserId =  action.projectsByUserId;
      let _projectNamesByUserId = [];
      let _completedTasksByUserId = [];
      let _incompleteTasksByUserId = [];

      for (var i = 0; i < _projectsByUserId.length; i++) {
        for (var key in _projectsByUserId[i]) {
          if (_projectsByUserId[i].hasOwnProperty(key) && _projectsByUserId[i][key] == null) {
            _projectsByUserId[i][key] = 'N.A';
          }
          if (key == 'project_name') {
            _projectNamesByUserId.push(_projectsByUserId[i][key]);
          }
          if (key == 'num_tasks_completed') {
            _completedTasksByUserId.push(parseInt(_projectsByUserId[i][key]));
          }
          if (key == 'num_tasks_incomplete') {
            _incompleteTasksByUserId.push(parseInt(_projectsByUserId[i][key]));
          }
        }
      }

      return Object.assign({}, state, {
        projectsByUserId: action.projectsByUserId,
        projectNamesByUserId: _projectNamesByUserId,
        completedTasksByUserId: _completedTasksByUserId,
        incompleteTasksByUserId: _incompleteTasksByUserId
      });
    }
    default:
      return state;
  }
}
