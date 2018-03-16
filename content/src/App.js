import React, { Component } from "react";

import "./App.css";

import { BrowserRouter, Route } from "react-router-dom";
import Hackers from "./containers/Hackers";
import Sponsors from "./containers/Sponsors";
import Interactions from "./containers/Interactions";
import Layout from "./components/Layout";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout />
        <Route path="/" component={Sponsors} />
      </BrowserRouter>
    );
  }
}

export default App;
