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
import MetricsRow from '../components/MetricsRow'
import Subheading from '../components/Subheading';
import Card from '../components/Card';

export class ProjectsPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let projects = this.props.projects;
    let latestProjects = projects.latestProjects;
    let activeProjectsRate = (projects.activeProjects * 100).toFixed(1) + "%";
    let metricsData = [{
      metric: projects.newProjects,
      metricLabel: "New Projects",
    }, {
      metric: projects.averageProjectSize,
      metricLabel: "Average Project Size",
    }, {
      metric: activeProjectsRate,
      metricLabel: "Active Projects",
    }];
    return (
      <Content>
        <Section>
          <MetricsRow metricsData={metricsData} />
        </Section>
        <Section>
          <Subheading>Projects</Subheading>
          <Card>
            <Table>
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
      </Content>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  projects: state.projects,
});

export default connect(
  mapStateToProps,
  null
)(ProjectsPage);
