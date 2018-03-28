module.exports = {
  url: function () {
    return this.api.launch_url;
  },
  elements: {
    usernameInput: '#usernameInput',
    passwordInput: '#passwordInput',
    loginButton: '#loginButton',
    toggleNavigationIcon: '#toggleNavigationIcon',
    navigationHome: '#navigationHome',
    navigationProjects: '#navigationProjects',
    navigationUsers: '#navigationUsers',
    navigationGithub: '#navigationGithub',
    navigationDrive: '#navigationDrive',
    navigationMilestones: '#navigationMilestones',
    navigationTasks: '#navigationTasks',
    navigationLogout: '#navigationLogout',
    homePage: '#homePage',
    projectsPage: '#projectsPage',
    usersPage: '#usersPage',
    githubPage: '#githubPage',
    drivePage: '#drivePage',
    milestonesPage: '#milestonesPage',
    tasksPage: '#tasksPage'
  }
};
