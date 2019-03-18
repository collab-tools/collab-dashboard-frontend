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

import {
  getTotalUsers,
  getNewUsers,
  getActiveUsers,
  getLatestUsers,
  getProjectsByUserId
} from "../actions/actions";

import Content from "../components/Content";
import Section from "../components/Section";
import MetricsRow from "../components/MetricsRow";
import Subheading from "../components/Subheading";
import Card from "../components/Card";

import DashboardLayout from "./DashboardLayout";

class UsersPage extends Component {
  state = {
    shouldRenderProjectsByUserId: false,
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

    this.props.getTotalUsers(startDate, endDate);
    this.props.getNewUsers(startDate, endDate);
    this.props.getActiveUsers(startDate, endDate);
    this.props.getLatestUsers(maxEntries);
  }

  usersTableCellClicked = (row, column, event) => {
    let users = this.props.users;
    let latestUsers = users.latestUsers;
    let userId = latestUsers[row].user_id;
    this.props.getProjectsByUserId(userId);
    this.setState({
      shouldRenderProjectsByUserId: true,
      rowNumber: row
    });
  };

  _renderProjectsByUserId() {
    let users = this.props.users;
    let userName = users.latestUsers[this.state.rowNumber].display_name;
    // console.log(this.state.rowNumber);
    let projectNamesByUserId = users.projectNamesByUserId;
    let completedTasksByUserId = users.completedTasksByUserId;
    let incompleteTasksByUserId = users.incompleteTasksByUserId;
    let totalProjectsByUserId = users.totalProjectsByUserId;
    let totalCompletedTasksByUserId = users.totalCompletedTasksByUserId;
    let totalIncompleteTasksByUserId = users.totalIncompleteTasksByUserId;
    let metricsData = [
      {
        metric: totalProjectsByUserId,
        metricLabel: "Total Projects"
      },
      {
        metric: totalCompletedTasksByUserId,
        metricLabel: "Total Completed Tasks"
      },
      {
        metric: totalIncompleteTasksByUserId,
        metricLabel: "Total Incomplete Tasks"
      }
    ];
    let projectsByUserIdGraphConfig = {
      chart: {
        type: "bar"
      },
      title: {
        text: "Projects"
      },
      xAxis: {
        categories: projectNamesByUserId
      },
      yAxis: {
        min: 0,
        title: {
          text: "Tasks"
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
          data: completedTasksByUserId
        },
        {
          name: "Incomplete Tasks",
          data: incompleteTasksByUserId
        }
      ]
    };

    return (
      <div>
        <Section>
          <Subheading>Project Statistics by {userName}</Subheading>
          <MetricsRow metricsData={metricsData} />
        </Section>
        <Section>
          <Card>
            <ReactHighcharts config={projectsByUserIdGraphConfig} />
          </Card>
        </Section>
      </div>
    );
  }

  render() {
    let users = this.props.users;
    let latestUsers = users.latestUsers;
    let metricsData = [
      { metric: users.totalUsers, metricLabel: "Total Users" },
      {
        metric: users.newUsers,
        metricLabel: "New Users"
      },
      {
        metric: users.activeUsers,
        metricLabel: "Active Users"
      }
    ];
    // console.log('UsersPage - projectsByUserId', projectsByUserId);
    return (
      <DashboardLayout heading="Users">
        <Content id="usersPage">
          <Section>
            <MetricsRow metricsData={metricsData} />
          </Section>
          {latestUsers.length < 1 ? (
            <Section>
              <Subheading>No Users Found!</Subheading>
            </Section>
          ) : (
            <div>
              <Section>
                <Subheading>Users</Subheading>
                <Card>
                  <Table onCellClick={this.usersTableCellClicked}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                      <TableRow>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Email</TableHeaderColumn>
                        <TableHeaderColumn>Github</TableHeaderColumn>
                        <TableHeaderColumn>Projects</TableHeaderColumn>
                        <TableHeaderColumn>Joined Date</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                      {latestUsers.map((row, index) => (
                        <TableRow key={index}>
                          <TableRowColumn>{row.display_name}</TableRowColumn>
                          <TableRowColumn>{row.email}</TableRowColumn>
                          <TableRowColumn>{row.github_login}</TableRowColumn>
                          <TableRowColumn>{row.user_projects}</TableRowColumn>
                          <TableRowColumn>{row.created_at}</TableRowColumn>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </Section>
              {this.state.shouldRenderProjectsByUserId && this._renderProjectsByUserId()}
            </div>
          )}
        </Content>
      </DashboardLayout>
    );
  }
}

const mapStateToProps = state => {
  let { users, queryOptions } = state;
  return { users, queryOptions };
};

const mapDispatchToProps = {
  getTotalUsers,
  getNewUsers,
  getActiveUsers,
  getLatestUsers,
  getProjectsByUserId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersPage);
