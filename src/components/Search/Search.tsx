import { Component } from 'react';
import './style.css';
import SearchResults from '../SearchResults/SearchResults';
import { getCharacters } from '../../api/getCharacters';
import { Character } from '../Characters/Characters';

type SearchState = {
  searchResults: Character[];
  loading: boolean;
};

export default class Search extends Component {
  state: SearchState = {
    searchResults: [],
    loading: true,
  };

  componentDidMount() {
    this.loadInitialData();
  }

  loadInitialData = async () => {
    try {
      const results: Character[] = await getCharacters();
      this.setState({ searchResults: results });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <>
        <section className="search">
          <input></input>
          <button>Search</button>
        </section>
        <SearchResults searchResults={this.state.searchResults}/>
      </>
    );
  }
}
