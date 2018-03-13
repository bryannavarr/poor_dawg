import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route } from 'react-router-dom'
import Hackers from './containers/Hackers'
import Notifications from './containers/Notifications'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <BrowserRouter>
          <React.Fragment>
            <Route path="/hackers" component={Hackers} />
            <Route path="/notifications" component={Notifications} />
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
