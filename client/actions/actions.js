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
  SET_LOADING,
  GET_PROJECT_NAME,
  GET_PROJECT_MILESTONES_COUNT,
  GET_PROJECT_COMPLETED_TASKS_COUNT,
  GET_PROJECT_INCOMPLETE_TASKS_COUNT,
  GET_PROJECT_MESSAGES_COUNT,
  GET_PROJECT_COMMITS_COUNT,
  GET_PROJECT_FILE_CHANGES_COUNT,
  GET_MEMBERS_INFO,
  GET_PROJECT_ACTIVITIES,
  GET_PROJECT_GITHUB_REPO,
  GET_PROJECT_DRIVE_LINK,
  GET_PROJECT_MILESTONES,
  GET_PROJECT_TASKS_CONTRIBUTION,
  GET_PROJECT_GITHUB_ADDITIONS_COUNT,
  GET_PROJECT_GITHUB_DELETIONS_COUNT,
  GET_PROJECT_GITHUB_COMMITS,
  GET_PROJECT_GITHUB_COMMITS_CONTRIBUTION,
  GET_PROJECT_GITHUB_LOCS_CONTRIBUTION,
  GET_PROJECT_FILES_COUNT,
  GET_PROJECT_FILES_CHANGES,
  GET_PROJECT_FILES_CONTRIBUTIONS,
  GET_USER_NAME,
  GET_USER_PROJECTS_COUNT,
  GET_USER_COMPLETED_TASKS_COUNT,
  GET_USER_INCOMPLETE_TASKS_COUNT,
  GET_USER_MESSAGES_COUNT,
  GET_USER_COMMITS_COUNT,
  GET_USER_FILE_CHANGES_COUNT,
  GET_PROJECTS_INFO,
  GET_USER_ACTIVITIES,
  GET_USER_GITHUB_ACCOUNT,
  GET_USER_EMAIL,
  GET_USER_PROJECTS_TASKS,
  GET_USER_TASKS_CONTRIBUTION,
  GET_USER_GITHUB_ADDITIONS,
  GET_USER_GITHUB_DELETIONS,
  GET_USER_COMMITS,
  GET_USER_COMMITS_CONTRIBUTION,
  GET_USER_LOCS_CONTRIBUTION,
  GET_USER_FILES_COUNT,
  GET_USER_FILES_CHANGES,
  GET_USER_FILES_CONTRIBUTION
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
import { func } from "prop-types";

/*  SYNC FUNCTIONS  */

export function unauthenticateUser() {
  return {
    type: UNAUTHENTICATE_USER
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

export function _getActiveUsers(res) {
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

/*Project Detail actions*/
export function _getProjectName(res) {
  let projectName = res.name;
  return {
    type: GET_PROJECT_NAME,
    name: projectName
  };
}

export function _getProjectMilestonesCount(res) {
  let count = res.count;
  return {
    type: GET_PROJECT_MILESTONES_COUNT,
    result: count
  };
}

export function _getProjectCompletedTasksCount(res) {
  let count = res.count;
  return {
    type: GET_PROJECT_COMPLETED_TASKS_COUNT,
    result: count
  };
}

export function _getProjectIncompleteTasksCount(res) {
  let count = res.count;
  return {
    type: GET_PROJECT_INCOMPLETE_TASKS_COUNT,
    result: count
  };
}

export function _getProjectMessagesCount(res) {
  let count = res.count;
  return {
    type: GET_PROJECT_MESSAGES_COUNT,
    result: count
  };
}
export function _getProjectCommitsCount(res) {
  let count = res.count;
  return {
    type: GET_PROJECT_COMMITS_COUNT,
    result: count
  };
}
export function _getProjectFileChangesCount(res) {
  let count = res.count;
  return {
    type: GET_PROJECT_FILE_CHANGES_COUNT,
    result: count
  };
}
export function _getMembersInfo(res) {
  return {
    type: GET_MEMBERS_INFO,
    members: res
  };
}
export function _getProjectActivities(res) {
  console.log(res);
  return {
    type: GET_PROJECT_ACTIVITIES,
    activities: res
  };
}
export function _getProjectGithubRepo(res) {
  let link = res.repo ? `https://github.com/${res.owner}/${res.repo}` : null;
  return {
    type: GET_PROJECT_GITHUB_REPO,
    link
  };
}
export function _getProjectDriveLink(res) {
  let link = res.link ? "https://drive.google.com/open?id=" + res.link : null;
  return {
    type: GET_PROJECT_DRIVE_LINK,
    link
  };
}
export function _getProjectMilestones(res) {
  return {
    type: GET_PROJECT_MILESTONES,
    milestones: res
  };
}
export function _getProjectTasksContribution(res) {
  return {
    type: GET_PROJECT_TASKS_CONTRIBUTION,
    contributions: res
  };
}
export function _getProjectGithubAdditionsCount(res) {
  return {
    type: GET_PROJECT_GITHUB_ADDITIONS_COUNT,
    result: res.count
  };
}
export function _getProjectGithubDeletionsCount(res) {
  return {
    type: GET_PROJECT_GITHUB_DELETIONS_COUNT,
    result: res.count
  };
}
export function _getProjectGithubCommits(res) {
  return {
    type: GET_PROJECT_GITHUB_COMMITS,
    commits: res
  };
}
export function _getProjectGithubCommitsContribution(res) {
  return {
    type: GET_PROJECT_GITHUB_COMMITS_CONTRIBUTION,
    contributions: res
  };
}
export function _getProjectGithubLOCsContribution(res) {
  return {
    type: GET_PROJECT_GITHUB_LOCS_CONTRIBUTION,
    contributions: res
  };
}
export function _getProjectFilesCount(res) {
  return {
    type: GET_PROJECT_FILES_COUNT,
    count: res.count
  };
}
export function _getProjectFileChanges(res) {
  return {
    type: GET_PROJECT_FILES_CHANGES,
    changes: res
  };
}
export function _getProjectFilesContribution(res) {
  return {
    type: GET_PROJECT_FILES_CONTRIBUTIONS,
    contributions: res
  };
}

/*User Detail actions*/
export function _getUserName(res) {
  return {
    type: GET_USER_NAME,
    name: res.name
  };
}
export function _getUserProjectsCount(res) {
  return {
    type: GET_USER_PROJECTS_COUNT,
    count: res.count
  };
}
export function _getUserCompletedTasksCount(res) {
  return {
    type: GET_USER_COMPLETED_TASKS_COUNT,
    count: res.count
  };
}
export function _getUserIncompleteTasksCount(res) {
  return {
    type: GET_USER_INCOMPLETE_TASKS_COUNT,
    count: res.count
  };
}
export function _getUserMessagesCount(res) {
  return {
    type: GET_USER_MESSAGES_COUNT,
    count: res.count
  };
}
export function _getUserCommitsCount(res) {
  return {
    type: GET_USER_COMMITS_COUNT,
    count: res.count
  };
}
export function _getUserFileChangesCount(res) {
  return {
    type: GET_USER_FILE_CHANGES_COUNT,
    count: res.count
  };
}
export function _getProjectsInfo(res) {
  return {
    type: GET_PROJECTS_INFO,
    projects: res
  };
}
export function _getUserActivities(res) {
  return {
    type: GET_USER_ACTIVITIES,
    activities: res
  };
}
export function _getUserGithubAccount(res) {
  let link = res.account ? `https://github.com/${res.account}` : null;
  return {
    type: GET_USER_GITHUB_ACCOUNT,
    link
  };
}
export function _getUserEmail(res) {
  return {
    type: GET_USER_EMAIL,
    email: res.email
  };
}
export function _getUserProjectsTasks(res) {
  return {
    type: GET_USER_PROJECTS_TASKS,
    projects: res
  };
}
export function _getUserTasksContribution(res) {
  return {
    type: GET_USER_TASKS_CONTRIBUTION,
    contributions: res
  };
}
export function _getUserGithubAdditions(res) {
  return {
    type: GET_USER_GITHUB_ADDITIONS,
    count: res.count
  };
}
export function _getUserGithubDeletions(res) {
  return {
    type: GET_USER_GITHUB_DELETIONS,
    count: res.count
  };
}
export function _getUserCommits(res) {
  return {
    type: GET_USER_COMMITS,
    commits: res
  };
}
export function _getUserCommitsContribution(res) {
  return {
    type: GET_USER_COMMITS_CONTRIBUTION,
    contributions: res
  };
}
export function _getUserLOCsContribution(res) {
  return {
    type: GET_USER_LOCS_CONTRIBUTION,
    contributions: res
  };
}
export function _getUserFilesCount(res) {
  return {
    type: GET_USER_FILES_COUNT,
    count: res.count
  };
}
export function _getUserFileChanges(res) {
  return {
    type: GET_USER_FILES_CHANGES,
    changes: res
  };
}
export function _getUserFilesContribution(res) {
  return {
    type: GET_USER_FILES_CONTRIBUTION,
    contributions: res
  };
}
