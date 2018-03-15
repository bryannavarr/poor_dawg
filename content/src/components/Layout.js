import React from "react";

import logo from "../logo.svg";
import Router from "./Router";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="App">
      <Header />
      <Sidebar />

      <div id="main" role="main">
        <Router />
      </div>
    </div>
  );
}
