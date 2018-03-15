import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter, Route } from "react-router-dom";
import Hackers from './containers/Hackers'
import Interactions from "./containers/Interactions";
import Notifications from './containers/Notifications'
import DogOwners from './containers/DogOwners'

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
            <Route exact path="/" component={Hackers} />
            <Route path="/dogOwners" component={DogOwners} />
            <Route path="/interactions" component={Interactions} />
            <Route path="/notifications" component={Notifications} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
