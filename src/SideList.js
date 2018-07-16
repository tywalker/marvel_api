import React, { Component } from 'react';
import { fetchCharacters } from './services/api';
import './SideList.css';

class SideList extends Component {
  constructor() {
    super();

    this.nameList;

    this.getElementScrollPosition = this.getElementScrollPosition.bind(this);
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

  getElementScrollPosition() {
    let scrollPos = this.nameList.scrollTop;
    let listHeight = this.nameList.scrollHeight - this.nameList.clientHeight;

    if (scrollPos >= listHeight * 0.9) {
      console.log("shouldFire");
    }
  }

  render() {
    const { characters, ids } = this.props;
    return (
      <div className="side-list">
        <ul className="name-list"
            ref={ ref => this.nameList = ref }
            onWheel={ (e) => this.getElementScrollPosition() }>
        { characters.map( (character, index) => {
          return (
            <li key={ ids[index] } className="name-item">{ character[ids[index]].info.name }</li>
          )
        })}
        </ul>
      </div>
    )
  }
}

export default SideList;
