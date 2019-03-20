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
  memberCard: {
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
        metric: "2",
        metricLabel: "Total Milestones"
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
    const members = [
      {
        name: "Le Vu Khanh Toan",
        email: "ktoan2904@gmail.com",
        image:
          "https://4vector.com/i/free-vector-boy-face-cartoon-clip-art-108644_108644_Boy_Face_Cartoon_clip_art_hight.png",
        metrics: [
          { label: "Tasks completed", data: "5/8" },
          { label: "Messages sent", data: "23" },
          { label: "Commits made", data: "11" },
          { label: "Files changes made", data: "50" }
        ]
      },
      {
        name: "Captain America",
        email: "captain@america.com",
        image:
          "https://upload.wikimedia.org/wikipedia/en/thumb/8/83/Captain_America_%28Steve_Rogers%29_All_New_All_Different_Marvel_version.jpg/170px-Captain_America_%28Steve_Rogers%29_All_New_All_Different_Marvel_version.jpg",
        metrics: [
          { label: "Tasks completed", data: "10/10" },
          { label: "Messages sent", data: "34" },
          { label: "Commits made", data: "4" },
          { label: "Files changes made", data: "23" }
        ]
      },
      {
        name: "Iron Man",
        email: "iron@man.com",
        image:
          "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Iron_Man_bleeding_edge.jpg/250px-Iron_Man_bleeding_edge.jpg",
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
          <Subheading>Members</Subheading>
          <div style={styles.cardContainer}>
            {members.map(member => (
              <Card style={styles.memberCard}>
                <CardHeader
                  avatar={<CardMedia style={styles.avatar} image={member.image} />}
                  title={member.name}
                  subheader={member.email}
                />
                <Divider />
                <CardContent>
                  {member.metrics.map((row, index) => (
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
                    primary="Captain America"
                    secondary="has marked task 'Task 12' as complete"
                  />
                </ListItem>
                <ListItem style={styles.listItem}>
                  <ListItemText
                    primary="Iron Man"
                    secondary="pushed a commit 'fix bugs' to branch 'master'"
                  />
                </ListItem>
                <ListItem style={styles.listItem}>
                  <ListItemText primary="Someone" secondary="did something" />
                </ListItem>
                <ListItem style={styles.listItem}>
                  <ListItemText primary="Someone Else" secondary="did other thing" />
                </ListItem>
                <ListItem style={styles.listItem}>
                  <ListItemText primary="Someone" secondary="did something" />
                </ListItem>
                <ListItem style={styles.listItem}>
                  <ListItemText primary="Someone Else" secondary="did other thing" />
                </ListItem>
                <ListItem style={styles.listItem}>
                  <ListItemText primary="Someone" secondary="did something" />
                </ListItem>
                <ListItem style={styles.listItem}>
                  <ListItemText primary="Someone Else" secondary="did other thing" />
                </ListItem>
                <ListItem style={styles.listItem}>
                  <ListItemText primary="Someone" secondary="did something" />
                </ListItem>
                <ListItem style={styles.listItem}>
                  <ListItemText primary="Someone Else" secondary="did other thing" />
                </ListItem>
                <ListItem style={styles.listItem}>
                  <ListItemText primary="Someone" secondary="did something" />
                </ListItem>
                <ListItem style={styles.listItem}>
                  <ListItemText primary="Someone Else" secondary="did other thing" />
                </ListItem>
                <ListItem style={styles.listItem}>
                  <ListItemText primary="Someone" secondary="did something" />
                </ListItem>
                <ListItem style={styles.listItem}>
                  <ListItemText primary="Someone Else" secondary="did other thing" />
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
                  <div style={styles.linkUrl}>https://github.com/ktoan2904/testCollab</div>
                </a>
              </Paper>
              <Paper style={styles.linkContainer}>
                <a
                  href="https://drive.google.com/open?id=1SnwEVsjeuhtpXtbtDRHRK02nAegH5pnF"
                  style={{ textDecoration: "none" }}
                  target="_blank"
                >
                  <div style={styles.linkTitle}>Google Drive</div>
                  <div style={styles.linkUrl}>
                    https://drive.google.com/open?id=1SnwEVsjeuhtpXtbtDRHRK02nAegH5pnF
                  </div>
                </a>
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
