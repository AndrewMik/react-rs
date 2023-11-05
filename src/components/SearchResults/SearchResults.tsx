import './style.css';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Characters, { Character } from '../Characters/Characters';
import Pagination from '../Pagination/Pagination';

type SearchResultsProps = {
  searchResults: Character[];
  loading: boolean;
  currentPage: number;
  count: number | null;
  itemsLimit: number;
  changePage: (page: number) => void;
};

const SearchResults: React.FC<SearchResultsProps> = ({
  searchResults,
  loading,
  currentPage,
  count,
  itemsLimit,
  changePage,
}) => {
  return (
    <section className="search-section">
      <h2 className="search-results">Search Results</h2>
      {!loading ? (
        <>
          <Characters characters={searchResults} />
          <Pagination
            count={count}
            itemsLimit={itemsLimit}
            currentPage={currentPage}
            changePage={changePage}
          />
        </>
      ) : (
        <LoadingSpinner />
      )}
    </section>
  );
};

export default SearchResults;
