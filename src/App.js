import React, { Component } from 'react';
import logo from './logo.svg';
import { fetchCharacters, fetchCharactersFromSearch, buildImageUrl } from './services/api';
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
      shouldFetch: false,
      searchVal: ''
    }

    this.app;

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.getCharactersFromSearch = this.getCharactersFromSearch.bind(this);
    this.getNextPage = this.getNextPage.bind(this);
  }

  componentDidMount() {
    fetchCharacters(this.state.page).then( res => {
      this.normalizeData(res);
    });

    this.updateWindowDimensions();
    this.app.addEventListener('resize', this.updateWindowDimensions)
  }

  normalizeData(data, replace = false) {
    if (replace) {
      this.setState({
        payload: { ids: [], characters: [] }
      });
    }
    data.map( (item,index) => {
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
      this.setState({ offset: this.state.offset + 1 });
    });
  }

  updateWindowDimensions() {
    let windowObj = {};
    windowObj.height = document.body.clientHeight;
    windowObj.width = document.body.scrollWidth;

    this.setState({ window: windowObj, shouldFetch: true });
  }

  getCharactersFromSearch(val) {
      fetchCharactersFromSearch(val).then( res => {
        this.normalizeData(res, true);
      }).then( res => this.setState({ shouldFetch: true }))
  }

  getNextPage(loc) {
    if (loc >= this.app.scrollHeight * 0.8 && this.state.shouldFetch) {

      this.updateWindowDimensions();
      this.setState({ shouldFetch: false });

      fetchCharacters(this.state.offset + 1).then( res => {
        this.normalizeData(res);
      }).then( res => this.setState({ shouldFetch: true }))

    }
  }

  renderPayloadList() {
    const { characters, ids } = this.state.payload;
    return characters.map( (item, index) => {
      let id = ids[index];
      return (
        <div key={ id } className="hero-wrapper">
          <h4>{ item[id].info.name }</h4>
          <img src={ buildImageUrl(item[id].info.image) } />
        </div>
      );
    })
  }

  render() {
    const { searchVal } = this.state;
    return (
      <div className="App"
           ref={ ref => this.app = ref }
           onWheel={ (e) => this.getNextPage(e.pageY) }>
        <div className="search">
          <input type="text" placeholder="Search Marvel characters"
          onChange={ (e) => {
            this.setState({ searchVal: e.target.value })
          }}/>
          <button onClick={ () => this.getCharactersFromSearch(searchVal)}>
            Go
          </button>
        </div>
        { this.state.payload.characters.length > 0 ? this.renderPayloadList() : null }
      </div>
    );
  }
}

export default App;
