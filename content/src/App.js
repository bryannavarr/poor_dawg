import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

<<<<<<< HEAD
import { BrowserRouter, Route } from 'react-router-dom'
import Hackers from './containers/Hackers'
import Notifications from './containers/Notifications'
=======
import { BrowserRouter, Route } from "react-router-dom";
import Hackers from './containers/Hackers'
import Interactions from "./containers/Interactions";
>>>>>>> c0d65c2ca82015bbc3c079d30bce9edb234d4435

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <BrowserRouter>
<<<<<<< HEAD
          <React.Fragment>
            <Route path="/hackers" component={Hackers} />
            <Route path="/notifications" component={Notifications} />
          </React.Fragment>
=======
          <div>
            <Route path="/" component={Hackers} />
            <Route path="/interactions" component={Interactions} />
          </div>
>>>>>>> c0d65c2ca82015bbc3c079d30bce9edb234d4435
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
