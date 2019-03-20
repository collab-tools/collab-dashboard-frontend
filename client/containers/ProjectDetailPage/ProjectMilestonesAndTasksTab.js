import React, { Component } from "react";
import { connect } from "react-redux";
import Highcharts from "react-highcharts";

import Paper from "@material-ui/core/Paper";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Section from "../../components/Section";
import Subheading from "../../components/Subheading";

const styles = {
  tableHeader: {
    display: "flex",
    padding: "10px 50px 10px 25px",
    fontWeight: "bold"
  },
  panelRow: {
    display: "flex",
    padding: "5px 0",
    borderTop: "solid 1px lightgrey"
  },
  panelHeader: {
    fontWeight: "bold",
    padding: "10px 0"
  },
  panelRowFirstColumn: {
    flex: 1
  },
  panelRowColumn: {
    flex: 1,
    textAlign: "center"
  }
};
class MilestonesAndTasksTab extends Component {
  render() {
    //TODO: get real data
    const milestones = [
      {
        name: "Milestone 1",
        deadline: "1 Apr 2019",
        tasksCompleted: "1/2",
        tasks: [
          { name: "Task 1", assignee: "Captain America", completeDay: "20 Apr 2019" },
          { name: "Task 2", assignee: "Iron Man", completeDay: "N/A" }
        ]
      },
      {
        name: "Milestone 2",
        deadline: "14 Apr 2019",
        tasksCompleted: "3/3",
        tasks: [
          { name: "Task 1", assignee: "Captain America", completeDay: "10 Apr 2019" },
          { name: "Task 2", assignee: "Iron Man", completeDay: "11 Apr 2019" },
          { name: "Task 3", assignee: "Iron Man", completeDay: "12 Apr 2019" }
        ]
      },
      {
        name: "Milestone 3",
        deadline: "29 Apr 2019",
        tasksCompleted: "0/2",
        tasks: [
          { name: "Task 1", assignee: "Captain America", completeDay: "N/A" },
          { name: "Task 2", assignee: "Iron Man", completeDay: "N/A" }
        ]
      }
    ];
    const graphConfig = {
      chart: {
        type: "bar"
      },
      title: {
        text: "Task Completion by Members"
      },
      xAxis: {
        categories: ["Le Vu Khanh Toan", "Captain America", "Iron Man"]
      },
      yAxis: {
        min: 0,
        title: {
          text: "Tasks"
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
          name: "Completed Tasks",
          data: [5, 7, 3]
        },
        {
          name: "Incomplete Tasks",
          data: [4, 0, 6]
        }
      ]
    };
    return (
      <React.Fragment>
        <Section>
          <Subheading>Milestones List</Subheading>
          <Paper style={styles.tableHeader}>
            <div style={styles.panelRowFirstColumn}>Milestone</div>
            <div style={styles.panelRowColumn}>Deadline</div>
            <div style={styles.panelRowColumn}>Tasks Completed</div>
          </Paper>
          {milestones.map(milestone => (
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <div style={styles.panelRowFirstColumn}>{milestone.name}</div>
                <div style={styles.panelRowColumn}>{milestone.deadline}</div>
                <div style={styles.panelRowColumn}>{milestone.tasksCompleted}</div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails style={{ display: "block" }}>
                <div style={{ ...styles.panelRow, ...styles.panelHeader }}>
                  <div style={styles.panelRowFirstColumn}>Task</div>
                  <div style={styles.panelRowColumn}>Assigned to</div>
                  <div style={styles.panelRowColumn}>Completed</div>
                </div>
                {milestone.tasks.map(task => (
                  <div style={styles.panelRow}>
                    <div style={styles.panelRowFirstColumn}>{task.name}</div>
                    <div style={styles.panelRowColumn}>{task.assignee}</div>
                    <div style={styles.panelRowColumn}>{task.completeDay}</div>
                  </div>
                ))}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
        </Section>
        <Section>
          <Subheading>Member Contribution</Subheading>
          <Highcharts config={graphConfig} />
        </Section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({});
export default connect(mapStateToProps)(MilestonesAndTasksTab);
