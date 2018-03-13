import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route } from 'react-router-dom'
import Hackers from './containers/Hackers'
import Vets from './containers/Vets'

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
            <Route path="/" component={Hackers} exact />
            <Route path="/vets" component={Vets} />
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App
