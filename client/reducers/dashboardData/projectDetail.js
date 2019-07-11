import {
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
  GET_PROJECT_FILES_CONTRIBUTIONS
} from "../../constants/actionTypes";

const initialState = {
  name: "abc",
  overview: {
    summary: {
      milestonesNum: 0,
      completedTasksNum: 0,
      pendingTasksNum: 0,
      messagesNum: 0,
      commitsNum: 0,
      fileChangesNum: 0
    },
    members: [],
    activities: [
      {
        author: "Captain America",
        description: "has marked task 'Task 12' as complete"
      },
      {
        author: "Iron Man",
        description: "pushed a commit 'fix bugs' to branch 'master'"
      },
      {
        author: "Someone",
        description: "does something"
      },
      {
        author: "Someone",
        description: "does something"
      },
      {
        author: "Someone",
        description: "does something"
      },
      {
        author: "Someone",
        description: "does something"
      },
      {
        author: "Someone",
        description: "does something"
      },
      {
        author: "Someone",
        description: "does something"
      },
      {
        author: "Someone",
        description: "does something"
      },
      {
        author: "Someone",
        description: "does something"
      }
    ],
    links: {
      github: "",
      drive: ""
    }
  },
  milestonesAndTasks: {
    milestones: [],
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
    link: "",
    summary: {
      filesNum: 0,
      changesNum: 0
    },
    changes: [],
    contributions: []
  }
};

export default function projectDetail(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECT_NAME: {
      return {
        ...state,
        name: action.name
      };
    }
    case GET_PROJECT_MILESTONES_COUNT: {
      return {
        ...state,
        overview: {
          ...state.overview,
          summary: {
            ...state.overview.summary,
            milestonesNum: action.result
          }
        }
      };
    }
    case GET_PROJECT_COMPLETED_TASKS_COUNT: {
      return {
        ...state,
        overview: {
          ...state.overview,
          summary: {
            ...state.overview.summary,
            completedTasksNum: action.result
          }
        }
      };
    }
    case GET_PROJECT_INCOMPLETE_TASKS_COUNT: {
      return {
        ...state,
        overview: {
          ...state.overview,
          summary: {
            ...state.overview.summary,
            pendingTasksNum: action.result
          }
        }
      };
    }
    case GET_PROJECT_MESSAGES_COUNT: {
      return {
        ...state,
        overview: {
          ...state.overview,
          summary: {
            ...state.overview.summary,
            messagesNum: action.result
          }
        }
      };
    }
    case GET_PROJECT_COMMITS_COUNT: {
      return {
        ...state,
        overview: {
          ...state.overview,
          summary: {
            ...state.overview.summary,
            commitsNum: action.result
          }
        },
        github: {
          ...state.github,
          summary: {
            ...state.github.summary,
            commitsNum: action.result
          }
        }
      };
    }
    case GET_PROJECT_FILE_CHANGES_COUNT: {
      return {
        ...state,
        overview: {
          ...state.overview,
          summary: {
            ...state.overview.summary,
            fileChangesNum: action.result
          }
        },
        files: {
          ...state.files,
          summary: {
            ...state.files.summary,
            changesNum: action.result
          }
        }
      };
    }
    case GET_MEMBERS_INFO: {
      return {
        ...state,
        overview: {
          ...state.overview,
          members: action.members
        }
      };
    }
    case GET_PROJECT_ACTIVITIES: {
      return state;
    }
    case GET_PROJECT_GITHUB_REPO: {
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
    case GET_PROJECT_DRIVE_LINK: {
      return {
        ...state,
        overview: {
          ...state.overview,
          links: {
            ...state.overview.links,
            drive: action.link
          }
        },
        files: {
          ...state.files,
          link: action.link
        }
      };
    }
    case GET_PROJECT_MILESTONES: {
      return {
        ...state,
        milestonesAndTasks: {
          ...state.milestonesAndTasks,
          milestones: action.milestones
        }
      };
    }
    case GET_PROJECT_TASKS_CONTRIBUTION: {
      return {
        ...state,
        milestonesAndTasks: {
          ...state.milestonesAndTasks,
          contributions: action.contributions
        }
      };
    }
    case GET_PROJECT_GITHUB_ADDITIONS_COUNT: {
      return {
        ...state,
        github: {
          ...state.github,
          summary: {
            ...state.github.summary,
            linesAdded: action.result
          }
        }
      };
    }
    case GET_PROJECT_GITHUB_DELETIONS_COUNT: {
      return {
        ...state,
        github: {
          ...state.github,
          summary: {
            ...state.github.summary,
            linesDeleted: action.result
          }
        }
      };
    }
    case GET_PROJECT_GITHUB_COMMITS: {
      return {
        ...state,
        github: {
          ...state.github,
          commits: action.commits
        }
      };
    }
    case GET_PROJECT_GITHUB_COMMITS_CONTRIBUTION: {
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
    case GET_PROJECT_GITHUB_LOCS_CONTRIBUTION: {
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
    case GET_PROJECT_FILES_COUNT: {
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
    case GET_PROJECT_FILES_CHANGES: {
      return {
        ...state,
        files: {
          ...state.files,
          changes: action.changes
        }
      };
    }
    case GET_PROJECT_FILES_CONTRIBUTIONS: {
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
