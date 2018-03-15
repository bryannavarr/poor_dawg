import React, { Component } from "react";

import "./App.css";

import Layout from "./components/Layout";
import { BrowserRouter, Route } from "react-router-dom";
import Hackers from './containers/Hackers'
import Interactions from "./containers/Interactions";
import Notifications from './containers/Notifications'
import DogOwners from './containers/DogOwners'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Layout />
      </BrowserRouter>
    );
  }
}

export default App;
