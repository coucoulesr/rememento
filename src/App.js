import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import PrivateRoute from './components/PrivateRoute';

import Splash from './components/views/Splash';
import About from './components/views/About';
import Dashboard from './components/views/dashboard/Index.js';
import Login from './components/views/Login';



function App() {
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

export default App;
