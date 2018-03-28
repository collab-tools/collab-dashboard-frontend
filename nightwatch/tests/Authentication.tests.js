module.exports = {
  'Test: Login Successful': (client) => {
    const page = client.page.Authentication();
    const username = 'admin';
    const password = 'password';

    page.navigate()
      .waitForElementVisible('@usernameInput', 100)
      .setValue('@usernameInput', username)
      .setValue('@passwordInput', password)
      .waitForElementVisible('@loginButton', 100)
      .click('@loginButton')
      .waitForElementNotPresent('@loginButton', 3000);


    client.end();
  },
  'Test: Login Failure': (client) => {
    const page = client.page.Authentication();
    const username = 'wrongUsername';
    const password = 'wrongPassword';

    page.navigate()
      .waitForElementVisible('@usernameInput', 100)
      .setValue('@usernameInput', username)
      .setValue('@passwordInput', password)
      .waitForElementVisible('@loginButton', 100)
      .click('@loginButton')
      .waitForElementPresent('@loginButton', 3000);


    client.end();
  },
  'Test: Logout Successful': (client) => {
    const page = client.page.Authentication();
    const username = 'admin';
    const password = 'password';

    page.navigate()
      .waitForElementVisible('@usernameInput', 100)
      .setValue('@usernameInput', username)
      .setValue('@passwordInput', password)
      .waitForElementVisible('@loginButton', 100)
      .click('@loginButton')
      .waitForElementNotPresent('@loginButton', 3000)
      .waitForElementPresent('@navigationLogout', 100)
      .click('@navigationLogout')
      .waitForElementPresent('@usernameInput', 100);


    client.end();
  }
};
