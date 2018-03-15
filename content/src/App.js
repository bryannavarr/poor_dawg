import React, { Component } from "react";

import "./App.css";

import Layout from "./components/Layout";
import { BrowserRouter, Route } from "react-router-dom";
import Hackers from "./containers/Hackers";
import Interactions from "./containers/Interactions";
import Challenges from "./containers/Challenges";
import Notifications from "./containers/Notifications";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Layout />
          <Route path="/hackers" component={Hackers} />
          <Route path="/interactions" component={Interactions} />
          <Route path="/challenges" component={Challenges} />
          <Route path="/notifications" component={Notifications} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
