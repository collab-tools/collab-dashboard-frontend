import {
  GET_TOTAL_PROJECTS,
  GET_NEW_PROJECTS,
  GET_LATEST_PROJECTS,
  GET_ACTIVE_PROJECTS,
  GET_MILESTONES_BY_PROJECT_ID
} from '../constants/actionTypes';

import moment from 'moment';

const initialState = {
  totalProjects: -1,
  newProjects: -1,
  latestProjects: null,
  activeProjects: -1,
  milestonesByProjectId: null
}


export default function projects(state = initialState, action) {
  switch (action.type) {
    case GET_TOTAL_PROJECTS:
      return Object.assign({}, state, {
        totalProjects: action.totalProjects,
      });
    case GET_NEW_PROJECTS:
      return Object.assign({}, state, {
        newProjects: action.newProjects,
      });
    case GET_LATEST_PROJECTS: {
      let _latestProjects = action.latestProjects;
      let projectMembers = [];
      let sumProjectMemberSize = 0;
      let averageProjectSize = 0;
      // console.log('_latestProjects', _latestProjects);
      for (var i = 0; i < _latestProjects.length; i++) {
        for (var key in _latestProjects[i]) {
          if (_latestProjects[i].hasOwnProperty(key) && _latestProjects[i][key] == null) {
            _latestProjects[i][key] = 'N.A';
          }
          if (key == 'created_at') {
            _latestProjects[i][key] = moment(_latestProjects[i][key]).format("DD MMM YYYY");
          }
          if (key == 'members') {
            projectMembers = _latestProjects[i][key].split(',');
            _latestProjects[i][key] = _latestProjects[i][key].replace(",", ", ");
          }
        }
        _latestProjects[i]["project_size"] = projectMembers.length;
        sumProjectMemberSize += projectMembers.length;
      }
      averageProjectSize = (sumProjectMemberSize / _latestProjects.length).toFixed(1);
      return Object.assign({}, state, {
        latestProjects: _latestProjects,
        averageProjectSize: averageProjectSize,
      });
    }
    case GET_ACTIVE_PROJECTS:
      return Object.assign({}, state, {
        activeProjects: action.activeProjects,
      });
    case GET_MILESTONES_BY_PROJECT_ID:
      return Object.assign({}, state, {
        milestonesByProjectId: action.milestonesByProjectId,
      });
    default:
      return state;
  }
}
