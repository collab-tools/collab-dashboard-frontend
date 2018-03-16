import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Login from '../components/Login';

import { authenticateUser } from '../actions/actions';

export class LoginPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Login login={this.props.login} authenticateUser={this.props.authenticateUser}/>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  login: state.login,
});

const mapDispatchToProps = {
  authenticateUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
