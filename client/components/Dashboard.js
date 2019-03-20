import React, { Component, PropTypes } from "react";
import Sidebar from "react-sidebar";
import assign from "object-assign";

import AppBar from "@material-ui/core/AppBar";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { Route, Switch, Redirect } from "react-router-dom";

import NavigationMenu from "../containers/NavigationMenu";

import StaffsPage from "../containers/Staff/StaffsPage";
import StaffDetailsPage from "../containers/Staff/StaffDetailsPage";
import StaffsFormPage from "../containers/Staff/StaffsFormPage";

import HomePage from "../containers/HomePage";
import ProjectsPage from "../containers/ProjectsPage";
import UsersPage from "../containers/UsersPage";

import GithubPage from "../containers/GithubPage";
import GoogleDrivePage from "../containers/GoogleDrivePage";
import MilestonesPage from "../containers/MilestonesPage";
import TasksPage from "../containers/TasksPage";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigationBarOpen: true
    };
    this.toggleNavigationBar = this.toggleNavigationBar.bind(this);
  }

  toggleNavigationBar() {
    this.setState({ navigationBarOpen: !this.state.navigationBarOpen });
  }

  render() {
    return (
      <div style={styles.pageContainer}>
        <AppBar id="appbar" position="absolute" color="primary" elevation={1}>
          <Toolbar>
            <Typography variant="h6" style={styles.title}>
              NUSCollab Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Sidebar
          shadow
          transitions={false}
          docked
          open
          styles={{
            sidebar: assign(
              {},
              styles.navigationBar,
              !this.state.navigationBarOpen && {
                display: "none"
              }
            ),
            content: {
              overflowX: "hidden"
            }
          }}
          sidebar={<NavigationMenu />}
        >
          <div style={styles.dashboardContainer}>
            <Paper
              style={assign(
                {},
                styles.navigationBarContainer,
                !this.state.navigationBarOpen && {
                  left: 0
                }
              )}
              onClick={this.toggleNavigationBar}
            >
              <i
                id="toggleNavigationIcon"
                style={styles.toggleNavigationBarIcon}
                className="material-icons"
              >
                {this.state.navigationBarOpen ? "keyboard_arrow_left" : "keyboard_arrow_right"}
              </i>
            </Paper>
            <div style={styles.dashboardLayoutContainer}>
              <Switch>
                <Route
                  exact
                  path="/dashboard/staffs"
                  component={() => (this.props.isAdmin ? <HomePage /> : <StaffsPage />)}
                />
                <Route
                  path="/dashboard/staffs/createoredit"
                  component={() => (this.props.isAdmin ? <HomePage /> : <StaffsFormPage />)}
                />
                <Route
                  path="/dashboard/staffs/:id"
                  component={() => (this.props.isAdmin ? <HomePage /> : <StaffDetailsPage />)}
                />

                <Route path="/dashboard/" exact component={HomePage} />
                <Route path="/dashboard/projects" component={ProjectsPage} />
                <Route path="/dashboard/users" component={UsersPage} />
                <Route path="/dashboard/github" component={GithubPage} />
                <Route path="/dashboard/drive" component={GoogleDrivePage} />
                <Route path="/dashboard/milestones" component={MilestonesPage} />
                <Route path="/dashboard/tasks" component={TasksPage} />
                <Redirect to="/dashboard/" />
              </Switch>
            </div>
          </div>
        </Sidebar>
      </div>
    );
  }
}

export default Dashboard;

const styles = {
  pageContainer: {
    backgroundColor: "#EEEEEE",
    height: "100%"
  },
  title: {
    color: "white"
  },
  navigationBarContainer: {
    position: "absolute",
    top: 70,
    left: 0,
    backgroundColor: "white",
    zIndex: 999,
    borderRadius: 0,
    borderLeftWidth: 0
  },
  toggleNavigationBarIcon: {
    color: "black",
    fontSize: 20,
    lineHeight: "inherit",
    cursor: "pointer"
  },
  navigationBar: {
    backgroundColor: "#00B8D4",
    color: "white",
    width: 220,
    maxWidth: 220
  },
  dashboardContainer: {
    backgroundColor: "#EEEEEE",
    width: "100%",
    paddingTop: "69px",
    minHeight: "94vh",
    position: "relative"
  },
  dashboardLayoutContainer: {
    backgroundColor: "#EEEEEE",
    paddingTop: "10px",
    paddingLeft: "30px",
    paddingRight: "30px",
    display: "flex",
    flexFlow: "column"
  }
};
