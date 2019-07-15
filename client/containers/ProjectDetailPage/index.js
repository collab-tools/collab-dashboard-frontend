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
import {
  getProjectName,
  getProjectMilestonesCount,
  getProjectCompletedTasksCount,
  getProjectIncompleteTasksCount,
  getMessagesCount,
  getCommitsCount,
  getFileChangesCount,
  getMembersInfo,
  getActivities,
  getGithubRepo,
  getDriveLink,
  getMilestones,
  getTasksContribution,
  getGithubAdditionsCount,
  getGithubDeletionsCount,
  getGithubCommits,
  getGithubCommitsContribution,
  getGithubLOCsContribution,
  getFilesCount,
  getFileChanges,
  getFilesContribution
} from "../../actions/projectapi";

export class ProjectDetailPage extends Component {
  state = {
    currTab: 0
  };
  componentDidMount() {
    this._fetchData();
  }
  _fetchData() {
    const projectId = this.props.match.params.id;
    let fetches = [
      getProjectName(projectId),
      getProjectMilestonesCount(projectId),
      getProjectCompletedTasksCount(projectId),
      getProjectIncompleteTasksCount(projectId),
      getMessagesCount(projectId),
      getCommitsCount(projectId),
      getFileChangesCount(projectId),
      getMembersInfo(projectId),
      getActivities(projectId),
      getGithubRepo(projectId),
      getDriveLink(projectId),
      getMilestones(projectId),
      getTasksContribution(projectId),
      getGithubAdditionsCount(projectId),
      getGithubDeletionsCount(projectId),
      getGithubCommits(projectId),
      getGithubCommitsContribution(projectId),
      getGithubLOCsContribution(projectId),
      getFilesCount(projectId),
      getFileChanges(projectId),
      getFilesContribution(projectId)
    ];

    this.props.fetchData(fetches);
  }
  handleTabChange = (e, value) => {
    this.setState({ currTab: value });
  };
  renderTab = currTab => {
    let data = this.props.projectDetail;
    switch (currTab) {
      case 0:
        return <OverviewTab data={data.overview} />;
      case 1:
        return <MilestonesAndTasksTab data={data.milestonesAndTasks} />;
      case 2:
        return <GithubTab data={data.github} />;
      case 3:
        return <FilesTab data={data.files} />;
      default:
        return null;
    }
  };
  render() {
    const { currTab } = this.state;
    return (
      <DashboardLayout heading={`Project ${this.props.projectDetail.name}`} noOptions>
        <Content>
          <Section>
            <Paper elevation={0}>
              <Tabs
                value={currTab}
                onChange={this.handleTabChange}
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

const mapStateToProps = state => {
  let {
    dashboardData: { projectDetail }
  } = state;
  return { projectDetail };
};
const mapDispatchToProps = {
  fetchData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetailPage);
