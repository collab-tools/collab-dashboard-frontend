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
export default class MilestonesAndTasksTab extends Component {
  render() {
    //TODO: get real data
    const {
      data: { milestones, contributions }
    } = this.props;
    const graphConfig = {
      chart: {
        type: "bar"
      },
      title: {
        text: "Task Completion by Members"
      },
      xAxis: {
        categories: contributions.map(item => item.member || "Unassigned")
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
          data: contributions.map(item => item.completed)
        },
        {
          name: "Incomplete Tasks",
          data: contributions.map(item => item.incomplete)
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
          {milestones.map((milestone, index) => (
            <ExpansionPanel key={index}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <div style={styles.panelRowFirstColumn} className="milestone-data">
                  {milestone.name}
                </div>
                <div style={styles.panelRowColumn} className="milestone-data">
                  {milestone.deadline || "N/A"}
                </div>
                <div style={styles.panelRowColumn} className="milestone-data">
                  {milestone.tasksCompleted}
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails style={{ display: "block" }}>
                <div style={{ ...styles.panelRow, ...styles.panelHeader }}>
                  <div style={styles.panelRowFirstColumn}>Task</div>
                  <div style={styles.panelRowColumn}>Assigned to</div>
                  <div style={styles.panelRowColumn}>Completed</div>
                </div>
                {milestone.tasks.map((task, index) => (
                  <div key={index} style={styles.panelRow} className="taskRow">
                    <div style={styles.panelRowFirstColumn}>{task.name}</div>
                    <div style={styles.panelRowColumn}>{task.assignee || "N/A"}</div>
                    <div style={styles.panelRowColumn}>{task.completeDay || "N/A"}</div>
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
