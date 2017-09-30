// @flow
import React, { Component } from 'react';
import './App.css';
import { MapWithADirectionsRenderer } from "./views/MapsWithADirectionsRenderer";
import { Icon } from 'semantic-ui-react'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Icon name="bus" size="huge"/>
          <h1 className="App-title">Bus Stop</h1>
        </header>
        <MapWithADirectionsRenderer/>
      </div>
    );
  }
}

export default App;
