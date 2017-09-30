// @flow
import React, { Component } from 'react';
import './App.css';
import { Icon, } from 'semantic-ui-react'
import Map from './views/Map/Map'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Icon name="bus" size="huge"/>
          <h1 className="App-title">Bus Stop</h1>
        </header>
        <Map/>
      </div>
    );
  }
}

export default App;
