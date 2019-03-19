import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

import CircularProgress from "material-ui/CircularProgress";

import Content from "../components/Content";
import HeadingContainer from "../components/HeadingContainer";

class DashboardLayout extends Component {
  render() {
    const { heading, noOptions, loading, children } = this.props;
    return (
      <Content>
        <HeadingContainer {...{ heading, noOptions }} />
        {loading ? <CircularProgress size={60} thickness={7} /> : children}
      </Content>
    );
  }
}

const mapStateToProps = ({ loading }) => ({
  loading
});

export default connect(mapStateToProps)(DashboardLayout);
