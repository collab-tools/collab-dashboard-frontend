import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const styles = {
  pageContainer: {
    backgroundColor: "#00B8D4",
    height: "100vh"
  },
  _404: {
    height: "100%",
    width: "100%",
    display: "flex",
    textAlign: "center",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  headingContainer: {
    fontSize: 36
  },
  headingText: {
    color: "#FAFAFA",
    fontWeight: "bold"
  },
  subheadingText: {
    color: "#F5F5F5"
  },
  contentContainer: {
    width: 400,
    paddingBottom: 30,
    display: "flex",
    textAlign: "center",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  _404Container: {
    display: "block"
  },
  _404Text: {
    color: "#00B8D4",
    fontSize: 128,
    fontWeight: "bold"
  }
};

class _404 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="_404-page-container" style={styles.pageContainer}>
        <div style={styles._404}>
          <h1 style={styles.headingContainer}>
            <span style={styles.headingText}> NUSCollab </span>
            <span style={styles.subheadingText}>Dashboard</span>
          </h1>
          <Paper style={styles.contentContainer}>
            <div style={styles._404Container}>
              <h1 id="_404-page-not-found-text" style={styles._404Text}>
                404
              </h1>
            </div>
            <Link to="/">
              <Button variant="contained" id="_404-home-button" color="secondary">
                Go back home
              </Button>
            </Link>
          </Paper>
        </div>
      </div>
    );
  }
}

export default _404;
