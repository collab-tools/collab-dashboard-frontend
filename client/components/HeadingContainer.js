import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import Heading from "../components/Heading";

import { setMaxEntries, setRecencyDays } from "../actions/actions";

const styles = {
  headingContainer: {
    display: "flex",
    justifyContent: "space-between"
  }
};

class HeadingContainer extends Component {
  onMaxEntriesChange = ({ target: { value } }) => {
    this.props.setMaxEntries(value);
  };
  onRecencyChange = ({ target: { value } }) => {
    this.props.setRecencyDays(value);
  };
  render() {
    let dbMaxRows = 999;
    return (
      <div style={styles.headingContainer}>
        <Heading>{this.props.heading}</Heading>
        {!this.props.noOptions && (
          <Heading>
            <Select
              value={this.props.maxEntries}
              onChange={this.onMaxEntriesChange}
              style={{ marginRight: "20px" }}
            >
              <MenuItem value={10}>Max 10 Entries (Tables)</MenuItem>
              <MenuItem value={20}>Max 20 Entries (Tables)</MenuItem>
              <MenuItem value={30}>Max 30 Entries (Tables)</MenuItem>
              <MenuItem value={dbMaxRows}>All Entries (Tables)</MenuItem>
            </Select>
            <Select value={this.props.recencyDays} onChange={this.onRecencyChange}>
              <MenuItem value={7}>Last 7 Days</MenuItem>
              <MenuItem value={14}>Last 14 Days</MenuItem>
              <MenuItem value={30}>Last 30 Days</MenuItem>
            </Select>
          </Heading>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { maxEntries, recencyDays } = state.queryOptions;
  return { maxEntries, recencyDays };
};
const mapDispatchToProps = {
  setMaxEntries,
  setRecencyDays
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeadingContainer);
