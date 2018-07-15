import React, { Component } from 'react';
import logo from './logo.svg';
import { fetchCharacters } from './services/api';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      payload: {
        ids: [],
        characters: []
      }
    }
  }

  componentDidMount() {
    fetchCharacters().then( res => {
      res.map( (item,index) => {
        let pl = {};
        pl[`${item.id}`] = {
          info: {
            name: item.name,
            desc: item.description,
            image: item.thumbnail.path,
          },
          resources: {
            uris: {
              comics: {
                url: item.comics.collectionUrl,
                collections: item.comics.items
              }
            }
          },
        };

        let ids = this.state.payload.ids.concat(item.id);
        let characters = this.state.payload.characters.concat(pl);
        let payload = { ids, characters };
        this.setState({ payload });
      });
    });
  }

  renderPayloadList() {
    const { characters, ids } = this.state.payload;
    return characters.map( (item, index) => {
      let id = ids[index];
      return (
        <div key={ id } className="hero-wrapper">
          <h4>{ item[id].info.name }</h4>
        </div>
      );
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          { this.state.payload.characters.length > 0 ? this.renderPayloadList() : null }
      </div>
    );
  }
}

export default App;
