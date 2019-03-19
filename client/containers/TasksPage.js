import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import moment from "moment";

import Content from "../components/Content";
import Section from "../components/Section";
import MetricsRow from "../components/MetricsRow";

import DashboardLayout from "./DashboardLayout";

import { fetchData } from "../actions/actions";
import {
  getTotalTasks,
  getPendingTasks,
  getCompletedTasks,
  getTasksCompletionData,
  getTasksFeatureUtilizationRate
} from "../actions/api";

class TasksPage extends Component {
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
      getTotalTasks(startDate, endDate),
      getPendingTasks(startDate, endDate),
      getCompletedTasks(startDate, endDate),
      getTasksCompletionData(startDate, endDate),
      getTasksFeatureUtilizationRate(startDate, endDate)
    ];
    this.props.fetchData(fetches);
  }

  render() {
    let tasks = this.props.tasks;
    let totalCompletionTimeInSeconds = tasks.totalCompletionTimeInSeconds.toFixed(1);
    let totalCompletionTimeInHours = tasks.totalCompletionTimeInHours.toFixed(1);
    let totalCompletionTimeInDays = tasks.totalCompletionTimeInDays.toFixed(1);
    let averageCompletionTimeInSeconds = tasks.averageCompletionTimeInSeconds.toFixed(1);
    let averageCompletionTimeInHours = tasks.averageCompletionTimeInHours.toFixed(1);
    let averageCompletionTimeInDays = tasks.averageCompletionTimeInDays.toFixed(1);
    let standardDeviationCompletionTimeInSeconds = tasks.standardDeviationCompletionTimeInSeconds.toFixed(
      1
    );
    let standardDeviationCompletionTimeInHours = tasks.standardDeviationCompletionTimeInHours.toFixed(
      1
    );
    let standardDeviationCompletionTimeInDays = tasks.standardDeviationCompletionTimeInDays.toFixed(
      1
    );
    let featureUtilizationRate = (tasks.featureUtilizationRate * 100).toFixed(1) + "%";

    let totalCompletionTime = totalCompletionTimeInSeconds + "s";
    let averageCompletionTime = averageCompletionTimeInSeconds + "s";
    let standardDeviationCompletionTime = standardDeviationCompletionTimeInSeconds + "s";

    // console.log('totalCompletionTime', totalCompletionTime);
    // console.log('averageCompletionTime', averageCompletionTime);
    // console.log('standardDeviationCompletionTime', standardDeviationCompletionTime);

    if (totalCompletionTimeInSeconds > 3600) {
      totalCompletionTime = totalCompletionTimeInHours + " hrs";
      if (totalCompletionTimeInHours > 24) {
        totalCompletionTime = totalCompletionTimeInDays + " days";
      }
    }
    if (averageCompletionTimeInSeconds > 3600) {
      averageCompletionTime = averageCompletionTimeInHours + " hrs";
      if (averageCompletionTimeInHours > 24) {
        averageCompletionTime = averageCompletionTimeInDays + " days";
      }
    }
    if (standardDeviationCompletionTimeInSeconds > 3600) {
      standardDeviationCompletionTime = standardDeviationCompletionTimeInHours + " hrs";
      if (standardDeviationCompletionTimeInHours > 24) {
        standardDeviationCompletionTime = standardDeviationCompletionTimeInDays + " days";
      }
    }

    let metricsData_1 = [
      {
        metric: tasks.totalTasks,
        metricLabel: "Total Tasks"
      },
      {
        metric: tasks.pendingTasks,
        metricLabel: "Pending Tasks"
      },
      {
        metric: tasks.completedTasks,
        metricLabel: "Completed Tasks"
      }
    ];
    let metricsData_2 = [
      {
        metric: totalCompletionTime,
        metricLabel: "Total Completion Time"
      },
      {
        metric: averageCompletionTime,
        metricLabel: "Average Completion Time"
      },
      {
        metric: standardDeviationCompletionTime,
        metricLabel: "Standard Deviation - Completion Time"
      },
      {
        metric: featureUtilizationRate,
        metricLabel: "Feature Utilization Rate"
      }
    ];
    return (
      <DashboardLayout heading="Tasks">
        <Content id="tasksPage">
          <Section>
            <MetricsRow metricsData={metricsData_1} />
          </Section>
          <Section>
            <MetricsRow metricsData={metricsData_2} />
          </Section>
        </Content>
      </DashboardLayout>
    );
  }
}

const mapStateToProps = state => {
  let {
    dashboardData: { tasks },
    queryOptions
  } = state;
  return { tasks, queryOptions };
};
const mapDispatchToProps = {
  fetchData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksPage);
