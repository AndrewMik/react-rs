import { Component } from 'react';
import './style.css';
import { getCharacters } from '../../api/getCharacters';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Characters, { Character } from '../Characters/Characters';

type SearchResultsState = {
  searchResults: Character[];
  loading: boolean;
}

export default class SearchResults extends Component {
  state: SearchResultsState = {
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
    }
    finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { searchResults } = this.state;

    return <section className='search-section'>
      <h2 className='search-results'>Search Results</h2>
      {!this.state.loading && searchResults.length > 0 ? (
        <Characters characters={searchResults} />
      ) : (
        <LoadingSpinner />
      )}
    </section>;
  }
}
