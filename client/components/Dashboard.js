import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Sidebar from 'react-sidebar';
import assign from 'object-assign';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';

import NavigationMenu from '../containers/NavigationMenu';
import DashboardLayout from '../containers/DashboardLayout';

const styles = {
  pageContainer: {
    backgroundColor: '#EEEEEE',
    height: '100%',
  },
  titleBar: {
   position: 'absolute',
   left: 0,
   minWidth: 600,
   overflowX: 'auto'
  },
  navigationBarContainer: {
    position: 'absolute',
    top: 70,
    left: 0,
    backgroundColor: 'white',
    zIndex: 999,
    borderRadius: 0,
    borderLeftWidth: 0,
  },
  toggleNavigationBarIcon: {
    color: 'black',
    fontSize: 20,
    lineHeight: 'inherit',
    cursor: 'pointer',
  },
  navigationBar: {
    backgroundColor: '#00B8D4',
    color: 'white',
    width: 200,
    maxWidth: 200,
  },
  dashboardContainer: {
    backgroundColor: '#EEEEEE',
    width: '100%',
    paddingTop: '69px',
    minHeight: '94vh',
    position: 'relative',
  },
  dashboardLayoutContainer: {
    backgroundColor: '#EEEEEE',
    paddingTop: '10px',
    paddingLeft: '30px',
    paddingRight: '30px',
    display: 'flex',
    flexFlow: 'column',
  },
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigationBarOpen: true
    }
    this.toggleNavigationBar = this.toggleNavigationBar.bind(this);
  }

  toggleNavigationBar() {
    this.setState({navigationBarOpen: !this.state.navigationBarOpen});
  }

  render() {
    return (
      <MuiThemeProvider>
        <div style={styles.pageContainer}>
          <AppBar id="appbar" title="NUSCollab Dashboard" showMenuIconButton={false} style={styles.titleBar} />
          <Sidebar
            shadow
            transitions={false}
            docked
            open
            styles={{
              sidebar: assign({}, styles.navigationBar, !this.state.navigationBarOpen && {
                display: 'none'
              }),
              content: {
                overflowX: 'hidden'
              }
            }}
            sidebar={<NavigationMenu />}
          >
              <div style={styles.dashboardContainer}>
                  <Paper
                    zDepth={1}
                    style={
                      assign({}, styles.navigationBarContainer, !this.state.navigationBarOpen && {
                        left: 0
                      })
                    }
                    onClick={this.toggleNavigationBar}
                  >
                    <i
                      style={styles.toggleNavigationBarIcon}
                      className="material-icons"
                    >
                      {this.state.navigationBarOpen ? 'keyboard_arrow_left' : 'keyboard_arrow_right'}
                    </i>
                  </Paper>
                  <div style={styles.dashboardLayoutContainer}>
                    <DashboardLayout />
                  </div>
              </div>
          </Sidebar>
        </div>
      </MuiThemeProvider>
    )
  };
}

export default Dashboard;