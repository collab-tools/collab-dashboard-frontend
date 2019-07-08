import axios from "axios";
// TODO: axios can add some common settings

import {
  AUTHENTICATE_USER,
  UNAUTHENTICATE_USER,
  GET_ALL_STAFFS,
  GET_STAFF_DETAILS,
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
  SET_MAX_ENTRIES,
  SET_RECENCY_DAYS,
  SET_LOADING
} from "../constants/actionTypes";

import {
  ROOT_API,
  AUTHENTICATE_USER_URL,
  GET_ALL_STAFF_URL,
  GET_STAFF_DETAILS_URL,
  CREATE_STAFF_URL,
  UPDATE_STAFF_URL
} from "../constants/url";

import { DEV_KEY } from "../constants/secret";

/*  SYNC FUNCTIONS  */

export function unauthenticateUser() {
  return {
    type: UNAUTHENTICATE_USER
  };
}

export function setMaxEntries(maxEntries) {
  return {
    type: SET_MAX_ENTRIES,
    maxEntries
  };
}

export function setRecencyDays(recencyDays) {
  return {
    type: SET_RECENCY_DAYS,
    recencyDays
  };
}

export function setLoading(isLoading) {
  return {
    type: SET_LOADING,
    isLoading
  };
}
/*  ASYNC FUNCTIONS  */

export function authenticateUser(username, password) {
  // return createStaff("admin", username, password, true, console.log);
  let url = ROOT_API + AUTHENTICATE_USER_URL;
  return dispatch => {
    return axios
      .post(
        url,
        {
          username,
          password
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(response => {
        // console.log('authenticateUser ', response.data);
        dispatch(_authenticateUser(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function createStaff(name, username, password, isAdmin, callback) {
  let url = ROOT_API + CREATE_STAFF_URL;
  return dispatch => {
    return axios
      .post(
        url,
        {
          devKey: DEV_KEY,
          name,
          username,
          password,
          isAdmin
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(response => {
        console.log("createStaff is returned", response.data);
        callback(response.data.staff.id);
      })
      .catch(error => {
        throw error;
      });
  };
}

export function updateStaff(name, username, password, isAdmin, callback) {
  let url = ROOT_API + UPDATE_STAFF_URL;
  return dispatch => {
    return axios
      .put(
        url,
        {
          devKey: DEV_KEY,
          name,
          username,
          password,
          isAdmin
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(response => {
        console.log("updateStaff is returned", response.data);
        callback(response.data.staff.id);
      })
      .catch(error => {
        throw error;
      });
  };
}

export function getAllStaffs() {
  let url = ROOT_API + GET_ALL_STAFF_URL;
  return dispatch => {
    return axios
      .get(url)
      .then(response => {
        // console.log('authenticateUser ', response.data);
        console.log("getAllStaffs is returned", response.data);
        dispatch(_getAllStaffs(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function getStaffDetails(id) {
  let url = ROOT_API + GET_STAFF_DETAILS_URL;
  return dispatch => {
    return axios
      .post(
        url,
        {
          devKey: DEV_KEY,
          id
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(response => {
        // console.log('authenticateUser ', response.data);
        console.log("getStaffDetails is returned", response.data);
        dispatch(_getStaffDetails(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function fetchData(fetches) {
  return dispatch => {
    dispatch(setLoading(true));

    Promise.all(fetches).then(actions => {
      actions.forEach(dispatch);
      setTimeout(() => dispatch(setLoading(false)), 0);
    });
  };
}

/*  SUCCESS FUNCTIONS  */

function _authenticateUser(res) {
  let loginToken = res;
  return {
    type: AUTHENTICATE_USER,
    loginToken
  };
}

function _getAllStaffs(res) {
  let staffs = res.success;
  return {
    type: GET_ALL_STAFFS,
    staffs
  };
}

function _getStaffDetails(res) {
  console.log(res);
  let staffDetails = res;
  return {
    type: GET_STAFF_DETAILS,
    staffDetails
  };
}

export function _getTotalProjects(res) {
  let totalProjects = res.count;
  return {
    type: GET_TOTAL_PROJECTS,
    totalProjects
  };
}

export function _getNewProjects(res) {
  let newProjects = res.count;
  return {
    type: GET_NEW_PROJECTS,
    newProjects
  };
}

export function _getLatestProjects(res) {
  let latestProjects = res;
  return {
    type: GET_LATEST_PROJECTS,
    latestProjects
  };
}

export function _getActiveProjects(res) {
  let activeProjects = res.rate;
  return {
    type: GET_ACTIVE_PROJECTS,
    activeProjects
  };
}

export function _getMilestonesByProjectId(res) {
  let milestonesByProjectId = res;
  return {
    type: GET_MILESTONES_BY_PROJECT_ID,
    milestonesByProjectId
  };
}

export function _getTotalUsers(res) {
  let totalUsers = res.count;
  return {
    type: GET_TOTAL_USERS,
    totalUsers
  };
}

export function _getNewUsers(res) {
  let newUsers = res.count;
  return {
    type: GET_NEW_USERS,
    newUsers
  };
}

export function _getLatestUsers(res) {
  let latestUsers = res;
  return {
    type: GET_LATEST_USERS,
    latestUsers
  };
}

function _getActiveUsers(res) {
  let activeUsers = res.count;
  return {
    type: GET_ACTIVE_USERS,
    activeUsers
  };
}

export function _getInactiveUsers(res) {
  let inactiveUsers = res.count;
  return {
    type: GET_INACTIVE_USERS,
    inactiveUsers
  };
}

export function _getRetentionRate(res) {
  let retentionRate = res.rate;
  return {
    type: GET_RETENTION_RATE,
    retentionRate
  };
}

export function _getProjectsByUserId(res) {
  let projectsByUserId = res;
  return {
    type: GET_PROJECTS_BY_USER_ID,
    projectsByUserId
  };
}

export function _getTotalMilestones(res) {
  let totalMilestones = res.count;
  return {
    type: GET_TOTAL_MILESTONES,
    totalMilestones
  };
}

export function _getCompletedMilestones(res) {
  let completedMilestones = res.count;
  return {
    type: GET_COMPLETED_MILESTONES,
    completedMilestones
  };
}

export function _getAverageMilestonesPerProject(res) {
  let averageMilestonesPerProject = res.result;
  return {
    type: GET_AVERAGE_MILESTONES_PER_PROJECT,
    averageMilestonesPerProject
  };
}

export function _getAverageTasksPerMilestone(res) {
  let averageTasksPerMilestone = res.result;
  return {
    type: GET_AVERAGE_TASKS_PER_MILESTONE,
    averageTasksPerMilestone
  };
}

export function _getMilestonesCompletionData(res) {
  let milestonesCompletionData = res.data;
  return {
    type: GET_MILESTONES_COMPLETION_DATA,
    milestonesCompletionData
  };
}

export function _getMilestonesDeadlinesMissedRate(res) {
  let deadlinesMissedRate = res.result;
  return {
    type: GET_MILESTONES_DEADLINES_MISSED_RATE,
    deadlinesMissedRate
  };
}

export function _getMilestonesFeatureUtilizationRate(res) {
  let featureUtilizationRate = res.result;
  return {
    type: GET_MILESTONES_FEATURE_UTILIZATION_RATE,
    featureUtilizationRate
  };
}

export function _getTotalTasks(res) {
  let totalTasks = res.count;
  return {
    type: GET_TOTAL_TASKS,
    totalTasks
  };
}

export function _getPendingTasks(res) {
  let pendingTasks = res.count;
  return {
    type: GET_PENDING_TASKS,
    pendingTasks
  };
}

export function _getCompletedTasks(res) {
  let completedTasks = res.count;
  return {
    type: GET_COMPLETED_TASKS,
    completedTasks
  };
}

export function _getTasksCompletionData(res) {
  let tasksCompletionData = res.data;
  return {
    type: GET_TASKS_COMPLETION_DATA,
    tasksCompletionData
  };
}

export function _getTasksFeatureUtilizationRate(res) {
  let featureUtilizationRate = res.result;
  return {
    type: GET_TASKS_FEATURE_UTILIZATION_RATE,
    featureUtilizationRate
  };
}
