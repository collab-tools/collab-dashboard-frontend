import React, { Component } from "react";
import { connect } from "react-redux";
import Highcharts from "react-highcharts";

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

class FilesTab extends Component {
  render() {
    const {
      data: { link, summary, changes, contributions }
    } = this.props;
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
        text: "Number of Changes by Members"
      },
      xAxis: {
        categories: contributions.map(item => item.member)
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
          <Paper style={styles.linkContainer}>
            {/* conditionally adds a href attribute if the link is non-empty*/}
            <a {...link && { href: link }} style={{ textDecoration: "none" }} target="_blank">
              <div style={styles.linkTitle}>Folder Link</div>
              <div style={styles.linkUrl}>{link || "N/A"}</div>
            </a>
          </Paper>
        </Section>

        <Section>
          <Subheading>Summary</Subheading>
          <MetricsRow metricsData={metricsData} />
        </Section>
        <Section>
          <Subheading>Changes</Subheading>
          <PaginationTable
            rows={changes}
            headers={["Author", "File Name", "Timestamp"]}
            rowItems={["author", "fileName", "timestamp"]}
          />
        </Section>
        <Section>
          <Subheading>Member Contributions</Subheading>
          <Highcharts config={graphConfig} />
        </Section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({});
export default connect(mapStateToProps)(FilesTab);
