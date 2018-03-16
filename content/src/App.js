import React, { Component } from "react";

import "./App.css";

import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";

//window.jQuery = window.$ = require("jquery");
// import jQuery from "jquery";
// window.$ = window.jQuery = jQuery;
// require("smartadmin-plugins/smartwidgets/jarvis.widget.ng2.js");
require("jquery");
require("bootstrap");
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
