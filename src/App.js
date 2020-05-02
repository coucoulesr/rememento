import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import PrivateRoute from "./components/PrivateRoute";

import Splash from "./components/views/Splash";
import About from "./components/views/About";
import Dashboard from "./components/views/Dashboard";
import Login from "./components/views/Login";

class App extends React.Component {
  componentDidMount() {
    if (typeof document.cookie != "undefined") {
      const cookieDecode = function(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let cookieArray = decodedCookie.split(";");
        for (let i = 0; i < cookieArray.length; i++) {
          let c = cookieArray[i];
          while (c.charAt(0) == " ") {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
      };
      let token = cookieDecode("token");
      if (typeof token != "undefined" && typeof user != "undefined") {
        // populate redux store
      }
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Splash} />
          <Switch>
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
