import React, { Component } from "react";
import { connect } from "react-redux";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";

import Content from "../../components/Content";
import Section from "../../components/Section";

import DashboardLayout from "../DashboardLayout";
import OverviewTab from "./UserOverviewTab";
import TasksTab from "./UserTasksTab";
import GithubTab from "./UserGithubTab";
import FilesTab from "./UserFilesTab";

import { fetchData } from "../../actions/actions";
import {
  getUserName,
  getUserProjectsCount,
  getUserCompletedTasksCount,
  getUserIncompleteTasksCount,
  getUserMessagesCount,
  getUserCommitsCount,
  getUserFilesChangesCount,
  getProjectsInfo,
  getUserActivities,
  getUserGithubAccount,
  getUserEmail,
  getUserProjectsTasks,
  getUserTasksContribution,
  getUserGithubAdditions,
  getUserGithubDeletions,
  getUserCommits,
  getUserCommitsContribution,
  getUserLOCsContribution,
  getUserFilesCount,
  getUserFileChanges,
  getUserFilesContribution
} from "../../actions/userapi";

class UserDetailPage extends Component {
  state = {
    currTab: 0
  };
  componentDidMount() {
    this._fetchData();
  }
  _fetchData() {
    const userId = this.props.match.params.id;
    let fetches = [
      getUserName(userId),
      getUserProjectsCount(userId),
      getUserCompletedTasksCount(userId),
      getUserIncompleteTasksCount(userId),
      getUserMessagesCount(userId),
      getUserCommitsCount(userId),
      getUserFilesChangesCount(userId),
      getProjectsInfo(userId),
      getUserActivities(userId),
      getUserGithubAccount(userId),
      getUserEmail(userId),
      getUserProjectsTasks(userId),
      getUserTasksContribution(userId),
      getUserGithubAdditions(userId),
      getUserGithubDeletions(userId),
      getUserCommits(userId),
      getUserCommitsContribution(userId),
      getUserLOCsContribution(userId),
      getUserFilesCount(userId),
      getUserFileChanges(userId),
      getUserFilesContribution(userId)
    ];

    this.props.fetchData(fetches);
  }
  handleTabChange = (e, value) => {
    this.setState({ currTab: value });
  };
  renderTab = currTab => {
    const data = this.props.userDetail;
    switch (currTab) {
      case 0:
        return <OverviewTab data={data.overview} />;
      case 1:
        return <TasksTab data={data.tasks} />;
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
      <DashboardLayout heading={`User ${this.props.userDetail.name}`} noOptions>
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
                <Tab value={1} label="Tasks" />
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
  const {
    dashboardData: { userDetail }
  } = state;
  return { userDetail };
};
const mapDispatchToProps = {
  fetchData
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetailPage);
