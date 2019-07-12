import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import moment from "moment";

import { fetchData } from "../actions/actions";
import { getTotalUsers, getNewUsers, getActiveUsers } from "../actions/globalapi";

import { getLatestUsers } from "../actions/userapi";

import Content from "../components/Content";
import Section from "../components/Section";
import MetricsRow from "../components/MetricsRow";
import Subheading from "../components/Subheading";
import PaginationTable from "../components/PaginationTable";

import DashboardLayout from "./DashboardLayout";

class UsersPage extends Component {
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
      getTotalUsers(startDate, endDate),
      getNewUsers(startDate, endDate),
      getActiveUsers(startDate, endDate),
      getLatestUsers(maxEntries)
    ];
    this.props.fetchData(fetches);
  }

  usersTableCellClicked = ({ user_id }) => {
    this.props.history.push(`${this.props.match.url}/${user_id}`);
  };

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
                <PaginationTable
                  rows={latestUsers}
                  headers={["Name", "Email", "Github", "Projects", "Joined Date"]}
                  rowItems={[
                    "display_name",
                    "email",
                    "github_login",
                    "user_projects",
                    "created_at"
                  ]}
                  onRowClicked={this.usersTableCellClicked}
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
    dashboardData: { users },
    queryOptions
  } = state;
  return { users, queryOptions };
};

const mapDispatchToProps = {
  fetchData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersPage);

const styles = {
  tableHead: {
    color: "black"
  },
  tableRow: {
    cursor: "pointer"
  }
};
