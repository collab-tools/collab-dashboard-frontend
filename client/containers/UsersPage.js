import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactHighcharts from 'react-highcharts';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import Content from '../components/Content';
import Section from '../components/Section';
import MetricsRow from '../components/MetricsRow';
import Subheading from '../components/Subheading';
import Card from '../components/Card';

export class UsersPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let users = this.props.users;
    let latestUsers = users.latestUsers;
    let metricsData = [{
      metric: users.newUsers,
      metricLabel: "New Users",
    }, {
      metric: users.activeUsers,
      metricLabel: "Active Users",
    }];
    return (
      <Content>
        <Section>
          <MetricsRow metricsData={metricsData} />
        </Section>
        <Section>
          <Subheading>Users</Subheading>
          <Card>
            <Table>
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
      </Content>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  users: state.users,
});

export default connect(
  mapStateToProps,
  null
)(UsersPage);
