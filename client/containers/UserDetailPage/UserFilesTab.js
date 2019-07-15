import React, { Component } from "react";
import { connect } from "react-redux";
import Highcharts from "react-highcharts";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";

import Section from "../../components/Section";
import MetricsRow from "../../components/MetricsRow";
import Subheading from "../../components/Subheading";
import PaginationTable from "../../components/PaginationTable";

const styles = {
  linkContainer: {
    padding: "10px",
    marginBottom: "15px",
    maxWidth: "500px"
  },
  linkTitle: {
    color: "black",
    fontWeight: "bold",
    marginBottom: "10px"
  },
  linkUrl: {
    fontSize: "12px",
    color: "grey"
  }
};

export default class FilesTab extends Component {
  render() {
    const { summary, changes, contributions } = this.props.data;
    const metricsData = [
      {
        metric: summary.filesNum,
        metricLabel: "Number of Files Uploaded"
      },
      {
        metric: summary.changesNum,
        metricLabel: "Number of Changes Made"
      }
    ];
    const graphConfig = {
      chart: {
        type: "bar"
      },
      title: {
        text: "Number of Changes by Projects"
      },
      xAxis: {
        categories: contributions.map(item => item.project)
      },
      yAxis: {
        min: 0,
        title: {
          text: "Changes"
        }
      },
      legend: {
        reversed: false
      },
      series: [
        {
          name: "Changes",
          data: contributions.map(item => item.changes)
        }
      ]
    };
    return (
      <React.Fragment>
        <Section>
          <Subheading>Summary</Subheading>
          <MetricsRow metricsData={metricsData} />
        </Section>
        <Section>
          <Subheading>Changes</Subheading>
          <PaginationTable
            rows={changes}
            headers={["Project", "File Name", "Timestamp"]}
            rowItems={["project", "fileName", "timestamp"]}
            searchableItems={["project", "fileName"]}
          />
        </Section>
        <Section>
          <Subheading>Contributions per Project</Subheading>
          <Highcharts config={graphConfig} />
        </Section>
      </React.Fragment>
    );
  }
}
