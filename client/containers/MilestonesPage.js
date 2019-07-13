import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import moment from "moment";

import Content from "../components/Content";
import Section from "../components/Section";
import MetricsRow from "../components/MetricsRow";

import DashboardLayout from "./DashboardLayout";

import { fetchData } from "../actions/actions";
import {
  getTotalMilestones,
  getCompletedMilestones,
  getMilestonesDeadlinesMissedRate,
  getAverageMilestonesPerProject,
  getAverageTasksPerMilestone,
  getMilestonesFeatureUtilizationRate,
  getMilestonesCompletionData
} from "../actions/globalapi";

class MilestonesPage extends Component {
  componentWillMount() {
    this._fetchData();
  }

  componentDidUpdate(prevProps) {
    const { recencyDays } = this.props.queryOptions;
    const { recencyDays: prevRecencyDays } = prevProps.queryOptions;
    if (recencyDays !== prevRecencyDays) {
      this._fetchData();
    }
  }

  _fetchData() {
    const { recencyDays } = this.props.queryOptions;
    let startDate = moment()
      .subtract(recencyDays, "d")
      .format("YYYY/MM/DD");
    let endDate = moment().format("YYYY/MM/DD");

    let fetches = [
      getTotalMilestones(startDate, endDate),
      getCompletedMilestones(startDate, endDate),
      getAverageMilestonesPerProject(startDate, endDate),
      getAverageTasksPerMilestone(startDate, endDate),
      getMilestonesCompletionData(startDate, endDate),
      getMilestonesDeadlinesMissedRate(startDate, endDate),
      getMilestonesFeatureUtilizationRate(startDate, endDate)
    ];
    this.props.fetchData(fetches);
  }
  render() {
    let milestones = this.props.milestones;
    let deadlinesMissedRate = (milestones.deadlinesMissedRate * 100).toFixed(1) + "%";
    let averageMilestonesPerProject = milestones.averageMilestonesPerProject.toFixed(1);
    let averageTasksPerMilestone = milestones.averageTasksPerMilestone.toFixed(1);
    let totalCompletionTimeInSeconds = milestones.totalCompletionTimeInSeconds.toFixed(1);
    let totalCompletionTimeInHours = milestones.totalCompletionTimeInHours.toFixed(1);
    let totalCompletionTimeInDays = milestones.totalCompletionTimeInDays.toFixed(1);
    let averageCompletionTimeInSeconds = milestones.averageCompletionTimeInSeconds.toFixed(1);
    let averageCompletionTimeInHours = milestones.averageCompletionTimeInHours.toFixed(1);
    let averageCompletionTimeInDays = milestones.averageCompletionTimeInDays.toFixed(1);
    let standardDeviationCompletionTimeInSeconds = milestones.standardDeviationCompletionTimeInSeconds.toFixed(
      1
    );
    let standardDeviationCompletionTimeInHours = milestones.standardDeviationCompletionTimeInHours.toFixed(
      1
    );
    let standardDeviationCompletionTimeInDays = milestones.standardDeviationCompletionTimeInDays.toFixed(
      1
    );
    let featureUtilizationRate = (milestones.featureUtilizationRate * 100).toFixed(1) + "%";

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
        metric: milestones.totalMilestones,
        metricLabel: "Total Milestones"
      },
      {
        metric: milestones.completedMilestones,
        metricLabel: "Completed Milestones"
      },
      {
        metric: deadlinesMissedRate,
        metricLabel: "Deadlines Missed"
      }
    ];
    let metricsData_2 = [
      {
        metric: averageMilestonesPerProject,
        metricLabel: "Average Milestones Per Project"
      },
      {
        metric: averageTasksPerMilestone,
        metricLabel: "Average Tasks Per Milestone"
      },
      {
        metric: featureUtilizationRate,
        metricLabel: "Feature Utilization Rate"
      }
    ];
    let metricsData_3 = [
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
      }
    ];
    return (
      <DashboardLayout heading="Milestones">
        <Content id="milestonesPage">
          <Section>
            <MetricsRow metricsData={metricsData_1} />
          </Section>
          <Section>
            <MetricsRow metricsData={metricsData_2} />
          </Section>
          <Section>
            <MetricsRow metricsData={metricsData_3} />
          </Section>
        </Content>
      </DashboardLayout>
    );
  }
}

const mapStateToProps = state => {
  let {
    dashboardData: { milestones },
    queryOptions
  } = state;
  return { milestones, queryOptions };
};
const mapDispatchToProps = {
  fetchData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MilestonesPage);
