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
    padding: "10px"
  },
  tableRow: {
    cursor: "pointer"
  }
};
class GithubTab extends Component {
  render() {
    const metricsData = [
      {
        metric: "42",
        metricLabel: "Total Commits"
      },
      {
        metric: "2593",
        metricLabel: "Number of Lines Added"
      },
      {
        metric: "1129",
        metricLabel: "Number of Lines Deleted"
      }
    ];
    const commits = [
      {
        author: "Captain America",
        message: "implement ProjectDetailPage feature",
        timestamp: "2019-03-20T18:10:49Z"
      },
      {
        author: "Le Vu Khanh Toan",
        message: "fix routing bug",
        timestamp: "2019-03-19T12:10:42Z"
      },
      {
        author: "Iron Man",
        message: "update React",
        timestamp: "2019-03-18T01:42:02Z"
      }
    ];
    const graphConfig_1 = {
      chart: {
        type: "bar"
      },
      title: {
        text: "Number of Commits by Members"
      },
      xAxis: {
        categories: ["Le Vu Khanh Toan", "Captain America", "Iron Man"]
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
          data: [10, 12, 20]
        }
      ]
    };
    const graphConfig_2 = {
      chart: {
        type: "bar"
      },
      title: {
        text: "Number of Lines of Codes Changed by Members"
      },
      xAxis: {
        categories: ["Le Vu Khanh Toan", "Captain America", "Iron Man"]
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
          data: [124, 211, 521]
        },
        {
          name: "Insertions",
          data: [321, 421, 1145]
        }
      ]
    };
    return (
      <React.Fragment>
        <Section>
          <Paper style={styles.linkContainer}>
            <a
              href="https://github.com/ktoan2904/testCollab"
              style={{ textDecoration: "none" }}
              target="_blank"
            >
              <div style={styles.linkTitle}>Repository</div>
              <div style={styles.linkUrl}>https://github.com/ktoan2904/testCollab</div>
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
                  <TableCell>Author</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell>Timestamp</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {commits.map((commit, index) => (
                  <TableRow key={index} style={styles.tableRow} hover={true}>
                    <TableCell>{commit.author}</TableCell>
                    <TableCell>{commit.message}</TableCell>
                    <TableCell>{commit.timestamp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Section>
        <Section>
          <Subheading>Member Contributions</Subheading>
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
