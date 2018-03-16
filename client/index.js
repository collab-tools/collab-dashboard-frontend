import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';

import store from './store/configStore'

import LoginPage from './containers/LoginPage';
import DashboardPage from './containers/DashboardPage';
import _404 from './components/_404';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={ LoginPage } />
        <Route path="/dashboard" component={ DashboardPage } />
        <Route component={ _404 } />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('application')
)
