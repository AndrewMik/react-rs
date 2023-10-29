import { Component } from 'react';
import './style.css';
import SearchResults from '../SearchResults/SearchResults';

export default class Search extends Component {
  render() {
    return (
      <>
        <section className="search">
          <input></input>
          <button>Search</button>
        </section>
        <SearchResults />
      </>
    );
  }
}
