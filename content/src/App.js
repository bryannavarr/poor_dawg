import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

<<<<<<< HEAD
import { BrowserRouter, Route } from 'react-router-dom'
import Hackers from './containers/Hackers'
import DogOwners from './containers/DogOwners'
// import dogOwners from './c'
=======
import { BrowserRouter, Route } from "react-router-dom";
import Hackers from './containers/Hackers'
import Interactions from "./containers/Interactions";
>>>>>>> origin/master

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
            <Route exact path="/" component={Hackers} />
            <Route path="/dogOwners" component={DogOwners} />
          </React.Fragment>
=======
          <div>
            <Route path="/" component={Hackers} />
            <Route path="/interactions" component={Interactions} />
          </div>
>>>>>>> origin/master
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
