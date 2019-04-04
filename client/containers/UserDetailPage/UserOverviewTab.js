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
  }
};
class OverviewTab extends Component {
  render() {
    //TODO: get real data
    const metricsData_1 = [
      {
        metric: "3",
        metricLabel: "Total Projects"
      },
      {
        metric: "15",
        metricLabel: "Total Completed Tasks"
      },
      {
        metric: "29",
        metricLabel: "Total Pending Tasks"
      }
    ];
    const metricsData_2 = [
      {
        metric: "235",
        metricLabel: "Total Messages Sent"
      },
      {
        metric: "7",
        metricLabel: "Total Commits Pushed"
      },
      {
        metric: "15",
        metricLabel: "Number of File Changes Made"
      }
    ];
    const projects = [
      {
        name: "CS1010",
        dateCreated: "12 Oct 2018",

        metrics: [
          { label: "Tasks completed", data: "5/8" },
          { label: "Messages sent", data: "23" },
          { label: "Commits made", data: "11" },
          { label: "Files changes made", data: "50" }
        ]
      },
      {
        name: "CS1020",
        dateCreated: "05 Jan 2019",

        metrics: [
          { label: "Tasks completed", data: "10/10" },
          { label: "Messages sent", data: "34" },
          { label: "Commits made", data: "4" },
          { label: "Files changes made", data: "23" }
        ]
      },
      {
        name: "CS2010",
        dateCreated: "06 Jan 2019",

        metrics: [
          { label: "Tasks completed", data: "14/16" },
          { label: "Messages sent", data: "120" },
          { label: "Commits made", data: "23" },
          { label: "Files changes made", data: "54" }
        ]
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
            {projects.map(project => (
              <Card style={styles.projectCard}>
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
                <ListItem style={styles.listItem}>
                  <ListItemText
                    primary="CS1010"
                    secondary="Toan has marked task 'Task 12' as complete"
                  />
                </ListItem>
                <ListItem style={styles.listItem}>
                  <ListItemText
                    primary="CS1020"
                    secondary="Toan pushed a commit 'fix bugs' to branch 'master'"
                  />
                </ListItem>
                <ListItem style={styles.listItem}>
                  <ListItemText primary="Some Project" secondary="Toan did something" />
                </ListItem>
                <ListItem style={styles.listItem}>
                  <ListItemText primary="Some Other Project" secondary="Toan did other thing" />
                </ListItem>
                <ListItem style={styles.listItem}>
                  <ListItemText primary="Some Project" secondary="Toan did something" />
                </ListItem>
                <ListItem style={styles.listItem}>
                  <ListItemText primary="Some Other Project" secondary="Toan did other thing" />
                </ListItem>
                <ListItem style={styles.listItem}>
                  <ListItemText primary="Some Project" secondary="Toan did something" />
                </ListItem>
                <ListItem style={styles.listItem}>
                  <ListItemText primary="Some Other Project" secondary="Toan did other thing" />
                </ListItem>
                <ListItem style={styles.listItem}>
                  <ListItemText primary="Some Project" secondary="Toan did something" />
                </ListItem>
                <ListItem style={styles.listItem}>
                  <ListItemText primary="Some Other Project" secondary="Toan did other thing" />
                </ListItem>
                <ListItem style={styles.listItem}>
                  <ListItemText primary="Some Project" secondary="Toan did something" />
                </ListItem>
                <ListItem style={styles.listItem}>
                  <ListItemText primary="Some Other Project" secondary="Toan did other thing" />
                </ListItem>
                <ListItem style={styles.listItem}>
                  <ListItemText primary="Some Project" secondary="Toan did something" />
                </ListItem>
                <ListItem style={styles.listItem}>
                  <ListItemText primary="Some Other Project" secondary="Toan did other thing" />
                </ListItem>
              </List>
            </div>
            <div style={styles.column}>
              <Subheading>Links</Subheading>
              <Paper style={styles.linkContainer}>
                <a
                  href="https://github.com/ktoan2904/testCollab"
                  style={{ textDecoration: "none" }}
                  target="_blank"
                >
                  <div style={styles.linkTitle}>GitHub</div>
                  <div style={styles.linkUrl}>https://github.com/ktoan2904</div>
                </a>
              </Paper>
              <Paper style={styles.linkContainer}>
                <div style={styles.linkTitle}>Email</div>
                <div style={styles.linkUrl}>ktoan2904@gmail.com</div>
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
