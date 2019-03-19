import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import ReactHighcharts from "react-highcharts";
import moment from "moment";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import Content from "../components/Content";
import Section from "../components/Section";
import MetricsRow from "../components/MetricsRow";
import Subheading from "../components/Subheading";
import Card from "../components/Card";

import DashboardLayout from "./DashboardLayout";

class GithubPage extends Component {
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
    //TODO: write fetching actions and reducers
  }
  render() {
    let metricsData_1 = [
      {
        metric: "2",
        metricLabel: "New Repositories"
      },
      {
        metric: "15",
        metricLabel: "Commits Pushed"
      },
      {
        metric: "29",
        metricLabel: "Releases Pushed"
      }
    ];
    let metricsData_2 = [
      {
        metric: "12%",
        metricLabel: "Feature Utilization Rate"
      },
      {
        metric: "7",
        metricLabel: "Standard Deviation - New Commits"
      },
      {
        metric: "15",
        metricLabel: "Tracked Releases"
      }
    ];
    let commitsGraphConfig = {
      chart: {
        style: {
          fontFamily: "'Roboto', sans-serif",
          fontWeight: "bold"
        }
      },
      title: {
        text: "Commits (Contributions to Master Branches)"
      },
      yAxis: {
        title: {
          text: "No. of Commits"
        }
      },
      xAxis: {
        dates: ["12 Jan", "13 Jan", "14 Jan", "15 Jan", "16 Jan"]
      },
      series: [
        {
          name: "No. of Files Shared",
          data: [4, 0, 3, 1, 2]
        }
      ]
    };
    let latestRepositories = [
      {
        project_name: "Project 1",
        repository_name: "Repository136",
        release_tag: "4238942341232",
        assets: "N.A",
        date: "14 Jan 2018"
      },
      {
        project_name: "Project 62",
        repository_name: "Repository061",
        release_tag: "3485989023489",
        assets: "N.A",
        date: "18 Jan 2018"
      }
    ];
    return (
      <DashboardLayout heading="Github">
        <Content id="githubPage">
          <Section>
            <MetricsRow metricsData={metricsData_1} />
          </Section>
          <Section>
            <MetricsRow metricsData={metricsData_2} />
          </Section>
          <Section>
            <Subheading>Commits</Subheading>
            <Card>
              <ReactHighcharts config={commitsGraphConfig} />
            </Card>
          </Section>
          <Section>
            <Subheading>Releases</Subheading>
            <Card>
              <Table>
                <TableHead displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableCell>Project</TableCell>
                    <TableCell>Repository</TableCell>
                    <TableCell>Release Tag</TableCell>
                    <TableCell>Assets</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody displayRowCheckbox={false}>
                  {latestRepositories.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.project_name}</TableCell>
                      <TableCell>{row.repository_name}</TableCell>
                      <TableCell>{row.release_tag}</TableCell>
                      <TableCell>{row.assets}</TableCell>
                      <TableCell>{row.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </Section>
        </Content>
      </DashboardLayout>
    );
  }
}

const mapStateToProps = state => {
  let { queryOptions } = state;
  return { queryOptions };
};
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GithubPage);
