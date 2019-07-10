import axios from "axios";
import { ROOT_API } from "../constants/url";
import {
  _getLatestProjects,
  _getProjectName,
  _getProjectMilestonesCount,
  _getProjectCompletedTasksCount,
  _getProjectIncompleteTasksCount,
  _getProjectMessagesCount,
  _getProjectCommitsCount,
  _getProjectFileChangesCount,
  _getMembersInfo,
  _getProjectActivities,
  _getProjectGithubRepo,
  _getProjectDriveLink,
  _getProjectMilestones,
  _getProjectTasksContribution,
  _getProjectGithubAdditionsCount,
  _getProjectGithubDeletionsCount,
  _getProjectGithubCommits,
  _getProjectGithubCommitsContribution,
  _getProjectGithubLOCsContribution,
  _getProjectFilesCount,
  _getProjectFileChanges,
  _getProjectFilesContribution
} from "./actions";

const projectRoutePrefix = ROOT_API + "/projects";
const userRoutePrefix = ROOT_API + "/users";

export function getLatestProjects(maxEntries) {
  let url = projectRoutePrefix + "/";
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
export function getProjectName(id) {
  let url = `${projectRoutePrefix}/${id}/name`;
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      return _getProjectName(response.data);
    })
    .catch(error => {
      throw error;
    });
}

export function getProjectMilestonesCount(id) {
  let url = `${projectRoutePrefix}/${id}/milestones/count`;
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      return _getProjectMilestonesCount(response.data);
    })
    .catch(error => {
      throw error;
    });
}

export function getProjectCompletedTasksCount(id) {
  let url = `${projectRoutePrefix}/${id}/tasks/count?complete=true`;
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      return _getProjectCompletedTasksCount(response.data);
    })
    .catch(error => {
      throw error;
    });
}

export function getProjectIncompleteTasksCount(id) {
  let url = `${projectRoutePrefix}/${id}/tasks/count?complete=false`;
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      return _getProjectIncompleteTasksCount(response.data);
    })
    .catch(error => {
      throw error;
    });
}

export function getMessagesCount(id) {
  let url = `${projectRoutePrefix}/${id}/messages/count`;
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      return _getProjectMessagesCount(response.data);
    })
    .catch(error => {
      throw error;
    });
}

export function getCommitsCount(id) {
  let url = `${projectRoutePrefix}/${id}/github/commitsCount`;
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      return _getProjectCommitsCount(response.data);
    })
    .catch(error => {
      throw error;
    });
}

export function getFileChangesCount(id) {
  let url = `${projectRoutePrefix}/${id}/drive/changesCount`;
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      return _getProjectFileChangesCount(response.data);
    })
    .catch(error => {
      throw error;
    });
}

export function getMembersInfo(id) {
  let usersUrl = `${projectRoutePrefix}/${id}/users`;
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  return axios
    .get(usersUrl, config)
    .then(async response => {
      let members = [];
      for (const member of response.data) {
        const { userId } = member;
        const nameUrl = `${userRoutePrefix}/${userId}/name`;
        const emailUrl = `${userRoutePrefix}/${userId}/email`;
        const imgUrl = `${userRoutePrefix}/${userId}/displayImage`;
        const tasksUrl = `${userRoutePrefix}/${userId}/tasks/count?project=${id}`;
        const compTasksUrl = `${userRoutePrefix}/${userId}/tasks/count?project=${id}&complete=true`;
        const msgUrl = `${userRoutePrefix}/${userId}/messages/count?project=${id}`;
        const commitsUrl = `${userRoutePrefix}/${userId}/github/commitsCount?project=${id}`;
        const filesUrl = `${userRoutePrefix}/${userId}/drive/changesCount?project=${id}`;
        const urls = [
          nameUrl,
          emailUrl,
          imgUrl,
          tasksUrl,
          compTasksUrl,
          msgUrl,
          commitsUrl,
          filesUrl
        ];
        await axios.all(urls.map(url => axios.get(url, config))).then(
          axios.spread((name, email, img, tasks, compTasks, msg, commits, files) => {
            members.push({
              name: name.data.name,
              email: email.data.email,
              image: img.data.displayImage,
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
      return _getMembersInfo(members);
    })
    .catch(error => {
      throw error;
    });
}

export function getActivities(id) {
  let url = "";
  return _getProjectActivities();
}

export function getGithubRepo(id) {
  let url = `${projectRoutePrefix}/${id}/github/repo`;
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      return _getProjectGithubRepo(response.data);
    })
    .catch(error => {
      throw error;
    });
}

export function getDriveLink(id) {
  let url = `${projectRoutePrefix}/${id}/drive/link`;
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      return _getProjectDriveLink(response.data);
    })
    .catch(error => {
      throw error;
    });
}

export function getMilestones(id) {
  let milestonesUrl = `${projectRoutePrefix}/${id}/milestones`;
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
  return axios.get(milestonesUrl, config).then(async response => {
    const data = response.data;
    let milestones = [];
    for (const ms of data) {
      const { name, deadline, milestoneId } = ms;
      const taskUrl = `${projectRoutePrefix}/${id}/tasks?milestone=${milestoneId}`;
      await axios.get(taskUrl, config).then(res => {
        const tasks = res.data;
        milestones.push({
          name,
          deadline: deadline ? new Date(deadline).toLocaleDateString("en-GB", dateFormat) : null,
          tasksCompleted:
            tasks.reduce((acc, curr) => acc + (curr.completeDay ? 1 : 0), 0) + "/" + tasks.length,
          tasks: tasks.map(({ taskName, assignee, completeDay }) => ({
            name: taskName,
            assignee,
            completeDay: completeDay
              ? new Date(completeDay).toLocaleDateString("en-GB", dateFormat)
              : null
          }))
        });
      });
    }
    return _getProjectMilestones(milestones);
  });
}

export function getTasksContribution(id) {
  let url = `${projectRoutePrefix}/${id}/tasks/contributions`;
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      return _getProjectTasksContribution(response.data);
    })
    .catch(error => {
      throw error;
    });
}

export function getGithubAdditionsCount(id) {
  let url = `${projectRoutePrefix}/${id}/github/linesCount?type=addition`;
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      return _getProjectGithubAdditionsCount(response.data);
    })
    .catch(error => {
      throw error;
    });
}

export function getGithubDeletionsCount(id) {
  let url = `${projectRoutePrefix}/${id}/github/linesCount?type=deletion`;
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      return _getProjectGithubDeletionsCount(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getGithubCommits(id) {
  let url = `${projectRoutePrefix}/${id}/github/commits`;
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

      return _getProjectGithubCommits(commits);
    })
    .catch(error => {
      throw error;
    });
}
export function getGithubCommitsContribution(id) {
  let url = `${projectRoutePrefix}/${id}/github/contributions/commits`;
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      return _getProjectGithubCommitsContribution(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getGithubLOCsContribution(id) {
  let url = `${projectRoutePrefix}/${id}/github/contributions/LOCs`;
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      return _getProjectGithubLOCsContribution(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getFilesCount(id) {
  let url = `${projectRoutePrefix}/${id}/drive/filesCount`;
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      return _getProjectFilesCount(response.data);
    })
    .catch(error => {
      throw error;
    });
}
export function getFileChanges(id) {
  let url = `${projectRoutePrefix}/${id}/drive/changes`;
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

      return _getProjectFileChanges(changes);
    })
    .catch(error => {
      throw error;
    });
}
export function getFilesContribution(id) {
  let url = `${projectRoutePrefix}/${id}/drive/contributions`;
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      return _getProjectFilesContribution(response.data);
    })
    .catch(error => {
      throw error;
    });
}
