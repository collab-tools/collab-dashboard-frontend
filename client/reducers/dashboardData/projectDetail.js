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
      milestonesNum: 2,
      completedTasksNum: 15,
      pendingTasksNum: 29,
      messagesNum: 235,
      commitsNum: 7,
      fileChangesNum: 15
    },
    members: [
      {
        name: "Le Vu Khanh Toan",
        email: "ktoan2904@gmail.com",
        image: "https://www.cchst.net/wp-content/uploads/2017/06/student-generic.jpg",
        metrics: [
          { label: "Tasks completed", data: "5/8" },
          { label: "Messages sent", data: "23" },
          { label: "Commits made", data: "11" },
          { label: "Files changes made", data: "50" }
        ]
      },
      {
        name: "Captain America",
        email: "captain@america.com",
        image:
          "https://fanfest.com/wp-content/uploads/2018/10/captain-america-figure_0-632x450.png",
        metrics: [
          { label: "Tasks completed", data: "10/10" },
          { label: "Messages sent", data: "34" },
          { label: "Commits made", data: "4" },
          { label: "Files changes made", data: "23" }
        ]
      },
      {
        name: "Iron Man",
        email: "iron@man.com",
        image:
          "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Iron_Man_bleeding_edge.jpg/250px-Iron_Man_bleeding_edge.jpg",
        metrics: [
          { label: "Tasks completed", data: "14/16" },
          { label: "Messages sent", data: "120" },
          { label: "Commits made", data: "23" },
          { label: "Files changes made", data: "54" }
        ]
      }
    ],
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
      github: "https://github.com/ktoan2904/testCollab",
      drive: "https://drive.google.com/open?id=1SnwEVsjeuhtpXtbtDRHRK02nAegH5pnF"
    }
  },
  milestonesAndTasks: {
    milestones: [
      {
        name: "Milestone 1",
        deadline: "1 Apr 2019",
        tasksCompleted: "1/2",
        tasks: [
          { name: "Task 1", assignee: "Captain America", completeDay: "20 Apr 2019" },
          { name: "Task 2", assignee: "Iron Man", completeDay: "N/A" }
        ]
      },
      {
        name: "Milestone 2",
        deadline: "14 Apr 2019",
        tasksCompleted: "3/3",
        tasks: [
          { name: "Task 1", assignee: "Captain America", completeDay: "10 Apr 2019" },
          { name: "Task 2", assignee: "Iron Man", completeDay: "11 Apr 2019" },
          { name: "Task 3", assignee: "Iron Man", completeDay: "12 Apr 2019" }
        ]
      },
      {
        name: "Milestone 3",
        deadline: "29 Apr 2019",
        tasksCompleted: "0/2",
        tasks: [
          { name: "Task 1", assignee: "Captain America", completeDay: "N/A" },
          { name: "Task 2", assignee: "Iron Man", completeDay: "N/A" }
        ]
      }
    ],
    contributions: [
      { member: "Le Vu Khanh Toan", completed: 5, incomplete: 4 },
      { member: "Captain America", completed: 7, incomplete: 0 },
      { member: "Ironman", completed: 3, incomplete: 6 }
    ]
  },
  github: {
    link: "https://github.com/ktoan2904/testCollab",
    summary: {
      commitsNum: 42,
      linesAdded: 2593,
      linesDeleted: 1129
    },
    commits: [
      {
        author: "Captain America",
        message: "implement ProjectDetailPage feature",
        timestamp: "2019-03-20T18:10:49Z"
      },
      {
        author: "Le Vu Khanh Toan",
        message: "fix routing bug",
        timestamp: "2019-03-19T12:10:42Z"
      },
      {
        author: "Iron Man",
        message: "update React",
        timestamp: "2019-03-18T01:42:02Z"
      }
    ],
    contributions: {
      commits: [
        { member: "Le Vu Khanh Toan", commits: 10 },
        { member: "Captain America", commits: 12 },
        { member: "Ironman", commits: 20 }
      ],
      LOCs: [
        { member: "Le Vu Khanh Toan", additions: 321, deletions: 124 },
        { member: "Captain America", additions: 421, deletions: 211 },
        { member: "Ironman", additions: 1145, deletions: 410 }
      ]
    }
  },
  files: {
    link: "https://drive.google.com/open?id=1SnwEVsjeuhtpXtbtDRHRK02nAegH5pnF",
    summary: {
      filesNum: 14,
      changesNum: 323
    },
    changes: [
      {
        author: "Captain America",
        fileName: "Final Report.docx",
        timestamp: "2019-03-20T18:10:49Z"
      },
      {
        author: "Le Vu Khanh Toan",
        fileName: "Documentation.docx",
        timestamp: "2019-03-19T12:10:42Z"
      },
      {
        author: "Iron Man",
        fileName: "Model Diagram.jpg",
        timestamp: "2019-03-18T01:42:02Z"
      }
    ],
    contributions: [
      { member: "Le Vu Khanh Toan", changes: 34 },
      { member: "Captain America", changes: 15 },
      { member: "Ironman", changes: 54 }
    ]
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
