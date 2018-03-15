import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter, Route } from "react-router-dom";
import Hackers from "./containers/Hackers";
import Interactions from "./containers/Interactions";
import Challenges from "./containers/Challenges";
import Notifications from "./containers/Notifications";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <BrowserRouter>
          <div>
            <Route path="/hackers" component={Hackers} />
            <Route path="/interactions" component={Interactions} />
            <Route path="/challenges" component={Challenges} />
            <Route path="/notifications" component={Notifications} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
