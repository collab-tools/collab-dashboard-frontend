import axios from "axios";

import {
  CHANGE_CONTENT_TYPE,

  AUTHENTICATE_USER,
  UNAUTHENTICATE_USER,

  GET_TOTAL_PROJECTS,
  GET_NEW_PROJECTS,
  GET_LATEST_PROJECTS,
  GET_ACTIVE_PROJECTS,
  GET_MILESTONES_BY_PROJECT_ID,

  GET_TOTAL_USERS,
  GET_NEW_USERS,
  GET_LATEST_USERS,
  GET_ACTIVE_USERS,
  GET_INACTIVE_USERS,
  GET_RETENTION_RATE,
  GET_PROJECTS_BY_USER_ID,

  GET_TOTAL_MILESTONES,
  GET_COMPLETED_MILESTONES,
  GET_AVERAGE_MILESTONES_PER_PROJECT,
  GET_AVERAGE_TASKS_PER_MILESTONE,
  GET_MILESTONES_COMPLETION_DATA,
  GET_MILESTONES_DEADLINES_MISSED_RATE,
  GET_MILESTONES_FEATURE_UTILIZATION_RATE,

  GET_TOTAL_TASKS,
  GET_PENDING_TASKS,
  GET_COMPLETED_TASKS,
  GET_TASKS_COMPLETION_DATA,
  GET_TASKS_FEATURE_UTILIZATION_RATE,

  GET_TOTAL_MESSAGES
} from '../constants/actionTypes';

const rootApi = 'http://localhost:3001'

/*  SYNC FUNCTIONS  */

export function changeContentType(contentType) {
  return {
    type: CHANGE_CONTENT_TYPE,
    contentType,
  }
};

export function unauthenticateUser() {
  return {
    type: UNAUTHENTICATE_USER,
  }
};

/*  ASYNC FUNCTIONS  */

export function authenticateUser(username, password) {
  let url = rootApi + '/login';
  return (dispatch) => {
    return axios.post(url, {
        username: username,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => {
        // console.log('authenticateUser ', response.data);
        dispatch(_authenticateUser(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function getTotalProjects(startDate, endDate) {
  let url = rootApi + '/projects/count';
  return (dispatch) => {
    return axios.post(url, {
        startDate: startDate,
        endDate: endDate
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => {
        // console.log('getTotalProjects ', response.data);
        dispatch(_getTotalProjects(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function getNewProjects(startDate, endDate) {
  let url = rootApi + '/projects/num-created-between-dates';
  return (dispatch) => {
    return axios.post(url, {
        startDate: startDate,
        endDate: endDate
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => {
        // console.log('getNewProjects ', response.data);
        dispatch(_getNewProjects(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function getLatestProjects(maxEntries) {
  let url = rootApi + '/projects/latest';
  return (dispatch) => {
    return axios.post(url, {
        maxProjects: maxEntries
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => {
        // console.log('getLatestProjects ', response.data);
        dispatch(_getLatestProjects(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function getActiveProjects(startDate, endDate) {
  let url = rootApi + '/projects/active-rate-between-dates';
  return (dispatch) => {
    return axios.post(url, {
        startDate: startDate,
        endDate: endDate
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => {
        // console.log('getActiveProjects ', response.data);
        dispatch(_getActiveProjects(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function getMilestonesByProjectId(projectId) {
  let url = rootApi + '/projects/milestones';
  // console.log('getMilestonesByProjectId', projectId);
  return (dispatch) => {
    return axios.post(url, {
        projectId: projectId
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => {
        // console.log('getMilestonesByProjectId ', response.data);
        dispatch(_getMilestonesByProjectId(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function getTotalUsers(jwtToken, startDate, endDate) {
  let url = rootApi + '/users/count';
  // console.log(jwtToken);
  return (dispatch) => {
    return axios.post(url, {
        startDate: startDate,
        endDate: endDate
      }, {
        headers: {
          Authorization: jwtToken,
          'Content-Type': 'application/json',
        }
      }).then(response => {
        // console.log('getTotalUsers ', response.data);
        dispatch(_getTotalUsers(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function getNewUsers(startDate, endDate) {
  let url = rootApi + '/users/num-created-between-dates';
  return (dispatch) => {
    return axios.post(url, {
        startDate: startDate,
        endDate: endDate
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => {
        // console.log('getNewUsers ', response.data);
        dispatch(_getNewUsers(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function getLatestUsers(maxEntries) {
  let url = rootApi + '/users/latest';
  return (dispatch) => {
    return axios.post(url, {
        maxUsers: maxEntries
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => {
        // console.log('getLatestUsers ', response.data);
        dispatch(_getLatestUsers(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function getActiveUsers(startDate, endDate) {
  let url = rootApi + '/users/num-updated-between-dates';
  return (dispatch) => {
    return axios.post(url, {
        startDate: startDate,
        endDate: endDate
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => {
        // console.log('getActiveUsers ', response.data);
        dispatch(_getActiveUsers(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function getInactiveUsers(startDate, endDate) {
  let url = rootApi + '/users/num-not-updated-between-dates';
  return (dispatch) => {
    return axios.post(url, {
        startDate: startDate,
        endDate: endDate
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => {
        // console.log('getInactiveUsers ', response.data);
        dispatch(_getInactiveUsers(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
}

export function getRetentionRate(startDate, endDate) {
  let url = rootApi + '/users/retention-rate';
  return (dispatch) => {
    return axios.post(url, {
        startDate: startDate,
        endDate: endDate
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => {
        // console.log('getRetentionRate ', response.data);
        dispatch(_getRetentionRate(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
}

export function getProjectsByUserId(userId) {
  let url = rootApi + '/users/projects';
  console.log('getProjectsByUserId', userId);
  return (dispatch) => {
    return axios.post(url, {
        userId: userId
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => {
        // console.log('getProjectsByUserId ', response.data);
        dispatch(_getProjectsByUserId(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function getTotalMilestones(startDate, endDate) {
  let url = rootApi + '/milestones/count';
  return (dispatch) => {
    return axios.post(url, {
        startDate: startDate,
        endDate: endDate
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => {
        // console.log('getTotalMilestones ', response.data);
        dispatch(_getTotalMilestones(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function getCompletedMilestones(startDate, endDate) {
  let url = rootApi + '/milestones/completed-count';
  return (dispatch) => {
    return axios.post(url, {
        startDate: startDate,
        endDate: endDate
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => {
        // console.log('getCompletedMilestones ', response.data);
        dispatch(_getCompletedMilestones(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function getAverageMilestonesPerProject(startDate, endDate) {
  let url = rootApi + '/milestones/average-milestones-per-project';
  return (dispatch) => {
    return axios.post(url, {
        startDate: startDate,
        endDate: endDate
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => {
        // console.log('getAverageMilestonesPerProject ', response.data);
        dispatch(_getAverageMilestonesPerProject(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function getAverageTasksPerMilestone(startDate, endDate) {
  let url = rootApi + '/milestones/average-tasks-per-milestone';
  return (dispatch) => {
    return axios.post(url, {
        startDate: startDate,
        endDate: endDate
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => {
        // console.log('getAverageTasksPerMilestone ', response.data);
        dispatch(_getAverageTasksPerMilestone(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function getMilestonesCompletionData(startDate, endDate) {
  let url = rootApi + '/milestones/time-taken-data';
  return (dispatch) => {
    return axios.post(url, {
        startDate: startDate,
        endDate: endDate
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => {
        // console.log('getMilestonesCompletionData ', response.data);
        dispatch(_getMilestonesCompletionData(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function getMilestonesDeadlinesMissedRate(startDate, endDate) {
  let url = rootApi + '/milestones/ratio-deadlines-missed';
  return (dispatch) => {
    return axios.post(url, {
        startDate: startDate,
        endDate: endDate
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => {
        // console.log('getMilestonesDeadlinesMissedRate ', response.data);
        dispatch(_getMilestonesDeadlinesMissedRate(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function getMilestonesFeatureUtilizationRate(startDate, endDate) {
  let url = rootApi + '/milestones/feature-utilization';
  return (dispatch) => {
    return axios.post(url, {
        startDate: startDate,
        endDate: endDate
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => {
        // console.log('getMilestonesFeatureUtilizationRate ', response.data);
        dispatch(_getMilestonesFeatureUtilizationRate(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function getTotalTasks(startDate, endDate) {
  let url = rootApi + '/tasks/count';
  return (dispatch) => {
    return axios.post(url, {
        startDate: startDate,
        endDate: endDate
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => {
        // console.log('getTotalTasks ', response.data);
        dispatch(_getTotalTasks(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function getPendingTasks(startDate, endDate) {
  let url = rootApi + '/tasks/count-pending';
  return (dispatch) => {
    return axios.post(url, {
        startDate: startDate,
        endDate: endDate
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => {
        // console.log('getPendingTasks ', response.data);
        dispatch(_getPendingTasks(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function getCompletedTasks(startDate, endDate) {
  let url = rootApi + '/tasks/count-completed';
  return (dispatch) => {
    return axios.post(url, {
        startDate: startDate,
        endDate: endDate
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => {
        // console.log('getCompletedTasks ', response.data);
        dispatch(_getCompletedTasks(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function getTasksCompletionData(startDate, endDate) {
  let url = rootApi + '/tasks/complete-time-data';
  return (dispatch) => {
    return axios.post(url, {
        startDate: startDate,
        endDate: endDate
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => {
        // console.log('getTasksCompletionData ', response.data);
        dispatch(_getTasksCompletionData(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function getTasksFeatureUtilizationRate(startDate, endDate) {
  let url = rootApi + '/tasks/feature-utilization';
  return (dispatch) => {
    return axios.post(url, {
        startDate: startDate,
        endDate: endDate
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => {
        // console.log('getTasksFeatureUtilizationRate ', response.data);
        dispatch(_getTasksFeatureUtilizationRate(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function getTotalMessages(startDate, endDate) {
  let url = rootApi + '/messages/count';
  return (dispatch) => {
    return axios.post(url, {
        startDate: startDate,
        endDate: endDate
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => {
        // console.log('getTotalMessages ', response.data);
        dispatch(_getTotalMessages(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

/*  SUCCESS FUNCTIONS  */

export function _authenticateUser(res) {
  let loginToken = res;
  return {
    type: AUTHENTICATE_USER,
    loginToken,
  }
};

export function _getTotalProjects(res) {
  let totalProjects = res.count;
  return {
    type: GET_TOTAL_PROJECTS,
    totalProjects,
  }
};

export function _getNewProjects(res) {
  let newProjects = res.count;
  return {
    type: GET_NEW_PROJECTS,
    newProjects,
  }
};


export function _getLatestProjects(res) {
  let latestProjects = res;
  return {
    type: GET_LATEST_PROJECTS,
    latestProjects,
  }
};

export function _getActiveProjects(res) {
  let activeProjects = res.rate;
  return {
    type: GET_ACTIVE_PROJECTS,
    activeProjects,
  }
};

export function _getMilestonesByProjectId(res) {
  let milestonesByProjectId = res;
  return {
    type: GET_MILESTONES_BY_PROJECT_ID,
    milestonesByProjectId,
  }
};

export function _getTotalUsers(res) {
  let totalUsers = res.count;
  return {
    type: GET_TOTAL_USERS,
    totalUsers,
  }
};

export function _getNewUsers(res) {
  let newUsers = res.count;
  return {
    type: GET_NEW_USERS,
    newUsers,
  }
};

export function _getLatestUsers(res) {
  let latestUsers = res;
  return {
    type: GET_LATEST_USERS,
    latestUsers,
  }
};

export function _getActiveUsers(res) {
  let activeUsers = res.count;
  return {
    type: GET_ACTIVE_USERS,
    activeUsers,
  }
};

export function _getInactiveUsers(res) {
  let inactiveUsers = res.count;
  return {
    type: GET_INACTIVE_USERS,
    inactiveUsers,
  }
};

export function _getRetentionRate(res) {
  let retentionRate = res.rate;
  return {
    type: GET_RETENTION_RATE,
    retentionRate,
  }
};

export function _getProjectsByUserId(res) {
  let projectsByUserId = res;
  return {
    type: GET_PROJECTS_BY_USER_ID,
    projectsByUserId,
  }
};

export function _getTotalMilestones(res) {
  let totalMilestones = res.count;
  return {
    type: GET_TOTAL_MILESTONES,
    totalMilestones,
  }
};

export function _getCompletedMilestones(res) {
  let completedMilestones = res.count;
  return {
    type: GET_COMPLETED_MILESTONES,
    completedMilestones,
  }
};

export function _getAverageMilestonesPerProject(res) {
  let averageMilestonesPerProject = res.result;
  return {
    type: GET_AVERAGE_MILESTONES_PER_PROJECT,
    averageMilestonesPerProject,
  }
};

export function _getAverageTasksPerMilestone(res) {
  let averageTasksPerMilestone = res.result;
  return {
    type: GET_AVERAGE_TASKS_PER_MILESTONE,
    averageTasksPerMilestone,
  }
};

export function _getMilestonesCompletionData(res) {
  let milestonesCompletionData = res.data;
  return {
    type: GET_MILESTONES_COMPLETION_DATA,
    milestonesCompletionData,
  }
};

export function _getMilestonesDeadlinesMissedRate(res) {
  let deadlinesMissedRate = res.result;
  return {
    type: GET_MILESTONES_DEADLINES_MISSED_RATE,
    deadlinesMissedRate,
  }
};

export function _getMilestonesFeatureUtilizationRate(res) {
  let featureUtilizationRate = res.result;
  return {
    type: GET_MILESTONES_FEATURE_UTILIZATION_RATE,
    featureUtilizationRate,
  }
};


export function _getTotalTasks(res) {
  let totalTasks = res.count;
  return {
    type: GET_TOTAL_TASKS,
    totalTasks,
  }
};

export function _getPendingTasks(res) {
  let pendingTasks = res.count;
  return {
    type: GET_PENDING_TASKS,
    pendingTasks,
  }
};

export function _getCompletedTasks(res) {
  let completedTasks = res.count;
  return {
    type: GET_COMPLETED_TASKS,
    completedTasks,
  }
};

export function _getTasksCompletionData(res) {
  let tasksCompletionData = res.data;
  return {
    type: GET_TASKS_COMPLETION_DATA,
    tasksCompletionData,
  }
};

export function _getTasksFeatureUtilizationRate(res) {
  let featureUtilizationRate = res.result;
  return {
    type: GET_TASKS_FEATURE_UTILIZATION_RATE,
    featureUtilizationRate,
  }
};

export function _getTotalMessages(res) {
  let totalMessages = res.count;
  return {
    type: GET_TOTAL_MESSAGES,
    totalMessages,
  }
};
