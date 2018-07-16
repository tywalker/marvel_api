import React, { Component } from 'react';
import { fetchCharacters } from './services/api';
import './SideList.css';

class SideList extends Component {
  constructor() {
    super();
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

  render() {
    const { characters, ids } = this.props;
    return (
      <div className="side-list">
        <ul className="name-list" onWheel={ (e) => console.log(e.pageY) }>
        { characters.map( (character, index) => {
          return (
            <li className="name-item">{ character[ids[index]].info.name }</li>
          )
        })}
        </ul>
      </div>
    )
  }
}

export default SideList;
