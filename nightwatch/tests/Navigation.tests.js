module.exports = {
  'Test: Navigation - Metrics Pages Exists': (client) => {
    const page = client.page.Navigation();
    const username = 'admin';
    const password = 'password';

    page.navigate()
      .waitForElementVisible('@usernameInput', 100)
      .setValue('@usernameInput', username)
      .setValue('@passwordInput', password)
      .waitForElementVisible('@loginButton', 100)
      .click('@loginButton')
      .waitForElementNotPresent('@loginButton', 3000)
      .waitForElementVisible('@navigationHome', 100)
      .click('@navigationHome')
      .waitForElementPresent('@homePage', 100)
      .click('@navigationProjects')
      .waitForElementPresent('@projectsPage', 100)
      .click('@navigationUsers')
      .waitForElementPresent('@usersPage', 100)
      .click('@navigationDrive')
      .waitForElementPresent('@drivePage', 100)
      .click('@navigationGithub')
      .waitForElementPresent('@githubPage', 100)
      .click('@navigationMilestones')
      .waitForElementPresent('@milestonesPage', 100);


    client.end();
  },
  'Test: Navigation - Toggle Navigation': (client) => {
    const page = client.page.Navigation();
    const username = 'admin';
    const password = 'password';

    page.navigate()
      .waitForElementVisible('@usernameInput', 100)
      .setValue('@usernameInput', username)
      .setValue('@passwordInput', password)
      .waitForElementVisible('@loginButton', 100)
      .click('@loginButton')
      .waitForElementNotPresent('@loginButton', 3000)
      .waitForElementVisible('@toggleNavigationIcon', 100)
      .click('@toggleNavigationIcon')
      .waitForElementNotVisible('@navigationHome', 100)
      .waitForElementPresent('@homePage', 100)
      .waitForElementPresent('@toggleNavigationIcon', 100)
      .click('@toggleNavigationIcon')
      .waitForElementVisible('@navigationHome', 100)
      .waitForElementPresent('@homePage', 100)
      .waitForElementPresent('@toggleNavigationIcon', 100);



    client.end();
  }
};
