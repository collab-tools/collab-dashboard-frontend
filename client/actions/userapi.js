import axios from "axios";
import { ROOT_API } from "../constants/url";
import {
  _getLatestUsers,
  _getUserName,
  _getUserProjectsCount,
  _getUserCompletedTasksCount,
  _getUserIncompleteTasksCount,
  _getUserMessagesCount,
  _getUserCommitsCount,
  _getUserFileChangesCount,
  _getProjectsInfo,
  _getUserActivities,
  _getUserGithubAccount,
  _getUserEmail,
  _getUserProjectsTasks,
  _getUserTasksContribution,
  _getUserGithubAdditions,
  _getUserGithubDeletions,
  _getUserCommits,
  _getUserCommitsContribution,
  _getUserLOCsContribution,
  _getUserFilesCount,
  _getUserFileChanges,
  _getUserFilesContribution
} from "./actions";

const projectRoutePrefix = ROOT_API + "/projects";
const userRoutePrefix = ROOT_API + "/users";

export function getLatestUsers(maxEntries) {
  let url = userRoutePrefix + "/";
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
export function getUserName(id) {
  let url = `${userRoutePrefix}/${id}/name`;
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      return _getUserName(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getUserProjectsCount(id) {
  let url = `${userRoutePrefix}/${id}/projects/count`;
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      return _getUserProjectsCount(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getUserCompletedTasksCount(id) {
  let url = `${userRoutePrefix}/${id}/tasks/count?complete=true`;
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      return _getUserCompletedTasksCount(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getUserIncompleteTasksCount(id) {
  let url = `${userRoutePrefix}/${id}/tasks/count?complete=false`;
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      return _getUserIncompleteTasksCount(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getUserMessagesCount(id) {
  let url = `${userRoutePrefix}/${id}/messages/count`;
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      return _getUserMessagesCount(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getUserCommitsCount(id) {
  let url = `${userRoutePrefix}/${id}/github/commitsCount`;
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      return _getUserCommitsCount(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getUserFilesChangesCount(id) {
  let url = `${userRoutePrefix}/${id}/drive/changesCount`;
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      return _getUserFileChangesCount(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getProjectsInfo(id) {
  let projectsUrl = `${userRoutePrefix}/${id}/projects`;
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const dateFormat = {
    year: "numeric",
    month: "short",
    day: "numeric"
  };
  return axios
    .get(projectsUrl, config)
    .then(async response => {
      let projects = [];
      for (const proj of response.data) {
        const { projectId } = proj;
        const nameUrl = `${projectRoutePrefix}/${projectId}/name`;
        const dateUrl = `${projectRoutePrefix}/${projectId}/dateCreated`;
        const tasksUrl = `${userRoutePrefix}/${id}/tasks/count?project=${projectId}`;
        const compTasksUrl = `${userRoutePrefix}/${id}/tasks/count?project=${projectId}&complete=true`;
        const msgUrl = `${userRoutePrefix}/${id}/messages/count?project=${projectId}`;
        const commitsUrl = `${userRoutePrefix}/${id}/github/commitsCount?project=${projectId}`;
        const filesUrl = `${userRoutePrefix}/${id}/drive/changesCount?project=${projectId}`;
        const urls = [nameUrl, dateUrl, tasksUrl, compTasksUrl, msgUrl, commitsUrl, filesUrl];
        await axios.all(urls.map(url => axios.get(url, config))).then(
          axios.spread((name, date, tasks, compTasks, msg, commits, files) => {
            projects.push({
              name: name.data.name,
              dateCreated: new Date(date.data.date).toLocaleDateString("en-GB", dateFormat),
              metrics: [
                { label: "Tasks completed", data: `${compTasks.data.count}/${tasks.data.count}` },
                { label: "Messages sent", data: msg.data.count },
                { label: "Commits made", data: commits.data.count },
                { label: "Files changes made", data: files.data.count }
              ]
            });
          })
        );
      }
      return _getProjectsInfo(projects);
    })
    .catch(error => {
      throw error;
    });
}
export function getUserActivities(id) {
  let url = `${userRoutePrefix}/${id}/activities`;
  const dateFormat = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  };
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      const temp = response.data;
      const activities = temp.map(act => ({
        ...act,
        timestamp: new Date(act.timestamp).toLocaleDateString("en-GB", dateFormat)
      }));
      return _getUserActivities(activities);
    })
    .catch(error => {
      throw error;
    });
}
export function getUserGithubAccount(id) {
  let url = `${userRoutePrefix}/${id}/github/account`;
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      return _getUserGithubAccount(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getUserEmail(id) {
  let url = `${userRoutePrefix}/${id}/email`;
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      return _getUserEmail(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getUserProjectsTasks(id) {
  let projectsUrl = `${userRoutePrefix}/${id}/projects`;
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const dateFormat = {
    year: "numeric",
    month: "short",
    day: "numeric"
  };
  return axios.get(projectsUrl, config).then(async response => {
    const data = response.data;
    let projects = [];
    for (const proj of data) {
      const { name, projectId } = proj;
      const taskUrl = `${userRoutePrefix}/${id}/tasks?project=${projectId}`;
      await axios.get(taskUrl, config).then(res => {
        const tasks = res.data;
        projects.push({
          project: name,
          tasks: tasks.map(({ task, deadline, completeDay }) => ({
            name: task,
            deadline: deadline ? new Date(deadline).toLocaleDateString("en-GB", dateFormat) : null,
            completeDay: completeDay
              ? new Date(completeDay).toLocaleDateString("en-GB", dateFormat)
              : null
          }))
        });
      });
    }
    return _getUserProjectsTasks(projects);
  });
}
export function getUserTasksContribution(id) {
  let url = `${userRoutePrefix}/${id}/tasks/contributions`;
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      return _getUserTasksContribution(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getUserGithubAdditions(id) {
  let url = `${userRoutePrefix}/${id}/github/linesCount?type=addition`;
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      return _getUserGithubAdditions(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getUserGithubDeletions(id) {
  let url = `${userRoutePrefix}/${id}/github/linesCount?type=deletion`;
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      return _getUserGithubDeletions(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getUserCommits(id) {
  let url = `${userRoutePrefix}/${id}/github/commits`;
  const dateFormat = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  };
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      const temp = response.data;
      const commits = temp.map(commit => ({
        ...commit,
        timestamp: new Date(commit.timestamp).toLocaleDateString("en-GB", dateFormat)
      }));
      return _getUserCommits(commits);
    })
    .catch(error => {
      throw error;
    });
}
export function getUserCommitsContribution(id) {
  let url = `${userRoutePrefix}/${id}/github/contributions/commits`;
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      return _getUserCommitsContribution(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getUserLOCsContribution(id) {
  let url = `${userRoutePrefix}/${id}/github/contributions/LOCs`;
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      return _getUserLOCsContribution(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getUserFilesCount(id) {
  let url = `${userRoutePrefix}/${id}/drive/filesCount`;
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      return _getUserFilesCount(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getUserFileChanges(id) {
  let url = `${userRoutePrefix}/${id}/drive/changes`;
  const dateFormat = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  };
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      const temp = response.data;
      const changes = temp.map(change => ({
        ...change,
        timestamp: new Date(change.timestamp).toLocaleDateString("en-GB", dateFormat)
      }));
      return _getUserFileChanges(changes);
    })
    .catch(error => {
      throw error;
    });
}
export function getUserFilesContribution(id) {
  let url = `${userRoutePrefix}/${id}/drive/contributions`;
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      return _getUserFilesContribution(response.data);
    })
    .catch(error => {
      throw error;
    });
}
