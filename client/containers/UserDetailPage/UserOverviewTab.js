import React, { Component } from "react";
import { connect } from "react-redux";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import AccessTime from "@material-ui/icons/AccessTime";

import Section from "../../components/Section";
import MetricsRow from "../../components/MetricsRow";
import Subheading from "../../components/Subheading";

const styles = {
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  projectCard: {
    width: "300px",
    margin: "20px"
  },
  avatar: {
    width: "50px",
    height: "50px"
  },
  contentRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px"
  },
  twoColumns: {
    display: "flex",
    justifyContent: "space-between"
  },
  column: {
    flex: 1
  },
  activityList: {
    width: "90%",
    maxHeight: "300px",
    overflow: "auto"
  },
  listItem: {
    backgroundColor: "white"
  },
  linkContainer: {
    padding: "10px",
    marginBottom: "15px"
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
  activityTime: { fontSize: "12px", marginTop: "5px" },
  activityTimeIcon: { verticalAlign: "middle" }
};
class OverviewTab extends Component {
  render() {
    //TODO: get real data
    const { summary, projects, activities, links, name } = this.props.data;
    const metricsData_1 = [
      {
        metric: summary.projectsNum,
        metricLabel: "Total Projects"
      },
      {
        metric: summary.completedTasksNum,
        metricLabel: "Total Completed Tasks"
      },
      {
        metric: summary.incompleteTasksNum,
        metricLabel: "Total Pending Tasks"
      }
    ];
    const metricsData_2 = [
      {
        metric: summary.messagesNum,
        metricLabel: "Total Messages Sent"
      },
      {
        metric: summary.commitsNum,
        metricLabel: "Total Commits Pushed"
      },
      {
        metric: summary.fileChangesNum,
        metricLabel: "Number of File Changes Made"
      }
    ];

    return (
      <React.Fragment>
        <Subheading>Summary</Subheading>
        <Section>
          <MetricsRow metricsData={metricsData_1} />
        </Section>
        <Section>
          <MetricsRow metricsData={metricsData_2} />
        </Section>
        <Section>
          <Subheading>Projects</Subheading>
          <div style={styles.cardContainer}>
            {projects.map((project, index) => (
              <Card key={index} style={styles.projectCard}>
                <CardHeader title={project.name} subheader={`created on ${project.dateCreated}`} />
                <Divider />
                <CardContent>
                  {project.metrics.map((row, index) => (
                    <div key={index} style={styles.contentRow}>
                      <div>{row.label}</div>
                      <div>{row.data}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>
        <Section>
          <div style={styles.twoColumns}>
            <div style={styles.column}>
              <Subheading>Recent Activities</Subheading>
              <List style={styles.activityList}>
                {activities.map((activity, index) => (
                  <ListItem key={index} style={styles.listItem}>
                    <ListItemText
                      primary={activity.project}
                      secondary={
                        <React.Fragment>
                          <div>{name + " " + activity.description} </div>
                          <div style={styles.activityTime}>
                            <AccessTime style={styles.activityTimeIcon} />
                            {activity.timestamp}
                          </div>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </div>
            <div style={styles.column}>
              <Subheading>Links</Subheading>
              <Paper style={styles.linkContainer}>
                <a
                  {...links.github && { href: links.github }}
                  style={{ textDecoration: "none" }}
                  target="_blank"
                >
                  <div style={styles.linkTitle}>GitHub</div>
                  <div style={styles.linkUrl}>{links.github || "N/A"}</div>
                </a>
              </Paper>
              <Paper style={styles.linkContainer}>
                <div style={styles.linkTitle}>Email</div>
                <div style={styles.linkUrl}>{links.email || "N/A"}</div>
              </Paper>
            </div>
          </div>
        </Section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({});
export default connect(mapStateToProps)(OverviewTab);
