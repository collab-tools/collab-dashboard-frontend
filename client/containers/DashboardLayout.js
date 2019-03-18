import React, { Component, PropTypes } from "react";

import Content from "../components/Content";
import HeadingContainer from "../components/HeadingContainer";

export default class DashboardLayout extends Component {
  render() {
    return (
      <Content>
        <HeadingContainer {...this.props} />
        {this.props.children}
      </Content>
    );
  }
}
