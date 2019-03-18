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

class GoogleDrivePage extends Component {
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
        metric: "3",
        metricLabel: "New Files Shared"
      },
      {
        metric: "5",
        metricLabel: "Changes Made"
      }
    ];
    let metricsData_2 = [
      {
        metric: "30%",
        metricLabel: "Feature Utilization Rate"
      },
      {
        metric: "5",
        metricLabel: "Standard Deviation - New Files"
      },
      {
        metric: "15",
        metricLabel: "Active Teams"
      }
    ];
    let fileTypesSharedGraphConfig = {
      chart: {
        type: "bar",
        style: {
          fontFamily: "'Roboto', sans-serif",
          fontWeight: "bold"
        }
      },
      title: {
        text: "File Types Shared"
      },
      yAxis: {
        title: {
          text: "Files Shared"
        }
      },
      xAxis: {
        categories: [".docx", ".jpg", ".png", ".pdf"]
      },
      series: [
        {
          name: "No. of Files Shared",
          data: [4, 12, 3, 1]
        }
      ]
    };
    return (
      <DashboardLayout heading="Google Drive">
        <Content id="drivePage">
          <Section>
            <MetricsRow metricsData={metricsData_1} />
          </Section>
          <Section>
            <MetricsRow metricsData={metricsData_2} />
          </Section>
          <Section>
            <Subheading>File Types Shared</Subheading>
            <Card>
              <ReactHighcharts config={fileTypesSharedGraphConfig} />
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
)(GoogleDrivePage);
