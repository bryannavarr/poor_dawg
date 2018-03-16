import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import Hackers from './containers/Hackers'
import Users from './containers/Users'
import Interactions from './containers/Interactions';


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
            <Route path="/" component={Users} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
