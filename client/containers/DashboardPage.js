import React, { Component, PropTypes } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Dashboard from '../components/Dashboard';

export class DashboardPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let login = this.props.login;
    let jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken == null || jwtToken == '') {
      return <Redirect to="/" />;
    }
    return (
      <Dashboard login={this.props.login} />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  login: state.login,
});

export default connect(
  mapStateToProps,
  null
)(DashboardPage);
