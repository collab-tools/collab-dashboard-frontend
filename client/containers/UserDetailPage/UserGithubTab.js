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
  },
  tableContainer: {
    padding: "10px",
    maxHeight: "300px",
    overflowY: "scroll"
  },
  tableRow: {
    cursor: "pointer"
  }
};
class GithubTab extends Component {
  onCommitSelect = (repo, sha) => {
    window.open(`https://github.com/${repo}/commit/${sha}`, "_blank");
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
          <Paper elevation={0} style={styles.tableContainer}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Project</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell>Timestamp</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {commits.map(({ project, message, timestamp, repo, SHA }, index) => (
                  <TableRow
                    key={index}
                    style={styles.tableRow}
                    hover={true}
                    onClick={() => this.onCommitSelect(repo, SHA)}
                  >
                    <TableCell>{project}</TableCell>
                    <TableCell>{message}</TableCell>
                    <TableCell>{timestamp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
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
