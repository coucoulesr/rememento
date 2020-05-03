import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { setToken } from "./redux/actions";
import cookie from "react-cookies";
import "./App.css";

import PrivateRoute from "./components/PrivateRoute";

import Splash from "./components/views/Splash";
import About from "./components/views/About";
import Dashboard from "./components/views/Dashboard";
import Login from "./components/views/Login";

const mapStateToProps = (state) => {
  return {
    email: state.email,
    recipients: state.recipients,
    name: state.name,
    token: state.token
  };
};

class App extends React.Component {
  componentWillMount() {
    let token = cookie.load("token");
    if (typeof token != "undefined") {
      this.props.dispatch(setToken(token));
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Splash} />
          <Switch>
            <PrivateRoute path="/dashboard" component={Dashboard} recipients={this.props.recipients} />
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect(mapStateToProps)(App);
