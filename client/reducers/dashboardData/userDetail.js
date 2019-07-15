import {
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
} from "../../constants/actionTypes";

const initialState = {
  name: "def",
  overview: {
    summary: {
      projectsNum: 0,
      completedTasksNum: 0,
      incompleteTasksNum: 0,
      messagesNum: 0,
      commitsNum: 0,
      fileChangesNum: 0
    },
    projects: [],
    activities: [],
    links: {
      github: "",
      email: ""
    }
  },
  tasks: {
    projects: [],
    contributions: []
  },
  github: {
    link: "",
    summary: {
      commitsNum: 0,
      linesAdded: 0,
      linesDeleted: 0
    },
    commits: [],
    contributions: {
      commits: [],
      LOCs: []
    }
  },
  files: {
    summary: {
      filesNum: 0,
      changesNum: 0
    },
    changes: [],
    contributions: []
  }
};

export default function userDetail(state = initialState, action) {
  switch (action.type) {
    case GET_USER_NAME: {
      return {
        ...state,
        name: action.name
      };
    }
    case GET_USER_PROJECTS_COUNT: {
      return {
        ...state,
        overview: {
          ...state.overview,
          summary: {
            ...state.overview.summary,
            projectsNum: action.count
          }
        }
      };
    }
    case GET_USER_COMPLETED_TASKS_COUNT: {
      return {
        ...state,
        overview: {
          ...state.overview,
          summary: {
            ...state.overview.summary,
            completedTasksNum: action.count
          }
        }
      };
    }
    case GET_USER_INCOMPLETE_TASKS_COUNT: {
      return {
        ...state,
        overview: {
          ...state.overview,
          summary: {
            ...state.overview.summary,
            incompleteTasksNum: action.count
          }
        }
      };
    }
    case GET_USER_MESSAGES_COUNT: {
      return {
        ...state,
        overview: {
          ...state.overview,
          summary: {
            ...state.overview.summary,
            messagesNum: action.count
          }
        }
      };
    }
    case GET_USER_COMMITS_COUNT: {
      return {
        ...state,
        overview: {
          ...state.overview,
          summary: {
            ...state.overview.summary,
            commitsNum: action.count
          }
        },
        github: {
          ...state.github,
          summary: {
            ...state.github.summary,
            commitsNum: action.count
          }
        }
      };
    }
    case GET_USER_FILE_CHANGES_COUNT: {
      return {
        ...state,
        overview: {
          ...state.overview,
          summary: {
            ...state.overview.summary,
            fileChangesNum: action.count
          }
        },
        files: {
          ...state.files,
          summary: {
            ...state.files.summary,
            changesNum: action.count
          }
        }
      };
    }
    case GET_PROJECTS_INFO: {
      return {
        ...state,
        overview: {
          ...state.overview,
          projects: action.projects
        }
      };
    }
    case GET_USER_ACTIVITIES: {
      return {
        ...state,
        overview: {
          ...state.overview,
          activities: action.activities
        }
      };
    }
    case GET_USER_GITHUB_ACCOUNT: {
      return {
        ...state,
        overview: {
          ...state.overview,
          links: {
            ...state.overview.links,
            github: action.link
          }
        },
        github: {
          ...state.github,
          link: action.link
        }
      };
    }
    case GET_USER_EMAIL: {
      return {
        ...state,
        overview: {
          ...state.overview,
          links: {
            ...state.overview.links,
            email: action.email
          }
        }
      };
    }
    case GET_USER_PROJECTS_TASKS: {
      return {
        ...state,
        tasks: {
          ...state.tasks,
          projects: action.projects
        }
      };
    }
    case GET_USER_TASKS_CONTRIBUTION: {
      return {
        ...state,
        tasks: {
          ...state.tasks,
          contributions: action.contributions
        }
      };
    }
    case GET_USER_GITHUB_ADDITIONS: {
      return {
        ...state,
        github: {
          ...state.github,
          summary: {
            ...state.github.summary,
            linesAdded: action.count
          }
        }
      };
    }
    case GET_USER_GITHUB_DELETIONS: {
      return {
        ...state,
        github: {
          ...state.github,
          summary: {
            ...state.github.summary,
            linesDeleted: action.count
          }
        }
      };
    }
    case GET_USER_COMMITS: {
      return {
        ...state,
        github: {
          ...state.github,
          commits: action.commits
        }
      };
    }
    case GET_USER_COMMITS_CONTRIBUTION: {
      return {
        ...state,
        github: {
          ...state.github,
          contributions: {
            ...state.github.contributions,
            commits: action.contributions
          }
        }
      };
    }
    case GET_USER_LOCS_CONTRIBUTION: {
      return {
        ...state,
        github: {
          ...state.github,
          contributions: {
            ...state.github.contributions,
            LOCs: action.contributions
          }
        }
      };
    }
    case GET_USER_FILES_COUNT: {
      return {
        ...state,
        files: {
          ...state.files,
          summary: {
            ...state.files.summary,
            filesNum: action.count
          }
        }
      };
    }
    case GET_USER_FILES_CHANGES: {
      return {
        ...state,
        files: {
          ...state.files,
          changes: action.changes
        }
      };
    }
    case GET_USER_FILES_CONTRIBUTION: {
      return {
        ...state,
        files: {
          ...state.files,
          contributions: action.contributions
        }
      };
    }
    default:
      return state;
  }
}
