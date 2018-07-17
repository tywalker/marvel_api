import React, { Component } from 'react';
import { fetchCharacters, fetchCharactersFromSearch, buildImageUrl } from './services/api';
import SideList from './SideList';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      payload: {
        ids: [],
        characters: []
      },
      window: {
        width: 0,
        height: 0,
      },
      offset: 1,
      shouldfetch: false,
      searchVal: ''
    }

    this.app;

    this.getCharactersFromSearch = this.getCharactersFromSearch.bind(this);
  }

  getCharactersFromSearch(val) {
    fetchCharactersFromSearch(val).then( res => {
      this.normalizeData(res, true);
    }).then( res => this.setState({ shouldFetch: true }))
  }

  render() {
    const { searchVal, payload } = this.state;
    return (
      <div className="App"
           ref={ ref => this.app = ref } >
        <div className="search">
          <input type="text" placeholder="Search Marvel characters"
          onChange={ (e) => {
            this.setState({ searchVal: e.target.value })
          }}/>
          <button onClick={ () => this.getCharactersFromSearch(searchVal)}>
            Go
          </button>
        </div>
        <SideList characters={ payload.characters } ids={ payload.ids } />
      </div>
    );
  }
}

export default App;
