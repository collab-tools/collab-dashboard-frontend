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
      projectsNum: 3,
      completedTasksNum: 15,
      incompleteTasksNum: 29,
      messagesNum: 235,
      commitsNum: 7,
      fileChangesNum: 15
    },
    projects: [
      {
        name: "CS1010",
        dateCreated: "12 Oct 2018",

        metrics: [
          { label: "Tasks completed", data: "5/8" },
          { label: "Messages sent", data: "23" },
          { label: "Commits made", data: "11" },
          { label: "Files changes made", data: "50" }
        ]
      },
      {
        name: "CS1020",
        dateCreated: "05 Jan 2019",

        metrics: [
          { label: "Tasks completed", data: "10/10" },
          { label: "Messages sent", data: "34" },
          { label: "Commits made", data: "4" },
          { label: "Files changes made", data: "23" }
        ]
      },
      {
        name: "CS2010",
        dateCreated: "06 Jan 2019",

        metrics: [
          { label: "Tasks completed", data: "14/16" },
          { label: "Messages sent", data: "120" },
          { label: "Commits made", data: "23" },
          { label: "Files changes made", data: "54" }
        ]
      }
    ],
    activities: [
      { project: "CS1010", description: "Toan has marked task 'Task 12' as complete" },
      { project: "CS1020", description: "Toan pushed a commit 'fix bugs' to branch 'master'" },
      { project: "Some project", description: "Toan did something" },
      { project: "Some project", description: "Toan did something" },
      { project: "Some project", description: "Toan did something" },
      { project: "Some project", description: "Toan did something" },
      { project: "Some project", description: "Toan did something" },
      { project: "Some project", description: "Toan did something" }
    ],
    links: {
      github: "https://github.com/ktoan2904",
      email: "ktoan2904@gmail.com"
    }
  },
  tasks: {
    projects: [
      {
        project: "CS1010",
        tasks: [
          { task: "Task 1", deadline: "20 Apr 2019", completeDay: true },
          { task: "Task 2", deadline: "24 Apr 2019", completeDay: false }
        ]
      },
      {
        project: "CS1020",
        tasks: [
          { task: "Task 1", deadline: "20 Apr 2019", completeDay: true },
          { task: "Task 2", deadline: "24 Apr 2019", completeDay: false },
          { task: "Task 3", deadline: "28 Apr 2019", completeDay: false }
        ]
      },
      {
        project: "CS2010",
        tasks: [
          { task: "Task 1", deadline: "N/A", completeDay: false },
          { task: "Task 2", deadline: "N/A", completeDay: false },
          { task: "Task 3", deadline: "10 Apr 2019", completeDay: true }
        ]
      }
    ],
    contributions: [
      { project: "CS1010", completed: 5, incomplete: 0 },
      { project: "CS1020", completed: 2, incomplete: 3 },
      { project: "CS2010", completed: 1, incomplete: 6 }
    ]
  },
  github: {
    link: "https://github.com/ktoan2904",
    summary: {
      commitsNum: 42,
      linesAdded: 2593,
      linesDeleted: 1129
    },
    commits: [
      {
        project: "CS1010",
        message: "implement ProjectDetailPage feature",
        timestamp: "2019-03-20T18:10:49Z"
      },
      {
        project: "CS1020",
        message: "fix routing bug",
        timestamp: "2019-03-19T12:10:42Z"
      },
      {
        project: "CS2010",
        message: "update React",
        timestamp: "2019-03-18T01:42:02Z"
      }
    ],
    contributions: {
      commits: [
        { project: "CS1010", commits: 10 },
        { project: "CS1020", commits: 12 },
        { project: "CS2010", commits: 20 }
      ],
      LOCs: [
        { project: "CS1010", additions: 321, deletions: 124 },
        { project: "CS1020", additions: 421, deletions: 211 },
        { project: "CS2010", additions: 1145, deletions: 410 }
      ]
    }
  },
  files: {
    summary: {
      filesNum: 14,
      changesNum: 323
    },
    changes: [
      {
        project: "CS1010",
        fileName: "Final Report.docx",
        timestamp: "2019-03-20T18:10:49Z"
      },
      {
        project: "CS1020",
        fileName: "Documentation.docx",
        timestamp: "2019-03-19T12:10:42Z"
      },
      {
        project: "CS2010",
        fileName: "Model Diagram.jpg",
        timestamp: "2019-03-18T01:42:02Z"
      }
    ],
    contributions: [
      { project: "CS1020", changes: 34 },
      { project: "CS1010", changes: 15 },
      { project: "CS2010", changes: 54 }
    ]
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
      return state;
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
