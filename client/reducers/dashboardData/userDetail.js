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
          { task: "Task 1", deadline: "20 Apr 2019", completed: true },
          { task: "Task 2", deadline: "24 Apr 2019", completed: false }
        ]
      },
      {
        project: "CS1020",
        tasks: [
          { task: "Task 1", deadline: "20 Apr 2019", completed: true },
          { task: "Task 2", deadline: "24 Apr 2019", completed: false },
          { task: "Task 3", deadline: "28 Apr 2019", completed: false }
        ]
      },
      {
        project: "CS2010",
        tasks: [
          { task: "Task 1", deadline: "N/A", completed: false },
          { task: "Task 2", deadline: "N/A", completed: false },
          { task: "Task 3", deadline: "10 Apr 2019", completed: true }
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
    default:
      return state;
  }
}
