module.exports = {
  'Test: _404 Page Exist': (client) => {
    const page = client.page._404();

    page.navigate()
      .waitForElementVisible('@_404PageContainer', 100)
      .waitForElementVisible('@_404PageNotFoundText', 100)
      .assert.containsText('@_404PageNotFoundText', '404');


    client.end();
  }
};
