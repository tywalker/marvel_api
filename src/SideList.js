import React, { Component } from 'react';
import { fetchCharacters } from './services/api';
import './SideList.css';

class SideList extends Component {
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

    this.nameList;

    this.getElementScrollPosition = this.getElementScrollPosition.bind(this);
    this.getNextPage = this.getNextPage.bind(this);
  }

  componentDidMount() {
    fetchCharacters(this.state.page).then( res => {
      this.normalizeData(res);
    });

    this.updateWindowDimensions();
    this.nameList.addEventListener('resize', this.updateWindowDimensions)
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
    let nameListObj = {};

    nameListObj.height = this.nameList.clientHeight;
    nameListObj.width = this.nameList.scrollWidth;

    this.setState({ window: nameListObj, shouldFetch: true });
  }

  getNextPage() {
    if (this.state.shouldFetch) {
      this.updateWindowDimensions();
      this.setState({ shouldFetch: false });

      fetchCharacters(this.state.offset + 1).then( res => {
        this.normalizeData(res);
      }).then( res => this.setState({ shouldFetch: true }))
    }
  }

  getElementScrollPosition() {
    let scrollPos = this.nameList.scrollTop;
    let listHeight = this.nameList.scrollHeight - this.nameList.clientHeight;

    if (scrollPos >= listHeight * 0.8) {
      this.getNextPage();
    }
  }

  render() {
    const { characters, ids } = this.state.payload;
    return (
      <div className="side-list">
        <ul className="name-list"
            ref={ ref => this.nameList = ref }
            onWheel={ (e) => this.getElementScrollPosition() }>
        { characters.map( (character, index) => {
          return (
            <li key={ ids[index] }
                className="name-item"
                onClick={ () => this.props.setDetailCharacter(character[ids[index]]) }>
              { character[ids[index]].info.name }
            </li>
          )
        })}
        </ul>
      </div>
    )
  }
}

export default SideList;
