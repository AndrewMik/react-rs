import './style.css';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Characters, { Character } from '../Characters/Characters';

type SearchResultsProps = {
  searchResults: Character[];
  loading: boolean;
};

const SearchResults: React.FC<SearchResultsProps> = ({
  searchResults,
  loading,
}) => {
  return (
    <section className="search-section">
      <h2 className="search-results">Search Results</h2>
      {!loading ? (
        <Characters characters={searchResults} />
      ) : (
        <LoadingSpinner />
      )}
    </section>
  );
};

export default SearchResults;
