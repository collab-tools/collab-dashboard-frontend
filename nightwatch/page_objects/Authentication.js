module.exports = {
  url: function () {
    return this.api.launch_url;
  },
  elements: {
    usernameInput: '#usernameInput',
    passwordInput: '#passwordInput',
    loginButton: '#loginButton',
    navigationLogout: '#navigationLogout'
  }
};
