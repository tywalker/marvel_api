import React, { Component } from 'react';
import Characters from './Characters';
import './App.css';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="main-wrapper">
        <ul>
          <li>json</li>
          <li>Characters</li>
        </ul>
        <Characters />
      </div>
    );
  }
}

export default App;
