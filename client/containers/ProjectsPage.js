import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import ReactHighcharts from "react-highcharts";
import moment from "moment";

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

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
  projectsTableCellClicked = (row, column, event) => {
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
                  <Table onCellClick={this.projectsTableCellClicked}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                      <TableRow>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Repository</TableHeaderColumn>
                        <TableHeaderColumn>Members</TableHeaderColumn>
                        <TableHeaderColumn>Size</TableHeaderColumn>
                        <TableHeaderColumn>Created Date</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                      {latestProjects.map((row, index) => (
                        <TableRow key={index}>
                          <TableRowColumn>{row.content}</TableRowColumn>
                          <TableRowColumn>{row.github_repo_name}</TableRowColumn>
                          <TableRowColumn>{row.members}</TableRowColumn>
                          <TableRowColumn>{row.project_size}</TableRowColumn>
                          <TableRowColumn>{row.created_at}</TableRowColumn>
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
