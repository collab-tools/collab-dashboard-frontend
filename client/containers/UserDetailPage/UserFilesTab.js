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

class FilesTab extends Component {
  render() {
    const metricsData = [
      {
        metric: "14",
        metricLabel: "Number of Files Uploaded"
      },
      {
        metric: "323",
        metricLabel: "Number of Changes Made"
      }
    ];
    const changes = [
      {
        project: "CS1010",
        fileName: "Final Report.docx",
        timestamp: "2019-03-20T18:10:49Z"
      },
      {
        project: "CS1020",
        fileName: "Documentation.docx",
        timestamp: "2019-03-19T12:10:42Z"
      },
      {
        project: "CS2010",
        fileName: "Model Diagram.jpg",
        timestamp: "2019-03-18T01:42:02Z"
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
        categories: ["CS1010", "CS1020", "CS2010"]
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
          data: [34, 15, 54]
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
          <Paper elevation={0} style={styles.tableContainer}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Project</TableCell>
                  <TableCell>File Name</TableCell>
                  <TableCell>Timestamp</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {changes.map((change, index) => (
                  <TableRow key={index} style={styles.tableRow} hover={true}>
                    <TableCell>{change.project}</TableCell>
                    <TableCell>{change.fileName}</TableCell>
                    <TableCell>{change.timestamp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
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
