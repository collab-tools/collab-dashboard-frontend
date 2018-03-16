import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navigation from '../components/Navigation';

import {
  changeContentType,
  unauthenticateUser
} from '../actions/actions';

export class NavigationMenu extends Component {
  constructor(props) {
    super(props);
    this.changeContentType = this.changeContentType.bind(this);
    this.unauthenticateUser = this.unauthenticateUser.bind(this);
  }

  changeContentType(contentType) {
    this.props.changeContentType(contentType);
  }

  unauthenticateUser() {
    this.props.unauthenticateUser();
  }

  render() {
    return (
      <Navigation changeContentType={this.changeContentType} unauthenticateUser={this.unauthenticateUser}/>
    )
  };
}

const mapDispatchToProps = {
  changeContentType,
  unauthenticateUser
};

export default connect(
  null,
  mapDispatchToProps
)(NavigationMenu);
