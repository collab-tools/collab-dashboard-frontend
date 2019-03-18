import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import ReactHighcharts from "react-highcharts";
import moment from "moment";

import Content from "../components/Content";
import Section from "../components/Section";
import MetricsRow from "../components/MetricsRow";
import Subheading from "../components/Subheading";
import Card from "../components/Card";

import DashboardLayout from "./DashboardLayout";

import {
  getNewUsers,
  getTotalMilestones,
  getRetentionRate,
  getActiveUsers,
  getInactiveUsers,
  getMilestonesFeatureUtilizationRate,
  getTasksFeatureUtilizationRate
} from "../actions/actions";

class HomePage extends Component {
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

    this.props.getNewUsers(startDate, endDate);
    this.props.getTotalMilestones(startDate, endDate);
    this.props.getRetentionRate(startDate, endDate);
    this.props.getActiveUsers(startDate, endDate);
    this.props.getInactiveUsers(startDate, endDate);
    this.props.getMilestonesFeatureUtilizationRate(startDate, endDate);
    this.props.getTasksFeatureUtilizationRate(startDate, endDate);
  }
  render() {
    let users = this.props.users;
    let milestones = this.props.milestones;
    let tasks = this.props.tasks;
    let retentionRate = (users.retentionRate * 100).toFixed(1) + "%";
    let milestonesFeatureUtilizationRate = milestones.featureUtilizationRate.toFixed(1) * 100;
    let tasksFeatureUtilizationRate = tasks.featureUtilizationRate.toFixed(1) * 100;
    let metricsData_1 = [
      {
        metric: users.newUsers,
        metricLabel: "New Users"
      },
      {
        metric: milestones.totalMilestones,
        metricLabel: "Total Milestones"
      },
      {
        metric: retentionRate,
        metricLabel: "Retention Rate"
      }
    ];
    let metricsData_2 = [
      {
        metric: users.activeUsers,
        metricLabel: "Active Users"
      },
      {
        metric: users.inactiveUsers,
        metricLabel: "Inactive Users"
      }
    ];
    let featureUtilizationGraphConfig = {
      chart: {
        type: "bar",
        style: {
          fontFamily: "'Roboto', sans-serif",
          fontWeight: "bold"
        }
      },
      title: {
        text: "Feature Utilization Rate"
      },
      yAxis: {
        title: {
          text: "Features"
        }
      },
      xAxis: {
        categories: ["Milestones", "Tasks"]
      },
      series: [
        {
          name: "Feature Utilization Rate (%)",
          data: [milestonesFeatureUtilizationRate, tasksFeatureUtilizationRate]
        }
      ]
    };
    return (
      <DashboardLayout heading="NUSCollab in a Glance">
        <Content id="homePage">
          <Section>
            <MetricsRow metricsData={metricsData_1} />
          </Section>
          <Section>
            <MetricsRow metricsData={metricsData_2} />
          </Section>
          <Section>
            <Subheading>Feature Utilization Rate</Subheading>
            <Card>
              <ReactHighcharts config={featureUtilizationGraphConfig} />
            </Card>
          </Section>
        </Content>
      </DashboardLayout>
    );
  }
}

const mapStateToProps = state => {
  let { users, milestones, tasks, queryOptions } = state;
  return { users, milestones, tasks, queryOptions };
};

const mapDispatchToProps = {
  getNewUsers,
  getTotalMilestones,
  getRetentionRate,
  getActiveUsers,
  getInactiveUsers,
  getMilestonesFeatureUtilizationRate,
  getTasksFeatureUtilizationRate
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
