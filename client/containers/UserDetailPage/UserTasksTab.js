import React, { Component } from "react";
import { connect } from "react-redux";
import Highcharts from "react-highcharts";

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
    const projects = [
      {
        name: "CS1010",
        tasks: [
          { name: "Task 1", deadline: "20 Apr 2019", completed: true },
          { name: "Task 2", deadline: "24 Apr 2019", completed: false }
        ]
      },
      {
        name: "CS1020",
        tasks: [
          { name: "Task 1", deadline: "20 Apr 2019", completed: true },
          { name: "Task 2", deadline: "24 Apr 2019", completed: false },
          { name: "Task 3", deadline: "28 Apr 2019", completed: false }
        ]
      },
      {
        name: "CS2010",
        tasks: [
          { name: "Task 1", deadline: "N/A", completed: false },
          { name: "Task 2", deadline: "N/A", completed: false },
          { name: "Task 3", deadline: "10 Apr 2019", completed: true }
        ]
      }
    ];
    const graphConfig = {
      chart: {
        type: "bar"
      },
      title: {
        text: "Task Completion by Project"
      },
      xAxis: {
        categories: ["CS1010", "CS1020", "CS2010"]
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
          data: [5, 2, 1]
        },
        {
          name: "Incomplete Tasks",
          data: [0, 3, 6]
        }
      ]
    };
    return (
      <React.Fragment>
        <Section>
          <Subheading>Projects List</Subheading>
          {projects.map(project => (
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <div style={styles.panelRowFirstColumn}>{project.name}</div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails style={{ display: "block" }}>
                <div style={{ ...styles.panelRow, ...styles.panelHeader }}>
                  <div style={styles.panelRowFirstColumn}>Task</div>
                  <div style={styles.panelRowColumn}>Deadline</div>
                  <div style={styles.panelRowColumn}>Completed</div>
                </div>
                {project.tasks.map(task => (
                  <div style={styles.panelRow}>
                    <div style={styles.panelRowFirstColumn}>{task.name}</div>
                    <div style={styles.panelRowColumn}>{task.deadline}</div>
                    <div style={styles.panelRowColumn}>{task.completed ? "Yes" : "No"}</div>
                  </div>
                ))}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
        </Section>
        <Section>
          <Subheading>Contribution per Project</Subheading>
          <Highcharts config={graphConfig} />
        </Section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({});
export default connect(mapStateToProps)(MilestonesAndTasksTab);
