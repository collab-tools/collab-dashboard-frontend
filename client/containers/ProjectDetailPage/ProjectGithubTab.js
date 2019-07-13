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
  onCommitSelect = commit => {
    const {
      data: { link }
    } = this.props;
    window.open(`${link}/commit/${commit.SHA}`, "_blank");
  };
  render() {
    const {
      data: { link, summary, commits, contributions }
    } = this.props;

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
        text: "Number of Commits by Members"
      },
      xAxis: {
        categories: contributions.commits.map(item => item.member)
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
        text: "Number of Lines of Codes Changed by Members"
      },
      xAxis: {
        categories: contributions.LOCs.map(item => item.member)
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
            {/* conditionally adds a href attribute if the link is non-empty*/}
            <a {...link && { href: link }} style={{ textDecoration: "none" }} target="_blank">
              <div style={styles.linkTitle}>Repository</div>
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
            headers={["Author", "Message", "Timestamp"]}
            rowItems={["author", "message", "timestamp"]}
            searchableItems={["author", "message"]}
            onRowClicked={this.onCommitSelect}
          />
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
