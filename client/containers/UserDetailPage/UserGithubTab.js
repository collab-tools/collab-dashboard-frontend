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
class GithubTab extends Component {
  onCommitSelect = ({ repo, SHA }) => {
    window.open(`https://github.com/${repo}/commit/${SHA}`, "_blank");
  };
  render() {
    const { link, summary, commits, contributions } = this.props.data;
    const metricsData = [
      {
        metric: summary.commitsNum,
        metricLabel: "Total Commits"
      },
      {
        metric: summary.linesAdded,
        metricLabel: "Number of Lines Added"
      },
      {
        metric: summary.linesDeleted,
        metricLabel: "Number of Lines Deleted"
      }
    ];
    const graphConfig_1 = {
      chart: {
        type: "bar"
      },
      title: {
        text: "Number of Commits by Projects"
      },
      xAxis: {
        categories: contributions.commits.map(item => item.project)
      },
      yAxis: {
        min: 0,
        title: {
          text: "Commits"
        }
      },
      legend: {
        reversed: false
      },
      series: [
        {
          name: "Commits",
          data: contributions.commits.map(item => item.commits)
        }
      ]
    };
    const graphConfig_2 = {
      chart: {
        type: "bar"
      },
      title: {
        text: "Number of Lines of Codes Changed by Projects"
      },
      xAxis: {
        categories: contributions.LOCs.map(item => item.project)
      },
      yAxis: {
        min: 0,
        title: {
          text: "LOCs"
        }
      },
      legend: {
        reversed: true
      },
      plotOptions: {
        series: {
          stacking: "normal"
        }
      },
      series: [
        {
          name: "Deletions",
          data: contributions.LOCs.map(item => item.deletions)
        },
        {
          name: "Additions",
          data: contributions.LOCs.map(item => item.additions)
        }
      ]
    };
    return (
      <React.Fragment>
        <Section>
          <Paper style={styles.linkContainer}>
            <a {...link && { href: link }} style={{ textDecoration: "none" }} target="_blank">
              <div style={styles.linkTitle}>Account</div>
              <div style={styles.linkUrl}>{link || "N/A"}</div>
            </a>
          </Paper>
        </Section>
        <Section>
          <Subheading>Summary</Subheading>
          <MetricsRow metricsData={metricsData} />
        </Section>
        <Section>
          <Subheading>Commits</Subheading>
          <PaginationTable
            rows={commits}
            headers={["Project", "Message", "Timestamp"]}
            rowItems={["project", "message", "timestamp"]}
            onRowClicked={this.onCommitSelect}
          />
        </Section>
        <Section>
          <Subheading>Contributions per Project</Subheading>
          <Highcharts config={graphConfig_1} />
        </Section>
        <Section>
          <Highcharts config={graphConfig_2} />
        </Section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({});
export default connect(mapStateToProps)(GithubTab);
