import React, { Component } from 'react';
import { fetchCharacters, fetchCharactersFromSearch, buildImageUrl } from './services/api';
import SideList from './SideList';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      detailCharacter: {
        info: {
          name: '',
          desc: '',
          image: ''
        }
      }
    }

    this.getCharactersFromSearch = this.getCharactersFromSearch.bind(this);
    this.setDetailCharacter = this.setDetailCharacter.bind(this);
  }

  setDetailCharacter(character) {
    this.setState({ detailCharacter: character });
  }

  getCharactersFromSearch(val) {
    fetchCharactersFromSearch(val).then( res => {
      this.normalizeData(res, true)
    }).then( res => this.setState({ shouldFetch: true }))
  }

  render() {
    const { searchVal, payload, detailCharacter } = this.state;
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
        <div className="detail-wrapper">
          <SideList setDetailCharacter={ this.setDetailCharacter } />
          <div className="character-detail">
            <h1>{ detailCharacter.info.name }</h1>
            <p>{ detailCharacter.info.desc }</p>
            <img src={ buildImageUrl(detailCharacter.info.image) } />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
