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
export default class MilestonesAndTasksTab extends Component {
  render() {
    //TODO: get real data
    const { projects, contributions } = this.props.data;
    const graphConfig = {
      chart: {
        type: "bar"
      },
      title: {
        text: "Task Completion by Project"
      },
      xAxis: {
        categories: contributions.map(item => item.project)
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
          <Subheading>Projects List</Subheading>
          {projects.map((project, index) => (
            <ExpansionPanel key={index}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <div style={styles.panelRowFirstColumn}>{project.project}</div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails style={{ display: "block" }}>
                <div style={{ ...styles.panelRow, ...styles.panelHeader }}>
                  <div style={styles.panelRowFirstColumn}>Task</div>
                  <div style={styles.panelRowColumn}>Deadline</div>
                  <div style={styles.panelRowColumn}>Completed</div>
                </div>
                {project.tasks.map((task, index) => (
                  <div key={index} style={styles.panelRow} className="taskRow">
                    <div style={styles.panelRowFirstColumn}>{task.name}</div>
                    <div style={styles.panelRowColumn}>{task.deadline || "N/A"}</div>
                    <div style={styles.panelRowColumn}>{task.completeDay || "N/A"}</div>
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
