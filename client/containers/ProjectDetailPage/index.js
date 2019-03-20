import React, { Component } from "react";
import { connect } from "react-redux";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";

import Content from "../../components/Content";
import Section from "../../components/Section";

import DashboardLayout from "../DashboardLayout";
import OverviewTab from "./ProjectOverviewTab";
import MilestonesAndTasksTab from "./ProjectMilestonesAndTasksTab";
import GithubTab from "./ProjectGithubTab";
import FilesTab from "./ProjectFilesTab";

import { fetchData } from "../../actions/actions";

class ProjectDetailPage extends Component {
  state = {
    currTab: 0
  };
  handleChange = (e, value) => {
    this.setState({ currTab: value });
  };
  renderTab = currTab => {
    switch (currTab) {
      case 0:
        return <OverviewTab />;
      case 1:
        return <MilestonesAndTasksTab />;
      case 2:
        return <GithubTab />;
      case 3:
        return <FilesTab />;
      default:
        return null;
    }
  };
  render() {
    const { currTab } = this.state;
    return (
      <DashboardLayout heading={`Project ${this.props.match.params.id}`} noOptions>
        <Content>
          <Section>
            <Paper elevation={0}>
              <Tabs
                value={currTab}
                onChange={this.handleChange}
                variant="fullWidth"
                indicatorColor="primary"
              >
                <Tab value={0} label="Overview" />
                <Tab value={1} label="Milestones and Tasks" />
                <Tab value={2} label="Github" />
                <Tab value={3} label="Files" />
              </Tabs>
            </Paper>
          </Section>

          {this.renderTab(currTab)}
        </Content>
      </DashboardLayout>
    );
  }
}

const mapStateToProps = state => ({});
export default connect(mapStateToProps)(ProjectDetailPage);
