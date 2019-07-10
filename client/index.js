import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "@babel/polyfill";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import configureStore from "./store/configStore";

import LoginPage from "./containers/LoginPage";
import DashboardPage from "./containers/DashboardPage";
import _404 from "./components/_404";

const { persistor, store } = configureStore();

const theme = createMuiTheme({
  palette: {
    primary: { main: "#00B8D4" },
    secondary: { main: "#ff70c8" },
    text: {
      primary: "#000000"
    }
  }
});

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <MuiThemeProvider theme={theme}>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route path="/dashboard" component={DashboardPage} />
            <Route component={_404} />
          </Switch>
        </MuiThemeProvider>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("application")
);
