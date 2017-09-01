import React, { Component } from 'react';
import './App.css';

import DataPull from './components/data-pull/data-pull.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <DataPull />
      </div>
    );
  }
}

export default App;
