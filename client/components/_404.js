import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';

const styles = {
  pageContainer: {
    backgroundColor: '#00B8D4',
  },
  loginContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headingContainer: {
    fontSize: 36,
  },
  headingText: {
    color: '#FAFAFA',
    fontWeight: 'bold'
  },
  subheadingText: {
    color: '#F5F5F5',
  },
  contentContainer: {
    width: 400,
    paddingBottom: 30,
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  _404Container: {
    display: 'block',
  },
  _404Text: {
    color: '#00B8D4',
    fontSize: 128,
    fontWeight: 'bold',
  },
  _404Subtext: {
    color: '#757575',
    fontSize: 14,
  },
};

class _404 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div style={styles.pageContainer}>
          <div style={styles.loginContainer}>
            <h1 style={styles.headingContainer}>
              <span style={styles.headingText}> NUSCollab </span>
              <span style={styles.subheadingText}>Dashboard</span>
            </h1>
            <Paper zDepth={1} style={styles.contentContainer}>
              <div style={styles._404Container}>
                <h1 style={styles._404Text}> 404 </h1>
                <h1 style={styles._404Subtext}>Oops! Sorry we could not find the page</h1>
              </div>
              <Link to="/">
                <RaisedButton label="Go back home" secondary={true} />
              </Link>
            </Paper>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default _404;
