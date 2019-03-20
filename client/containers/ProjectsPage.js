import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import ReactHighcharts from "react-highcharts";
import moment from "moment";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import { fetchData } from "../actions/actions";
import {
  getTotalProjects,
  getNewProjects,
  getActiveProjects,
  getLatestProjects,
  getMilestonesByProjectId
} from "../actions/api";

import Content from "../components/Content";
import Section from "../components/Section";
import MetricsRow from "../components/MetricsRow";
import Subheading from "../components/Subheading";
import Card from "../components/Card";

import DashboardLayout from "./DashboardLayout";

class ProjectsPage extends Component {
  state = {
    shouldRenderMilestonesByProjectId: false,
    rowNumber: 0
  };
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
  projectsTableCellClicked = row => {
    let projects = this.props.projects;
    let latestProjects = projects.latestProjects;
    let projectId = latestProjects[row].project_id;
    this.props.fetchData([getMilestonesByProjectId(projectId)]);
    this.setState({
      shouldRenderMilestonesByProjectId: true,
      rowNumber: row
    });
  };

  _renderMilestonesByProjectId() {
    let projects = this.props.projects;
    let latestProjects = projects.latestProjects;
    let projectName = latestProjects[this.state.rowNumber].content;
    let milestoneNamesByProjectId = projects.milestoneNamesByProjectId;
    let completedTasksInMilestonesByProjectId = projects.completedTasksInMilestonesByProjectId;
    let incompleteTasksInMilestonesByProjectId = projects.incompleteTasksInMilestonesByProjectId;
    let milestoneNamesByProjectIdGraphConfig = {
      chart: {
        type: "bar"
      },
      title: {
        text: "Milestones"
      },
      xAxis: {
        categories: milestoneNamesByProjectId
      },
      yAxis: {
        min: 0,
        title: {
          text: "Completed Tasks"
        }
      },
      legend: {
        reversed: true
      },
      plotOptions: {
        series: {
          stacking: "normal"
        }
      },
      series: [
        {
          name: "Completed Tasks",
          data: completedTasksInMilestonesByProjectId
        },
        {
          name: "Incomplete Tasks",
          data: incompleteTasksInMilestonesByProjectId
        }
      ]
    };

    return (
      <div>
        <Section>
          <Subheading>Milestone Statistics by {projectName}</Subheading>
          <Card>
            <ReactHighcharts config={milestoneNamesByProjectIdGraphConfig} />
          </Card>
        </Section>
      </div>
    );
  }

  render() {
    let projects = this.props.projects;
    let latestProjects = projects.latestProjects;
    let milestonesByProjectId = projects.milestonesByProjectId;
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
                <Card>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Repository</TableCell>
                        <TableCell>Members</TableCell>
                        <TableCell>Size</TableCell>
                        <TableCell>Created Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {latestProjects.map((row, index) => (
                        <TableRow
                          key={index}
                          onClick={() => this.projectsTableCellClicked(index)}
                          style={styles.tableRow}
                          hover={true}
                        >
                          <TableCell>{row.content}</TableCell>
                          <TableCell>{row.github_repo_name}</TableCell>
                          <TableCell>{row.members}</TableCell>
                          <TableCell>{row.project_size}</TableCell>
                          <TableCell>{row.created_at}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </Section>
              {this.state.shouldRenderMilestonesByProjectId && this._renderMilestonesByProjectId()}
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
