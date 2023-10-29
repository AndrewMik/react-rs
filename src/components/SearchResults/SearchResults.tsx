import { Component } from 'react';
import './style.css';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Characters, { Character } from '../Characters/Characters';

type SearchResultsProps = {
  searchResults: Character[];
  loading: boolean;
};

export default class SearchResults extends Component<SearchResultsProps> {
  render() {
    const { searchResults, loading } = this.props;

    return (
      <section className="search-section">
        <h2 className="search-results">Search Results</h2>
        {!loading && searchResults.length > 0 ? (
          <Characters characters={searchResults} />
        ) : (
          <LoadingSpinner />
        )}
      </section>
    );
  }
}
