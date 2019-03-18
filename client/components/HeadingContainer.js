import React, { Component } from "react";
import { connect } from "react-redux";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

import Heading from "../components/Heading";

import { setMaxEntries, setRecencyDays } from "../actions/actions";

const styles = {
  headingContainer: {
    display: "flex",
    justifyContent: "space-between"
  }
};

class HeadingContainer extends Component {
  onMaxEntriesChange = (e, i, value) => {
    this.props.setMaxEntries(value);
  };
  onRecencyChange = (e, i, value) => {
    this.props.setRecencyDays(value);
  };
  render() {
    let dbMaxRows = 999;
    return (
      <div style={styles.headingContainer}>
        <Heading>{this.props.heading}</Heading>
        {!this.props.noOptions && (
          <Heading>
            <SelectField value={this.props.maxEntries} onChange={this.onMaxEntriesChange}>
              <MenuItem value={10} primaryText="Max 10 Entries (Tables)" />
              <MenuItem value={20} primaryText="Max 20 Entries (Tables)" />
              <MenuItem value={30} primaryText="Max 30 Entries (Tables)" />
              <MenuItem value={dbMaxRows} primaryText="All Entries (Tables)" />
            </SelectField>
            <SelectField value={this.props.recencyDays} onChange={this.onRecencyChange}>
              <MenuItem value={7} primaryText="Last 7 Days" />
              <MenuItem value={14} primaryText="Last 14 Days" />
              <MenuItem value={30} primaryText="Last 30 Days" />
            </SelectField>
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
