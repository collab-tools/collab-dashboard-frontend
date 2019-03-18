import React, { Component } from "react";
import { connect } from "react-redux";

import Navigation from "../components/Navigation";

import { unauthenticateUser } from "../actions/actions";

export class NavigationMenu extends Component {
  unauthenticateUser = () => {
    this.props.unauthenticateUser();
  };

  render() {
    return <Navigation isAdmin={this.props.isAdmin} unauthenticateUser={this.unauthenticateUser} />;
  }
}

const mapStateToProps = state => ({
  isAdmin: state.auth.isAdmin
});

const mapDispatchToProps = {
  unauthenticateUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationMenu);
