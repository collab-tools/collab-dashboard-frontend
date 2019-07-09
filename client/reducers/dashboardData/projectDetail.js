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
    default:
      return state;
  }
}
