import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import moment from "moment";

import { fetchData } from "../actions/actions";
import { getTotalProjects, getNewProjects, getActiveProjects } from "../actions/globalapi";
import { getLatestProjects } from "../actions/projectapi";

import Content from "../components/Content";
import Section from "../components/Section";
import MetricsRow from "../components/MetricsRow";
import Subheading from "../components/Subheading";
import PaginationTable from "../components/PaginationTable";

import DashboardLayout from "./DashboardLayout";

class ProjectsPage extends Component {
  componentWillMount() {
    this._fetchData();
  }
  componentDidUpdate(prevProps) {
    const { recencyDays, maxEntries } = this.props.queryOptions;
    const { recencyDays: prevRecencyDays, maxEntries: prevMaxEntries } = prevProps.queryOptions;
    if (recencyDays !== prevRecencyDays || maxEntries !== prevMaxEntries) {
      this._fetchData();
    }
  }
  _fetchData() {
    const { recencyDays, maxEntries } = this.props.queryOptions;
    let startDate = moment()
      .subtract(recencyDays, "d")
      .format("YYYY/MM/DD");
    let endDate = moment().format("YYYY/MM/DD");

    let fetches = [
      getTotalProjects(startDate, endDate),
      getNewProjects(startDate, endDate),
      getLatestProjects(maxEntries),
      getActiveProjects(startDate, endDate)
    ];

    this.props.fetchData(fetches);
  }
  projectsTableCellClicked = ({ project_id }) => {
    this.props.history.push(`${this.props.match.url}/${project_id}`);
  };

  render() {
    let projects = this.props.projects;
    let latestProjects = projects.latestProjects;
    let activeProjectsRate = (projects.activeProjects * 100).toFixed(1) + "%";
    let metricsData = [
      {
        metric: projects.newProjects,
        metricLabel: "New Projects"
      },
      {
        metric: projects.averageProjectSize,
        metricLabel: "Average Project Size"
      },
      {
        metric: activeProjectsRate,
        metricLabel: "Active Projects"
      }
    ];
    return (
      <DashboardLayout heading="Projects">
        <Content id="projectsPage">
          <Section>
            <MetricsRow metricsData={metricsData} />
          </Section>
          {latestProjects.length < 1 ? (
            <Section>
              <Subheading>No Projects Found!</Subheading>
            </Section>
          ) : (
            <div>
              <Section>
                <Subheading>Projects</Subheading>
                <PaginationTable
                  rows={latestProjects}
                  headers={["Name", "Repository", "Members", "Size", "Created Date"]}
                  rowItems={[
                    "content",
                    "github_repo_name",
                    "members",
                    "project_size",
                    "created_at"
                  ]}
                  onRowClicked={this.projectsTableCellClicked}
                />
              </Section>
            </div>
          )}
        </Content>
      </DashboardLayout>
    );
  }
}

const mapStateToProps = state => {
  let {
    dashboardData: { projects },
    queryOptions
  } = state;
  return { projects, queryOptions };
};

const mapDispatchToProps = {
  fetchData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsPage);

const styles = {
  tableRow: {
    cursor: "pointer"
  }
};
