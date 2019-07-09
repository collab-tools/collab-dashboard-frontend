import axios from "axios";
import { ROOT_API } from "../constants/url";
import {
  _getTotalProjects,
  _getNewProjects,
  _getLatestProjects,
  _getActiveProjects,
  _getMilestonesByProjectId,
  _getTotalUsers,
  _getNewUsers,
  _getLatestUsers,
  _getInactiveUsers,
  _getRetentionRate,
  _getProjectsByUserId,
  _getTotalMilestones,
  _getCompletedMilestones,
  _getAverageMilestonesPerProject,
  _getAverageTasksPerMilestone,
  _getMilestonesCompletionData,
  _getMilestonesDeadlinesMissedRate,
  _getMilestonesFeatureUtilizationRate,
  _getTotalTasks,
  _getPendingTasks,
  _getCompletedTasks,
  _getTasksCompletionData,
  _getTasksFeatureUtilizationRate
} from "./actions";

const globalRoutePrefix = ROOT_API + "/global";

export function getTotalProjects(startDate, endDate) {
  let url = globalRoutePrefix + "/projects/count";
  return axios
    .post(
      url,
      {
        startDate: startDate,
        endDate: endDate
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      // console.log('getTotalProjects ', response.data);
      return _getTotalProjects(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getNewProjects(startDate, endDate) {
  let url = globalRoutePrefix + "/projects/num-created-between-dates";
  return axios
    .post(
      url,
      {
        startDate: startDate,
        endDate: endDate
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      // console.log('getNewProjects ', response.data);
      return _getNewProjects(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getLatestProjects(maxEntries) {
  let url = ROOT_API + "/projects/latest";
  return axios
    .post(
      url,
      {
        maxProjects: maxEntries
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      // console.log('getLatestProjects ', response.data);
      return _getLatestProjects(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getActiveProjects(startDate, endDate) {
  let url = globalRoutePrefix + "/projects/active-rate-between-dates";
  return axios
    .post(
      url,
      {
        startDate: startDate,
        endDate: endDate
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      // console.log('getActiveProjects ', response.data);
      return _getActiveProjects(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getMilestonesByProjectId(projectId) {
  let url = globalRoutePrefix + "/projects/milestones";
  // console.log('getMilestonesByProjectId', projectId);
  return axios
    .post(
      url,
      {
        projectId: projectId
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      // console.log('getMilestonesByProjectId ', response.data);
      return _getMilestonesByProjectId(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getTotalUsers(startDate, endDate) {
  let url = globalRoutePrefix + "/users/count";
  return axios
    .post(
      url,
      {
        startDate: startDate,
        endDate: endDate
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      return _getTotalUsers(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getNewUsers(startDate, endDate) {
  let url = globalRoutePrefix + "/users/num-created-between-dates";
  return axios
    .post(
      url,
      {
        startDate: startDate,
        endDate: endDate
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      // console.log('getNewUsers ', response.data);
      // console.log('startDate ' + startDate + ' endDate ' + endDate);
      return _getNewUsers(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getLatestUsers(maxEntries) {
  let url = ROOT_API + "/users/latest";
  return axios
    .post(
      url,
      {
        maxUsers: maxEntries
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      // console.log('getLatestUsers ', response.data);
      return _getLatestUsers(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getActiveUsers(startDate, endDate) {
  let url = globalRoutePrefix + "/users/num-updated-between-dates";
  return axios
    .post(
      url,
      {
        startDate: startDate,
        endDate: endDate
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      // console.log('getInactiveUsers ', response.data);
      return _getInactiveUsers(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getInactiveUsers(startDate, endDate) {
  let url = globalRoutePrefix + "/users/num-not-updated-between-dates";
  return axios
    .post(
      url,
      {
        startDate: startDate,
        endDate: endDate
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      // console.log('getInactiveUsers ', response.data);
      return _getInactiveUsers(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getRetentionRate(startDate, endDate) {
  let url = globalRoutePrefix + "/users/retention-rate";
  return axios
    .post(
      url,
      {
        startDate: startDate,
        endDate: endDate
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      return _getRetentionRate(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getProjectsByUserId(userId) {
  let url = globalRoutePrefix + "/users/projects";
  return axios
    .post(
      url,
      {
        userId: userId
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      // console.log('getProjectsByUserId ', response.data);
      return _getProjectsByUserId(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getTotalMilestones(startDate, endDate) {
  let url = globalRoutePrefix + "/milestones/count";
  return axios
    .post(
      url,
      {
        startDate: startDate,
        endDate: endDate
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      // console.log('getTotalMilestones ', response.data);
      return _getTotalMilestones(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getCompletedMilestones(startDate, endDate) {
  let url = globalRoutePrefix + "/milestones/completed-count";
  return axios
    .post(
      url,
      {
        startDate: startDate,
        endDate: endDate
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      // console.log('getCompletedMilestones ', response.data);
      return _getCompletedMilestones(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getAverageMilestonesPerProject(startDate, endDate) {
  let url = globalRoutePrefix + "/milestones/average-milestones-per-project";
  return axios
    .post(
      url,
      {
        startDate: startDate,
        endDate: endDate
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      // console.log('getAverageMilestonesPerProject ', response.data);
      return _getAverageMilestonesPerProject(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getAverageTasksPerMilestone(startDate, endDate) {
  let url = globalRoutePrefix + "/milestones/average-tasks-per-milestone";
  return axios
    .post(
      url,
      {
        startDate: startDate,
        endDate: endDate
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      // console.log('getAverageTasksPerMilestone ', response.data);
      return _getAverageTasksPerMilestone(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getMilestonesCompletionData(startDate, endDate) {
  let url = globalRoutePrefix + "/milestones/time-taken-data";
  return axios
    .post(
      url,
      {
        startDate: startDate,
        endDate: endDate
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      // console.log('getMilestonesCompletionData ', response.data);
      return _getMilestonesCompletionData(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getMilestonesDeadlinesMissedRate(startDate, endDate) {
  let url = globalRoutePrefix + "/milestones/ratio-deadlines-missed";
  return axios
    .post(
      url,
      {
        startDate: startDate,
        endDate: endDate
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      // console.log('getMilestonesDeadlinesMissedRate ', response.data);
      return _getMilestonesDeadlinesMissedRate(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getMilestonesFeatureUtilizationRate(startDate, endDate) {
  let url = globalRoutePrefix + "/milestones/feature-utilization";
  return axios
    .post(
      url,
      {
        startDate: startDate,
        endDate: endDate
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      // console.log('getMilestonesFeatureUtilizationRate ', response.data);
      return _getMilestonesFeatureUtilizationRate(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getTotalTasks(startDate, endDate) {
  let url = globalRoutePrefix + "/tasks/count";
  return axios
    .post(
      url,
      { startDate: startDate, endDate: endDate },
      { headers: { "Content-Type": "application/json" } }
    )
    .then(response => {
      // console.log('getTotalTasks ', response.data);
      return _getTotalTasks(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getPendingTasks(startDate, endDate) {
  let url = globalRoutePrefix + "/tasks/count-pending";
  return axios
    .post(
      url,
      {
        startDate: startDate,
        endDate: endDate
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      // console.log('getPendingTasks ', response.data);
      return _getPendingTasks(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getCompletedTasks(startDate, endDate) {
  let url = globalRoutePrefix + "/tasks/count-completed";
  return axios
    .post(
      url,
      {
        startDate: startDate,
        endDate: endDate
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      // console.log('getCompletedTasks ', response.data);
      return _getCompletedTasks(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getTasksCompletionData(startDate, endDate) {
  let url = globalRoutePrefix + "/tasks/complete-time-data";
  return axios
    .post(
      url,
      {
        startDate: startDate,
        endDate: endDate
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      // console.log('getTasksCompletionData ', response.data);
      return _getTasksCompletionData(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getTasksFeatureUtilizationRate(startDate, endDate) {
  let url = globalRoutePrefix + "/tasks/feature-utilization";
  return axios
    .post(
      url,
      {
        startDate: startDate,
        endDate: endDate
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      return _getTasksFeatureUtilizationRate(response.data);
    })
    .catch(error => {
      throw error;
    });
}
